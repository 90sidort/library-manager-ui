import { authorTypes } from "../constants/types";

export const addAuthors = (author) => {
  return {
    type: authorTypes.ADD_AUTHOR,
    payload: author,
  };
};

export const getAuthors = (authors) => {
  return {
    type: authorTypes.GET_AUTHORS,
    payload: authors,
  };
};

export const updateAuthor = (author) => {
  return {
    type: authorTypes.UPDATE_AUTHOR,
    payload: author,
  };
};
