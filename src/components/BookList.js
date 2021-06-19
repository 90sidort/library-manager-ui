import React, { useContext, useState } from "react";
import { List, makeStyles } from "@material-ui/core";

import { AuthContext } from "../context/auth.context";
import SingleListItemBook from "./shared/SingleListItemBook";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
  },
  form: {
    margin: theme.spacing(1),
    width: "100%",
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  fields: {
    margin: "auto",
    width: "50%",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const BookList = (props) => {
  // const classes = useStyles();
  // const auth = useContext(AuthContext);
  const {
    // setPage,
    // setLoading,
    books,
    // bookSearch,
    // rowsChange,
    // pageChange,
    // limit,
    // page,
    // search,
    // count,
  } = props;

  return (
    <List>
      {books.length > 0 ? (
        books.map((book) => (
          <SingleListItemBook
            key={book._id}
            id={book._id}
            title={book.title}
            published={book.published}
            authors={book.authors}
            link={`books/${book._id}`}
          />
        ))
      ) : (
        <p>No books match search criteria</p>
      )}
    </List>
  );
};

export default BookList;
