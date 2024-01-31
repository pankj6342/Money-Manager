import React, { useEffect, useState } from "react";
import "../../../styles/frndPop.css";
import { PaidBy } from "./paidBy";
import { PaidTo } from "./paidTo";
import { connect, useDispatch, useSelector } from "react-redux";
import { instance } from "../../../utils/AxiosConfig";
import { setUser } from "../../../redux/reducers/userReducer";

const SettleUp = ({ friend }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  var [val, setVal] = useState(0);
  const [paidBy, setPaidBy] = useState(false);
  const [paidTo, setPaidTo] = useState(false);
  const [byValue, setByValue] = useState("you");
  const [toValue, setToValue] = useState("select");
  const [friends, setFriends] = useState([user.username]);

  useEffect(() => {
    setFriends(friends.concat(Object.keys(user.friends)));
  }, [user]);

  const handlePaidByClick = () => {
    setPaidBy(!paidBy);
    setPaidTo(false);
  };

  const handlePaidToClick = () => {
    setPaidBy(false);
    setPaidTo(!paidTo);
  };

  const handleByValueChange = (event) => {
    const updatedValue = event === user.username ? "you" : event;
    setByValue(updatedValue);
  };

  const handleToValueChange = (event) => {
    const updatedValue = event === user.username ? "you" : event;
    setToValue(updatedValue);
  };

  const handleSave = () => {
    if (toValue === "select") {
      alert("please select the reciver");
      return;
    }
    if (val === "") {
      alert("you must enter an amount");
      return;
    }
    if (toValue !== "you" && byValue !== "you") {
      alert("you cannot add an Expense that does not involve yourself");
      return;
    }
    if (toValue === byValue) {
      alert("you can't add money to yourself");
      return;
    }

    let sender = toValue === "you" ? byValue : toValue;
    let reciever = toValue === "you" ? user.username : toValue;
    val = toValue === "you" ? "-" + val : val;

    instance
      .post("expense/settle", {
        debt: reciever,
        cred: sender,
        val: parseInt(val),
        username: user.username,
      })
      .then((resp) => {
        console.log(resp.data.user);
        if (resp.data.success) {
          dispatch(setUser(resp.data.user));
          friend();
        } else alert("Something went wront");
      });
  };

  return (
    <div className="friendPopup">
      <div className="flx">
        <div className="frnd-content">
          <div className="frnd-header">
            <span>Settle up</span>

            <button className="float-right" onClick={friend}>
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div className="frnd-set">
            <button onClick={handlePaidByClick}>
              {byValue === "you" ? "you" : byValue.slice(0, 6) + "..."}
            </button>
            paid
            <button onClick={handlePaidToClick}>
              {toValue === "you" || toValue === "select"
                ? toValue
                : toValue.slice(0, 6) + "..."}
            </button>
          </div>

          <input
            className="money"
            onChange={(event) => setVal(event.target.value)}
            placeholder="$ 0.0"
            type="number"
            name=""
            id=""
          />
          <div className="pop-btn bt-mr">
            <button className="btn Add" onClick={handleSave}>
              Save
            </button>
            <button className="btn cut" onClick={friend}>
              Close
            </button>
          </div>
        </div>

        {paidBy && <PaidBy list={friends} byValue={handleByValueChange} />}
        {paidTo && <PaidTo list={friends} toValue={handleToValueChange} />}
      </div>
    </div>
  );
};

export default SettleUp;
