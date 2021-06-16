import React, { useContext, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import SimpleModal from "../components/shared/SimpleModal";

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
  const auth = useContext(AuthContext);
  const classes = useStyles();
  let initialData = {
    title: "",
    pages: 0,
    published: 2000,
    publisher: "",
    available: true,
    description: "",
  };
  const [data, setData] = useState(initialData);
  const [disable, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const onDataChange = (e) => {
    let { value } = e.target;
    const { id } = e.target;
    if (id === "pages" || id === "published") value = parseInt(value);
    else if (id === "available") value = value === "true" ? false : true;
    const newData = { ...data, [id]: value };
    setData(newData);
    for (const [key, value] of Object.entries(newData)) {
      if (key !== "description") {
        if (value === "" || value === null || value === undefined) {
          setDisable(true);
          break;
        } else setDisable(false);
      }
    }
  };

  const resetData = () => {
    setData(initialData);
  };

  const cancelError = () => setErrorMessage("");

  const submitAddBook = async (e) => {
    e.preventDefault();
    const { hide, loading } = props;
    try {
      //   await hide("add");
      //   loading(true);
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        headers: { authorization: `Bearer ${auth.token}` },
        data,
      });
      //   loading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
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
