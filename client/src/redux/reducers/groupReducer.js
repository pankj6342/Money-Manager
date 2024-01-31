import { createAction } from "redux-actions";
import {
  ADD_GROUP_EXPENSE,
  ADD_TO_GROUP,
  SET_BALANCES,
  SET_GROUP,
  SET_NET_BALANCES,
  SET_SHARES,
  SET_SIMPLIFY_BALANCES,
} from "../actions/actionTypes";

const initialState = {
  groupData: {
    members: [],
    balances: {},
    expenses: [],
    name: "",
    net_balances: [],
    simplified_balances: [],
    shares: {}
  },
};

export const setGroup = createAction(SET_GROUP, (payload) => ({
  members: payload.members,
  expenses: payload.expenses,
  name: payload.name,
  id: payload._id,
}));

export const setSimplifyBalances = createAction(SET_SIMPLIFY_BALANCES);
export const setNetBalances = createAction(SET_NET_BALANCES);
export const setBalances = createAction(SET_BALANCES);
export const addGroupExpense = createAction(ADD_GROUP_EXPENSE, (payload) => ({
  amount: payload.amount,
  description: payload.description,
}));
export const addToGroup = createAction(
  ADD_TO_GROUP,
  (payload) => payload.members
);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP: {
      return {
        ...state,
        groupData: action.payload,
      };
    }
    case ADD_GROUP_EXPENSE:
      return {
        ...state,
        groupData: {
          ...state.groupData,
          expenses: [...state.groupData.expenses, action.payload],
        },
      };
    case ADD_TO_GROUP:
      return {
        ...state,
        groupData: {
          ...state.groupData,
          members: [...state.groupData.members, action.payload],
        },
      };
    case SET_SIMPLIFY_BALANCES:
      return {
        ...state,
        groupData: {
          ...state.groupData,
          simplified_balances: action.payload,
        },
      };
    case SET_NET_BALANCES:
      return {
        ...state,
        groupData: {
          ...state.groupData,
          net_balances: action.payload,
        },
      };
    case SET_BALANCES:
      return {
        ...state,
        groupData: {
          ...state.groupData,
          balances: action.payload,
        },
      };
    default:
      return state;
  }
};
