import "react-tabs/style/react-tabs.css";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../utils/AxiosConfig";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddExpense from "./Dashboard/popups/addExpense";
import { useDispatch, useSelector } from "react-redux";
import { minimizePayments } from "../utils/paymentsUtil";
import { Switch, Toggle } from "./Toggle";
import {
  setBalances,
  setGroup,
  setNetBalances,
} from "../redux/reducers/groupReducer";
import "../styles/index.css";
import AddGroupMember from "./Dashboard/popups/AddGroupMember";

export const calculateNetBalance = (grpData) => {
  let b = [];
  if (!grpData) return;
  for (const [user, friends] of Object.entries(grpData?.balances)) {
    for (const [friend, balance] of Object.entries(friends)) {
      if (friend !== user && balance > 0)
        b.push({ from: user, to: friend, amount: balance });
    }
  }
  return b;
};

const GroupPage = () => {
  let { id } = useParams();
  const { groupData } = useSelector((state) => state.group);
  const { name, balances, simplified_balances, net_balances } = groupData;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showExp, setShowExp] = useState(false);
  const [simplify, setSimplify] = useState(false);
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleShowExpense = () => {
    setShowExp((pval) => !pval);
  };

  const fetchGroupData = async () => {
    try {
      const { data } = await instance.post("/group/getGroupData", {
        groupId: id,
        email: user.email
      });
      if (data.success) {
        console.log("groupdata:", data.groupData);
        dispatch(setGroup(data.groupData));
        const b = calculateNetBalance(data.groupData);
        dispatch(setNetBalances(b));
        dispatch(setBalances(b));
        setLoading(false);
      }
    } catch (error) {
      console.log({ fetchGroupDataError: error.message });
    }
  };

  const memoizedSimplifyPayments = useMemo(() => {
    let cachedValue2;

    return (netBalances) => {
      if (cachedValue2 && cachedValue2.netBalances === netBalances) {
        return cachedValue2.balances;
      }

      const balances = minimizePayments(netBalances);
      cachedValue2 = { netBalances, balances };
      return balances;
    };
  }, []); // empty dependency array to memoize based only on netBalances

  const memoizedFilterPayments = useMemo(() => {
    // let cachedValue;
    return (_balances) => {
      return _balances.filter((b) => [b.from, b.to].includes(user.username));
      // if (cachedValue && cachedValue._balances === _balances) {
      //   return cachedValue.myBalances;
      // }
      // const myBalances = _balances.filter((b) =>
      //   [b.from, b.to].includes(user.username)
      // );
      // console.log({myBalances});
      // cachedValue = { _balances, myBalances };
      // return myBalances;
    };
  }, []);

  const handleSimplifyClick = () => {
    if (!simplify) {
      // Simplify balances
      const simplifiedBalances = memoizedSimplifyPayments(net_balances);
      dispatch(setBalances(simplifiedBalances));
    } else {
      // Set balances to net balances
      if (showOnlyMine)
        dispatch(setBalances(memoizedFilterPayments(net_balances)));
      else dispatch(setBalances(net_balances));
    }
    setSimplify(!simplify);
  };

  const handleFilterPayments = () => {
    if (!showOnlyMine) {
      dispatch(setBalances(memoizedFilterPayments(net_balances)));
    } else {
      if (simplify)
        dispatch(setBalances(memoizedSimplifyPayments(net_balances)));
      else dispatch(setBalances(net_balances));
    }
    setShowOnlyMine((pval) => !pval);
  };

  useEffect(() => {
    fetchGroupData();
  }, [id]);

  const ExpensesTab = () => (
    <div style={{}}>
      {groupData?.expenses.length > 0 ? (
        <ul style={{ listStyle: "disc", paddingLeft: 20 }}>
          {groupData.expenses.map((expense) => (
            <li key={expense._id}>{expense.description}</li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet.</p>
      )}
    </div>
  );

  const BalancesTab = () => {
    return (
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}
      >
        <div style={{ display: "flex", margin: "2px" }}>
          <Switch
            label="Simplify Payments"
            isOn={simplify}
            handleToggle={handleSimplifyClick}
            colorTwo="#EF476F"
            colorOne="#06D6A0"
          />
          <Switch
            label="Only My Shares"
            isOn={showOnlyMine}
            handleToggle={handleFilterPayments}
            colorTwo="#EF476F"
            colorOne="#06D6A0"
          />
        </div>
        <div>
          {!balances?.length ? (
            <div>Everyone is settled</div>
          ) : (
            <>
              <table className="balance-table">
                <thead>
                  <tr>
                    <th>Creditor</th>
                    <th>Debitor</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {balances.map((balance) => (
                    <tr
                      key={`balance-${balance.from}-${balance.to}`}
                    >
                      <td>{balance.from}</td>
                      <td>{balance.to}</td>
                      <td className={
                        [balance.from, balance.to].includes(user.username)
                          ? balance.from === user.username
                            ? "red-row"
                            : "green-row"
                          : ""
                      }>{balance.amount?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    );
  };
  const MembersTab = () => {
    let shares = {};
    groupData?.balances?.forEach((b) => {
      shares[b.from] =
        (shares.hasOwnProperty(b.from) ? Number(shares[b.from]) : 0) -
        Number(b.amount);
      shares[b.to] =
        (shares.hasOwnProperty(b.to) ? Number(shares[b.to]) : 0) +
        Number(b.amount);
    });
    return (
      <div>
        <table className="balance-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {groupData?.members?.map((m) => (
              <tr key={`share-${m}`}>
                <td>{m}</td>
                <td
                  className={
                    shares[m]
                      ? shares[m] > 0
                        ? "green-row"
                        : "red-row"
                      : ""
                  }
                >
                  {!shares.hasOwnProperty(m)
                    ? "Settled"
                    : shares[m] > 0
                    ? "Will Get"
                    : "Will Give"}
                </td>
                <td>{Math.abs(shares[m] || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {addModalOpen && (
          <AddGroupMember
            onClickHandler={() => setAddModalOpen(!addModalOpen)}
          />
        )}
        {showExp && <AddExpense friend={handleShowExpense} groupId={id} />}
        <div
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            // border: "1px solid #ccc",
            borderRadius: 5,
            height: "80%",
            width: "100%",
            marginBottom: 20 /* Add spacing between components */,
          }}
        >
          <h2 className="text-center bold text-xl shadow-md border-bottom mb-4">
            {groupData?.name}
          </h2>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <button
              className="btn add-participant"
              onClick={() => setAddModalOpen(true)}
            >
              Add Participant
            </button>
            <button className="btn expense" onClick={handleShowExpense}>
              Add Expense
            </button>
          </div>
          <Tabs>
            <TabList>
              <Tab>Balance</Tab>
              <Tab>Members</Tab>
            </TabList>
            <TabPanel>
              <BalancesTab />
            </TabPanel>
            <TabPanel>
              <MembersTab />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
