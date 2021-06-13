import React, { useContext, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles,
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

const UserEdit = (props) => {
  const { name, surname, email, about, id } = props.data;
  const auth = useContext(AuthContext);
  const classes = useStyles();
  let initialData = {
    name,
    surname,
    email,
    about,
  };
  const [data, setData] = useState(initialData);
  const [disable, setDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDataChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
    setDisable(value === "" ? true : false);
  };

  const resetData = () => {
    setData(initialData);
  };

  const cancelError = () => setErrorMessage("");

  const submitUserChanges = async (e) => {
    e.preventDefault();
    const { hide, updateUserComponent, loading } = props;
    try {
      await hide();
      loading(true);
      const response = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { uid: id },
        data,
      });
      loading(false);
      updateUserComponent(response.data.user);
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
        Change user data
      </Typography>
      <form
        autoComplete="off"
        onSubmit={submitUserChanges}
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
            Update
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
              id="name"
              name="name"
              label="Name"
              value={data.name}
              onChange={onDataChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              required
              id="surname"
              name="surname"
              label="Surname"
              value={data.surname}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              required
              id="email"
              name="email"
              label="Email"
              value={data.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onDataChange}
              required
              id="about"
              name="about"
              label="About"
              value={data.about}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default UserEdit;
