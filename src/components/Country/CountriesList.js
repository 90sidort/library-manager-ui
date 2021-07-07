import React from "react";
import {
  Grid,
  TextField,
  TablePagination,
  Typography,
  List,
  Button,
} from "@material-ui/core";

import SingleListItemGenre from "../shared/SingleListItemGenre";
import useStyles from "../../styles/booklist.styles";

const CountriesList = (props) => {
  const classes = useStyles();
  const {
    countries,
    countrySearch,
    rowsChange,
    pageChange,
    limit,
    page,
    search,
    count,
    resetData,
    deleteCountry,
  } = props;

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" className={classes.title}>
        Countries
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
          onChange={countrySearch}
          value={search.name}
          className={classes.fields}
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
        {countries && (
          <List>
            {countries.length > 0 ? (
              countries.map((country) => (
                <SingleListItemGenre
                  key={country._id}
                  id={country._id}
                  name={country.name}
                  link={`country/${country._id}`}
                  deleteCountry={deleteCountry}
                />
              ))
            ) : (
              <p key={1}>No countries match search criteria</p>
            )}
          </List>
        )}
      </div>
    </Grid>
  );
};

export default CountriesList;
