import React, { useContext, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  FormControlLabel,
  InputLabel,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  button: {
    marginTop: "2%",
    marginRight: "2%",
    marginBottom: "1%",
  },
  buttonGroup: {
    marginLeft: "auto",
  },
}));

const AddBook = (props) => {
  const { genres, authors } = props;
  const auth = useContext(AuthContext);
  const classes = useStyles();
  let initialData = {
    title: "",
    genre: [],
    authors: [],
    language: "polish",
    pages: 0,
    published: 2000,
    publisher: "",
    available: true,
    description: "",
  };
  const [data, setData] = useState(initialData);
  const [disable, setDisable] = useState(true);

  const resetData = () => {
    setData(initialData);
    setDisable(true);
  };

  const onDataChange = (e) => {
    let { value } = e.target;
    const { id, options } = e.target;
    if (id === "pages" || id === "published") value = parseInt(value);
    else if (id === "available") value = value === "true" ? false : true;
    if (id === "genre" || id === "authors") {
      value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    }
    const newData = { ...data, [id]: value };
    setData(newData);
    for (const [key, value] of Object.entries(newData)) {
      if (key !== "description") {
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length < 1)
        ) {
          setDisable(true);
          break;
        } else setDisable(false);
      }
    }
  };

  const submitAddBook = async (e) => {
    e.preventDefault();
    const { loading, setError } = props;
    try {
      await loading(true);
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        headers: { authorization: `Bearer ${auth.token}` },
        data,
      });
      await resetData();
      await loading(false);
    } catch (error) {
      console.log(error.response);
      await setError(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

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
            <FormControl className={classes.formControl}>
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
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="authors" required>
                Authors
              </InputLabel>
              <Select
                multiple
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="language" required>
                Age
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
