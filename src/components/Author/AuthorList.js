import React from "react";
import {
  Grid,
  TextField,
  TablePagination,
  Typography,
  List,
  Select,
  InputLabel,
  Button,
  FormControl,
} from "@material-ui/core";

import SingleListItemAuthor from "../shared/SingleListItemAuthor";
import useStyles from "../../styles/booklist.styles";

const AuthorList = (props) => {
  const classes = useStyles();
  const {
    authors,
    authorSearch,
    rowsChange,
    pageChange,
    limit,
    page,
    search,
    count,
    countries,
    resetData,
    deleteAuthor,
  } = props;

  const allOptions = <option value="all">{`All`}</option>;
  const optionsCountries = countries.map((country, i) => (
    <option key={i} value={country._id}>{`${country.name}`}</option>
  ));
  optionsCountries.unshift(allOptions);

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" className={classes.title}>
        Authors
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
          id="name"
          label="Name"
          variant="outlined"
          onChange={authorSearch}
          value={search.name}
          className={classes.fields}
        />
        <TextField
          id="surname"
          label="Surname"
          variant="outlined"
          onChange={authorSearch}
          value={search.surname}
          className={classes.fields}
        />
        <FormControl className={classes.fields}>
          <InputLabel htmlFor="genre">Country</InputLabel>
          <Select
            native
            variant="outlined"
            value={search.country}
            onChange={authorSearch}
            inputProps={{
              name: "country",
              id: "country",
            }}
          >
            {optionsCountries}
          </Select>
        </FormControl>
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
        {authors && (
          <List>
            {authors.length > 0 ? (
              authors.map((author) => (
                <SingleListItemAuthor
                  key={author._id}
                  id={author._id}
                  name={author.name}
                  surname={author.surname}
                  country={author.country}
                  link={`authors/${author._id}`}
                  deleteAuthor={deleteAuthor}
                />
              ))
            ) : (
              <p key={1}>No authors match search criteria</p>
            )}
          </List>
        )}
      </div>
    </Grid>
  );
};

export default AuthorList;
