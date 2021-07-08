import React from "react";
import {
  Grid,
  TextField,
  TablePagination,
  Typography,
  List,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
} from "@material-ui/core";

import SingleListItemBook from "../shared/SingleListItemBook";
import allowedLanguages from "../../utils/languages";
import useStyles from "../../styles/booklist.styles";

const BookList = (props) => {
  const classes = useStyles();
  const {
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
    deleteBook,
  } = props;

  const allOptions = <option value="all">{`All`}</option>;
  const optionsLanguages = allowedLanguages.map((language, i) => (
    <option key={i} value={language}>{`${language}`}</option>
  ));
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
  optionsLanguages.unshift(allOptions);

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
          className={classes.fields}
        />
        <FormControl className={classes.fields}>
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
        <FormControl className={classes.fields}>
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
        <FormControl className={classes.fields}>
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
            {optionsLanguages}
          </Select>
        </FormControl>
        <TextField
          id="pageMin"
          label="Pages from"
          variant="outlined"
          type="number"
          onChange={bookSearch}
          value={search.pageMin}
          className={classes.fields}
        />
        <TextField
          id="pageMax"
          label="Pages to"
          variant="outlined"
          type="number"
          onChange={bookSearch}
          value={search.pageMax}
          className={classes.fields}
        />
        <TextField
          id="publisher"
          label="Publisher"
          variant="outlined"
          onChange={bookSearch}
          value={search.publisher}
          className={classes.fields}
        />
        <TextField
          id="publishedMin"
          label="Published from"
          variant="outlined"
          onChange={bookSearch}
          value={search.publishedMin}
          type="number"
          className={classes.fields}
        />
        <TextField
          id="publishedMax"
          label="Published to"
          variant="outlined"
          type="number"
          onChange={bookSearch}
          value={search.publishedMax}
          className={classes.fields}
        />
        <FormControlLabel
          className={classes.fields}
          control={
            <Checkbox
              checked={search.available ? true : false}
              onChange={bookSearch}
              name="available"
              id="available"
              value={search.available}
            />
          }
          label="Available"
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
                  deleteBook={deleteBook}
                />
              ))
            ) : (
              <p key={1}>No users match search criteria</p>
            )}
          </List>
        )}
      </div>
    </Grid>
  );
};

export default BookList;
