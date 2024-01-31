import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdGroups, MdInfo } from "react-icons/md"; // Import specific icons

const GroupList = () => {
  const { user } = useSelector((state) => state.user);
  console.log("groups", user.groups);
  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Group List</h2>
      {user.groups?.length > 0 ? (
        <ul className="">
          {user.groups.map((group) => (
            <li
              key={group.id}
              style={{background: ''}}
              className="bg-gray-500 rounded-lg shadow p-4 flex items-center justify-between"
            >
              <Link to={`/dashboard/groups/${group.id}`} className="flex items-center">
                <MdGroups className="mr-4 text-primary" size={24} />
                <h3 className="text-base font-medium">{group.name}</h3>
              </Link>
              <MdInfo className="text-gray-400" size={20} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center mt-4">
          <MdInfo className="text-gray-400 mr-4" size={24} />
          <p className="text-md font-medium">
            You are not added to any groups.
          </p>
        </div>
      )}
    </div>
  );
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="GroupList"
    >
      <h3> Your Groups </h3>
      <div>
        {user?.groups?.length ? (
          <ul>
            {user.groups.map((group, key) => (
              <li className="groupList" key={key}>
                <i class="fas fa-users" style={{ marginRight: "4px" }} />
                <Link to={`/dashboard/groups/${group.id}`}>
                  {/* <a href={`/dashboard/groups/${group.id}`}> */}
                  {group.name ?? `Group ${key + 1}`}
                  {/* </a> */}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <span>You are not added to any group 😢</span>
        )}
      </div>
    </div>
  );
};

export default GroupList;
