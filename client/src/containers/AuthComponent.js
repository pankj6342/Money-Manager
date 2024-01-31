import React, { useState, useEffect } from "react";
import { instance } from "../utils/AxiosConfig";
import { addFriend, setUser } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

function AuthComponent(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      navigate("/login");
      return;
    }

    instance
      .get("/getUser", { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        console.log("and here Iam");
        console.log(res);
        setUserData(res.data.userdata.doc);
        setUser(res.data.userdata.doc);
        localStorage.username = res.data.userdata.doc.username;
      })
      .catch((err) => {
        localStorage.removeItem("jwtToken");
        navigate('/login');
      });
  }, []); // Empty dependency array to run only on mount


  return userData === undefined ? (
    <div>
      <h1>loading..........</h1>
    </div>
  ) : (
    <div>{props.children}</div>
  );
}

export default AuthComponent;
