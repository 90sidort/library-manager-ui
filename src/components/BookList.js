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
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

import { AuthContext } from "../context/auth.context";
import SingleListItemBook from "./shared/SingleListItemBook";
import { FormControl } from "@material-ui/core";

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
    authors,
    genres,
    resetData,
  } = props;

  const allOptions = <option value="all">{`All`}</option>;
  const optionsGenres = genres.map((genre, i) => (
    <option key={i} value={genre._id}>{`${genre.name}`}</option>
  ));
  const optionsAuthors = authors.map((author, i) => (
    <option
      key={i}
      value={author._id}
    >{`${author.surname}, ${author.name}`}</option>
  ));
  optionsGenres.unshift(allOptions);
  optionsAuthors.unshift(allOptions);

  console.log(search);
  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" className={classes.title}>
        Books
      </Typography>
      <Button
        className={classes.button}
        onClick={resetData}
        variant="contained"
        color="secondary"
      >
        Reset
      </Button>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          onChange={bookSearch}
          value={search.title}
          // className={classes.fields}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={search.available}
              onChange={bookSearch}
              name="available"
              id="available"
              value={search.available}
            />
          }
          label="Available"
        />
        <FormControl className={classes.select}>
          <InputLabel htmlFor="genre">Genre</InputLabel>
          <Select
            native
            variant="outlined"
            value={search.genre}
            onChange={bookSearch}
            inputProps={{
              name: "genre",
              id: "genre",
            }}
          >
            {optionsGenres}
          </Select>
        </FormControl>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="authors">Author</InputLabel>
          <Select
            native
            variant="outlined"
            value={search.authors}
            onChange={bookSearch}
            inputProps={{
              name: "authors",
              id: "authors",
            }}
          >
            {optionsAuthors}
          </Select>
        </FormControl>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="language">Language</InputLabel>
          <Select
            native
            variant="outlined"
            value={search.language}
            onChange={bookSearch}
            inputProps={{
              name: "language",
              id: "language",
            }}
          >
            <option value="polish">Polish</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="german">German</option>
          </Select>
        </FormControl>
        <TextField
          id="pageMin"
          label="Pages from"
          variant="outlined"
          type="number"
          onChange={bookSearch}
          value={search.pageMin}
          // className={classes.fields}
        />
        <TextField
          id="pageMax"
          label="Pages to"
          variant="outlined"
          type="number"
          onChange={bookSearch}
          value={search.pageMax}
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
        <TextField
          id="publishedMin"
          label="Published from"
          variant="outlined"
          onChange={bookSearch}
          value={search.publishedMin}
          type="number"
          // className={classes.fields}
        />
        <TextField
          id="publishedMax"
          label="Published to"
          variant="outlined"
          type="number"
          onChange={bookSearch}
          value={search.publishedMax}
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
              books.map((book, i) => (
                <SingleListItemBook
                  key={i}
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
