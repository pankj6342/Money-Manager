import { combineReducers } from "redux";
import userReducer from "./userReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
  user: userReducer,
  group: groupReducer,
});