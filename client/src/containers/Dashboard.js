import React, { useEffect, useState } from "react";
import { AddFriend } from "../components/Dashboard/AddFriends";
import Middle from "../components/Dashboard/MiddleDashboard";
import { instance } from "../utils/AxiosConfig";
import Friend from "../components/Dashboard/popups/Friend";
import "../styles/Dashboard.css";
import AddExpense from "../components/Dashboard/popups/addExpense";
import SettleUp from "../components/Dashboard/popups/settleUp";
import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/Dashboard/GroupList";
import { Route, Routes, useParams } from "react-router-dom";
import GroupPage from "../components/GroupPage";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import "../styles/index.css";

export const Dashboard = (props) => {
  const [showFriend, setShowFriend] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [settleUp, setSettleUp] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log({ id });
  useEffect(() => {
    instance
      .post("/getData", { username: localStorage.username })
      .then((resp) => {
        console.log("getuser", resp.data.user);
        dispatch(setUser(resp.data.user));
      });
  }, []);

  function handleShowFriend() {
    setShowFriend(!showFriend);
  }

  function handleShowExpense() {
    setShowExp(!showExp);
  }

  function handleSettle() {
    setSettleUp(!settleUp);
  }
  function handleCreateGroup() {
    setCreateGroup(!createGroup);
  }

  return (
    <div>
      {showFriend && <Friend friend={handleShowFriend} />}
      {showExp && <AddExpense friend={handleShowExpense} />}
      {settleUp && <SettleUp friend={handleSettle} />}
      {createGroup && <CreateGroup friend={handleCreateGroup} />}
      <div className="flex">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AddFriend friend={handleShowFriend} />
        </div>
        <div className="Middle">
          <div
            style={{
              margin:"1%",
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <button
              style={{
                alignSelf:"end"
              }}
              className="btn add-participant"
              onClick={() => setCreateGroup(true)}
            >
              Create Group
            </button>
          </div>
          <Routes>
            <Route path="groups/:id" element={<GroupPage />} />
            <Route path="" element={<GroupList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
