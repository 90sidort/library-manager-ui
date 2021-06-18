import React, { useContext, useState } from "react";
import {
  ListItem,
  ListItemText,
  Grid,
  TextField,
  TablePagination,
  Typography,
  List,
  makeStyles,
} from "@material-ui/core";

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
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const {
    setPage,
    setLoading,
    books,
    bookSearch,
    rowsChange,
    pageChange,
    limit,
    page,
    search,
    count,
  } = props;

  console.log(books);

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" className={classes.title}>
        Books
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          onChange={bookSearch}
          value={search.title}
          // className={classes.fields}
        />
        <TextField
          id="language"
          label="Language"
          variant="outlined"
          onChange={bookSearch}
          value={search.language}
          // className={classes.fields}
        />
        <TextField
          id="publisher"
          label="Publisher"
          variant="outlined"
          onChange={bookSearch}
          value={search.publisher}
          // className={classes.fields}
        />
      </form>
      <TablePagination
        component="div"
        page={page - 1}
        rowsPerPage={limit}
        count={count}
        onChangePage={pageChange}
        onChangeRowsPerPage={rowsChange}
      />
      <div className={classes.demo}>
        {books && (
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
              <p>No users match search criteria</p>
            )}
          </List>
        )}
      </div>
    </Grid>
  );
};

export default BookList;
