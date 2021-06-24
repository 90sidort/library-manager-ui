import { authorTypes } from "../constants/types";

const initialState = {
  authors: [],
};

export const authorsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case authorTypes.GET_AUTHORS:
      return state;
    default:
      return state;
  }
};
