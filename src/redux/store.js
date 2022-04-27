import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log("111->", store.getState());
});

export default store;
