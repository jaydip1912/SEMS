import { combineReducers } from "redux";
import { authReducer } from "./reducer/authSlice";
import userReducer from "./reducer/userReducer";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = initialState;
  }
  return appReducer(state, action);
};
export default rootReducer;
