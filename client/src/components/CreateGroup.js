import React, { useState } from "react";
import Chips from "react-chips";
import { instance } from "../utils/AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../redux/reducers/groupReducer";
import { addGroup } from "../redux/reducers/userReducer";

const CreateGroup = ({ friend }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [selectedUsers, setSelectedUsers] = useState([user.username]);
  const [groupName, setGroupName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("group/addToGroup", {
        groupName,
        memberIds: selectedUsers,
        groupId: undefined,
      });
      if (response?.data?.success) {
        alert("Group Created Successfully");
        dispatch(setGroup(response.data.group));
        dispatch(addGroup(response.data.group));
        friend();
      }
      console.log("Group created:", response.data);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleChange = (chips) => {
    if (!chips.includes(user.username)) chips.push(user.username);
    setSelectedUsers(chips);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          backgroundColor: "#1B262C",
          padding: 20,
          borderRadius: 5,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          height: "70%",
          width: "50%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h2 style={{ textAlign: "center" }}>Create Group</h2>
            <button style={{}} onClick={() => friend()}>
              ❌
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <input
              style={{
                backgroundColor: "#1B262C",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px 10px",
                margin: "5px",
                fontSize: 14,
                cursor: "pointer",
                height: "full",
                overflowY: "auto",
                color:"white"
              }}
              className="groupName"
              value={groupName}
              placeholder="Enter Group Name"
              onChange={handleGroupNameChange}
              required
            />
            <Chips
              value={selectedUsers}
              onChange={handleChange}
              placeholder="Add users to create group"
              onDelete={(chip) => {
                console.log("ondelete", chip);
                if (chip === user.username) return;
                setSelectedUsers(selectedUsers.filter((u) => u !== chip));
              }}
              suggestions={Object.keys(user.friends)}
              suggestionRenderer={(suggestion) => (
                <span>{suggestion.username}</span>
              )}
              style={{
                backgroundColor: "#1B262C",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px 10px",
                margin: "5px",
                fontSize: 14,
                cursor: "pointer",
                height: "full",
                overflowY: "auto",
              }}
              deleteIconStyle={{
                color: "#a0a0a0",
                marginLeft: 5,
                cursor: "pointer",
              }}
              suggestionsContainerStyle={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#1B262C",
                maxHeight: 200,
                overflowY: "auto",
                color:"black"
              }}
              suggestionStyle={{
                padding: "5px 10px",
                cursor: "pointer",
              }}
              suggestionHighlightedStyle={{
                backgroundColor: "#1B262C",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: 10,
              }}
            >
              Create Group
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
