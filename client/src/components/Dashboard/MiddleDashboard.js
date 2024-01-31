import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import "../../styles/Dashboard.css";

const Middle = (props) => {
  const [state, setState] = useState({
    toBeGiven: [],
    toBeTaken: [],
    totalToBeGiven: 0,
    totalToBeTaken: 0,
  });
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    calculate();
  }, [user]);

  function calculate() {
    let toGive = [];
    let toTake = [];
    let giveTotal = 0;
    let takeTotal = 0;
    for (const [key, value] of Object.entries(user?.friends ?? {})) {
      if (value > 0) {
        toTake.push({ username: key, amount: value });
        takeTotal += value;
      } else {
        toGive.push({ username: key, amount: -value });
        giveTotal += value;
      }
    }
    setState({
      toBeGiven: toGive,
      toBeTaken: toTake,
      totalToBeGiven: giveTotal.toFixed(2),
      totalToBeTaken: takeTotal.toFixed(2),
    });
  }

  return (
    <div className="Middle">
      <div className="MidDash">
        <div className="DashHeader">
          <h3>Dashboard</h3>
          <button
            className="btn float-right create-group"
            onClick={props.createGroup}
          >
            Create Group
          </button>
          <button className="btn float-right settle" onClick={props.settle}>
            Settle up
          </button>
          <button className="btn float-right expense" onClick={props.friend}>
            Add an expense
          </button>
        </div>

        <div className="total">
          <div className="fitting">
            <label htmlFor="">total balance</label>
            <p className="green">
              $ {state.totalToBeTaken - state.totalToBeGiven}
            </p>
          </div>
          <div className="fitting">
            <label htmlFor="">you owe</label>
            <p style={{ color: "red" }}>$ {state.totalToBeGiven}</p>
          </div>
          <div className="fitting">
            <label htmlFor="">you are owed</label>
            <p className="green">$ {state.totalToBeTaken}</p>
          </div>
        </div>
      </div>

      <div className="totalCollection">
        <div>
          <label htmlFor="">YOU OWE</label>
        </div>
        <div>
          <label htmlFor="" className="float-right mr-4">
            YOU ARE OWED
          </label>
        </div>
      </div>
      <div className="flex">
        <div className="float-left ml-3 borders">
          <ul>
            {state.toBeGiven.length === 0 ? (
              <li>You do not owe anything</li>
            ) : (
              state.toBeGiven.map((value, key) => (
                <li key={key}>
                  <img
                    className="imgs"
                    src={require("../../images/person-profile.png")}
                    alt=""
                    align="left"
                  />
                  <div className="inline">
                    <h5>{value.username}</h5>
                    <span className="red">you owe ${value.amount}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <ul>
            {state.toBeTaken.length === 0 ? (
              <li>You do not owe anything</li>
            ) : (
              state.toBeTaken.map((value) => (
                <li>
                  <img
                    className="imgs"
                    src={require("../../images/person-profile.png")}
                    alt=""
                    align="left"
                  />
                  <div className="inline">
                    <h5>{value.username}</h5>
                    <span className="green">
                      owes you ${value.amount.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Middle;
