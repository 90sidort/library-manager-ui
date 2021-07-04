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

const GenresList = (props) => {
  const classes = useStyles();
  const {
    genres,
    genreSearch,
    rowsChange,
    pageChange,
    limit,
    page,
    search,
    count,
    resetData,
    deleteGenre,
  } = props;

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h6" className={classes.title}>
        Genres
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
          onChange={genreSearch}
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
        {genres && (
          <List>
            {genres.length > 0 ? (
              genres.map((genre) => (
                <SingleListItemGenre
                  key={genre._id}
                  id={genre._id}
                  name={genre.name}
                  link={`genres/${genre._id}`}
                  deleteGenre={deleteGenre}
                />
              ))
            ) : (
              <p key={1}>No genres match search criteria</p>
            )}
          </List>
        )}
      </div>
    </Grid>
  );
};

export default GenresList;
