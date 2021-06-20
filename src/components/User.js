import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { useLocation } from "react-router";

import { AuthContext } from "../context/auth.context";
import UserEdit from "./UserEdit";
import SimpleModal from "./shared/SimpleModal";
import BookList from "./BookList";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "3%",
  },
  borrowings: {
    width: "100%",
    maxWidth: 360,
    marginTop: "1%",
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: "100%",
    marginTop: "1%",
    marginLeft: "1%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  lines: {
    paddingBottom: 7,
    paddingTop: 7,
  },
  pos: {
    marginBottom: 12,
  },
}));

const User = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [borrows, showBorrows] = useState(false);
  const [edit, showEdit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showList = () => {
    showEdit(false);
    showBorrows(!borrows);
  };
  const showForm = () => {
    showBorrows(false);
    showEdit(!edit);
  };
  const cancelError = () => {
    setErrorMessage("");
    setLoading(false);
  };

  const updateUser = (user) => {
    const { name, surname, email, about, _id } = user;
    setUser(user);
    setFormData({
      name,
      surname,
      email,
      about,
      id: _id,
    });
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: {
          page: 1,
          limit: 1,
          uid: location.pathname.substring(7),
        },
      });
      const userData = response.data.users[0];
      setUser(userData);
      setFormData({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        about: userData.about,
        id: userData._id,
      });
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Card>
            {loading && (
              <Grid container spacing={2}>
                <CircularProgress
                  color="secondary"
                  style={{
                    width: "20%",
                    height: "20%",
                    margin: "auto",
                    marginTop: "3%",
                  }}
                />
              </Grid>
            )}
            {user && !loading && (
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  User details
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.lines}
                >
                  {`${user.surname}, ${user.name}`}
                </Typography>
                <Typography color="textSecondary" className={classes.lines}>
                  {user.archived ? "archived" : "active"}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Email: ${user.email}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Joined: ${user.createdAt.split("T")[0]}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`About: ${user.about}`}
                </Typography>
              </CardContent>
            )}
            {user && (
              <CardActions>
                {auth.admin | (auth.userId === user._id) && (
                  <Button size="small" onClick={showList}>
                    Borrowed books
                  </Button>
                )}
                {auth.admin | (auth.userId === user._id) && (
                  <Button size="small" onClick={showForm}>
                    Edit user data
                  </Button>
                )}
                <Button size="small" onClick={() => history.goBack()}>
                  Go back
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
      </Grid>
      {user && borrows && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.borrowings}>
              <BookList borrowed={user.borrowed} />
            </div>
          </Grid>
        </Grid>
      )}
      {user && edit && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.form}>
              <UserEdit
                data={formData}
                hide={showForm}
                updateUserComponent={updateUser}
                loading={setLoading}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default User;
