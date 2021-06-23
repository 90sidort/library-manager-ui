import React from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  FormControlLabel,
  InputLabel,
  Checkbox,
} from "@material-ui/core";

import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import useStyles from "../../styles/addbook.styles";

const AddBook = (props) => {
  const {
    genres,
    authors,
    resetData,
    onDataChange,
    disable,
    submitAddBook,
    data,
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Provide book data
      </Typography>
      <form
        autoComplete="off"
        onSubmit={submitAddBook}
        style={{ marginBottom: "10%" }}
      >
        <Grid container spacing={3}>
          <div className={classes.buttonGroup}></div>
          <Button
            className={classes.button}
            type="submit"
            variant="outlined"
            color="primary"
            disabled={disable}
          >
            Add
          </Button>
          <Button
            className={classes.button}
            onClick={resetData}
            variant="contained"
            color="secondary"
          >
            Reset
          </Button>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              value={data.title}
              onChange={onDataChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.select}>
              <InputLabel shrink htmlFor="genre" required>
                Genres
              </InputLabel>
              <Select
                multiple
                native
                value={data.genre}
                onChange={onDataChange}
                inputProps={{
                  id: "genre",
                }}
              >
                {genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.select}>
              <InputLabel shrink htmlFor="authors" required>
                Authors
              </InputLabel>
              <Select
                multiple
                className={classes.select}
                native
                value={data.authors}
                onChange={onDataChange}
                inputProps={{
                  id: "authors",
                }}
              >
                {authors.map((author) => (
                  <option key={author._id} value={author._id}>
                    {`${author.name}, ${author.name}`}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.select}>
              <InputLabel htmlFor="language" required>
                Language
              </InputLabel>
              <Select
                native
                value={data.language}
                onChange={onDataChange}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              required
              id="pages"
              name="pages"
              label="Pages"
              value={data.pages}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              required
              id="published"
              name="published"
              label="Published"
              value={data.published}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              required
              id="publisher"
              name="publisher"
              label="Publisher"
              value={data.publisher}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.available}
                  onChange={onDataChange}
                  name="available"
                  id="available"
                  value={data.available}
                />
              }
              label="Available"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              value={data.description}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Description"
              id="description"
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default AddBook;
