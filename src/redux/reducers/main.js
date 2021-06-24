import { combineReducers } from "redux";
import { authorsReducer } from "./author.reducer";

const reducersCombined = combineReducers({
  authors: authorsReducer,
});

export default reducersCombined;
