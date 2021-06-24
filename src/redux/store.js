import { createStore } from "redux";
import reducersCombined from "./reducers/main";

const reduxStore = createStore(
  reducersCombined,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default reduxStore;
