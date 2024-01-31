import React from "react";
import { useSelector } from "react-redux";

const FriendList = () => {
  const {user} = useSelector((state) => state.user);
  const friends = Object.keys(user.friends ?? {});
  return friends.length ? (
    <ul>
      {friends.map((value) => (
        <li className="friendlist">
          <i class="fas fa-user" />
          <span>{value}</span>
        </li>
      ))}
    </ul>
  ) : (
    <div>No Friends added</div>
  );
};

export default FriendList;
