import React, { useEffect, useState } from "react";
import "../../../styles/frndPop.css";
import Chips from "react-chips";
import { instance } from "../../../utils/AxiosConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  addGroupExpense,
  setBalances,
  setNetBalances,
} from "../../../redux/reducers/groupReducer";
import { addExpense } from "../../../redux/reducers/userReducer";
import { calculateNetBalance } from "../../GroupPage";

const AddExpense = ({
  friend,
  isGroupExpense = false,
  members = [],
  groupId = undefined,
}) => {
  const { user } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    description: "",
    amount: 0,
    date: new Date().toISOString().slice(0, 10), // Get initial date
  });
  const [defaultShare, setDefaultShare] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [participants, setParticipants] = useState(
    new Map([[user.username, 0]])
  );
  const [participantList, setParticipantList] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ participants });
    setParticipantList([...participants.keys()]);
  }, [participants]);

  const getdate = () => {
    const today = new Date();
    return (
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2)
    );
  };

  const handleDefaultValChange = (amount, totalParticipants) => {
    const newDefaultVal = (amount / totalParticipants).toFixed(2);
    setDefaultShare(newDefaultVal);
    setTotalSum(amount);
    setParticipants(
      (prevMap) =>
        new Map([...prevMap.keys()].map((key) => [key, newDefaultVal]))
    );
  };

  const handleChange = (event) => {
    if (event.target.id === "amount") {
      handleDefaultValChange(event.target.value, participants.size);
    }
    setInput({ ...input, [event.target.id]: event.target.value });
  };

  const handleParticipantChange = (newChips) => {
    newChips = [user.username, ...newChips];
    console.log("newchips", newChips);
    let map = new Map([]);
    let total = 0;
    newChips.forEach((chip) => {
      map.set(chip, participants.has(chip) ? participants.get(chip) : 0);
      total += Number(map.get(chip));
    });
    setTotalSum(total);
    console.log("new map", [...map.keys()], typeof total);
    setParticipants(map);
    // handleDefaultValChange(input.amount, newChips.length);
  };

  const onShareChange = (val, participant) => {
    const numVal = Number(val);
    const pval = Number(
      participants.has(participant) ? participants.get(participant) : 0
    );
    setTotalSum((sum) => sum - pval + numVal);
    setParticipants((map) => new Map(map.set(participant, numVal)));
  };

  const handleSave = () => {
    const participantObj = Object.fromEntries(participants);
    instance
      .post("expense/addExp", {
        username: user.username,
        inp: input,
        participants: participantObj,
        groupId,
      })
      .then((resp) => {
        console.log(resp);
        if (groupId) {
          const b = calculateNetBalance(resp.data.doc);
          dispatch(setNetBalances(b));
          dispatch(setBalances(b));
        } else dispatch(addExpense(resp.data));
        friend();
      });
  };

  return (
    <div className="friendPopup">
      <div className="frnd-content">
        <div className="frnd-header">
          <span>Add an expense</span>

          <button className="float-right" onClick={friend}>
            <i class="fas fa-times" />
          </button>
        </div>

        <div className="exp-inp">
          <label style={{color:'white'}} htmlFor="">Participants</label>
          <div className="exp-name">
            <Chips
              value={participantList}
              onChange={handleParticipantChange}
              suggestions={
                isGroupExpense
                  ? Object.keys(members)
                  : Object.keys(user.friends)
              }
            />
          </div>
        </div>
        <div className="exp-inp2">
          <input
            id="description"
            type="text"
            placeholder="Enter Description"
            onChange={handleChange}
          />
          <input
            id="amount"
            type="number"
            min={0.0}
            step={0.1}
            max={1000000}
            placeholder="Enter Amount"
            onKeyDown={(e) => {
              if (["-", "+"].includes(e.key?.charAt(0))) e.preventDefault();
            }}
            onChange={handleChange}
          />
          <input
            max={getdate()}
            defaultValue={getdate()}
            placeholder="Expense Date"
            id="date"
            type="date"
            onChange={handleChange}
          />
        </div>
        <div className="expense-participants">
          <span>Participants</span>
          {[...participants?.keys()]?.map((participant) => {
            return (
              <div className="share">
                <label htmlFor="">{participant}</label>
                <input
                  type="number"
                  defaultValue={0}
                  min={0.0}
                  value={
                    participants.has(participant)
                      ? participants.get(participant)
                      : defaultShare
                  }
                  pattern={"[0-9.]+"}
                  onChange={(e) => onShareChange(e.target.value, participant)}
                ></input>
              </div>
            );
          })}
        </div>
        <div style={{ color: "red", textAlign: "center" }}>
          {totalSum != input.amount
            ? `Total ${totalSum} is not equal to expense amount ${input.amount}`
            : ``}
        </div>
        <div className="pop-btn pop-btns">
          <button
            disabled={totalSum != input.amount}
            className="btn Add"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="btn cut" onClick={friend}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
