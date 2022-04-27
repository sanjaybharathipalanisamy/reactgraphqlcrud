import userReducer from "./user/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userData: userReducer,
});

export default rootReducer;
