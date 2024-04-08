import React, { useState } from "react";
import "../../../styles/frndPop.css";
import { instance } from "../../../utils/AxiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, setUser } from "../../../redux/reducers/userReducer";
import { addToGroup } from "../../../redux/reducers/groupReducer";

const AddGroupMember = (props) => {
  const [member, setMember] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { groupData } = useSelector((state) => state.group);
  console.log({groupData});
  return (
    <div className="friendPopup">
      <div className="frnd-content">
        <div className="frnd-header">
          <span>Add a Member to {groupData.name}</span>
          <button className="float-right" onClick={props.onClickHandler}>
            <i class="fas fa-times" />
          </button>
        </div>

        <input
          id="member_username"
          onChange={(event) => {
            setMember(event.target.value);
          }}
          value={member}
          placeholder="Type a username"
          className="frnd-name"
          type="text"
        />

        <div className="pop-btn">
          <button
            className="btn Add"
            onClick={() => {
              //   takeInp.defaultUser = user.username;
              if (member == user.username) {
                alert("you can't add yourself as your Friend");
                return;
              }
              instance
                .post("group/addToGroup", {
                  memberIds: [member],
                  groupId: groupData.id,
                  groupName: groupData.name,
                })
                .then((resp) => {
                  console.log("result", resp);
                  if (resp.data.success) {
                    dispatch(addToGroup(member));
                    alert("Added successfully");
                  } else {   
                    alert("Failed to add member");
                    console.log("user not found");
                  }
                })
                .catch((err) => {
                  alert("Failed to add member");
                  console.log(err);
                }).finally(()=>{
                  props?.onClickHandler()
                });
            }}
          >
            Add Member
          </button>

          <button className="btn cut" onClick={props.onClickHandler}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupMember;
