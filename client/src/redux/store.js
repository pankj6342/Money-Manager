import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
// Optional: Add middleware for asynchronous actions
// import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk], // Add if using middleware
});

export default store;


// export default store = configureStore({
//   reducer: {
//     user: userReducer,
//     group: groupReducer,
//   },
// });

// store.subscribe(() => {
//   console.log("subscribe .....", store.getState());
// });
