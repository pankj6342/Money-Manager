import { createAction } from "redux-actions";
import {
  ADD_EXPENSE,
  ADD_FRIEND,
  ADD_GROUP,
  SET_USER,
} from "../actions/actionTypes";

const initialState = {
  user: {
    username: "",
    friends: [],
    groups: [],
    expenses: [],
  },
};

export const addFriend = createAction(ADD_FRIEND, (payload) => ({
  name: payload.username,
  email: payload.email,
}));

export const addGroup = createAction(ADD_GROUP, (payload) => ({
  name: payload.name,
  id: payload._id,
}));

export const setUser = createAction(SET_USER);

export const addExpense = createAction(ADD_EXPENSE, (payload) => ({
  amount: payload.amount,
  description: payload.description,
}));

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        user: {
          ...state.user,
          expenses: [...state.user.expenses, action.payload],
        },
      };
    case ADD_FRIEND:
      return {
        ...state,
        user: {
          ...state.user,
          friends: [...state.user.friends, action.payload],
        },
      };
      case ADD_GROUP:
        return {
          ...state, 
          user: {
            ...state.user,
            groups: [...state.user.groups, action.payload]
          }
        }
    default:
      return state;
  }
};
