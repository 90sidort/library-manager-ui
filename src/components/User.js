import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import { useLocation } from "react-router";

import { AuthContext } from "../context/auth.context";
import UserEdit from "./UserEdit";
import SimpleModal from "./shared/SimpleModal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
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
  pos: {
    marginBottom: 12,
  },
}));

const User = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const uid = location.pathname.substring(7);
  const [user, setUser] = useState(null);
  const [borrows, showBorrows] = useState(false);
  const [edit, showEdit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const showList = () => {
    showEdit(false);
    showBorrows(!borrows);
  };
  const showForm = () => {
    showBorrows(false);
    showEdit(!edit);
  };
  const cancelError = () => setErrorMessage("");

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
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { page: 1, limit: 1, uid },
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
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(history);

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
      <Card className={classes.root}>
        {user && (
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              User details
            </Typography>
            <Typography variant="h5" component="h2">
              {`${user.surname}, ${user.name}`}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {user.archived ? "archived" : "active"}
            </Typography>
            <Typography variant="body2" component="p">
              {`email: ${user.email}`}
            </Typography>
            <Typography variant="body2" component="p">
              {`joined: ${user.createdAt.split("T")[0]}`}
            </Typography>
            <Typography variant="body2" component="p">
              {`about: ${user.about}`}
            </Typography>
          </CardContent>
        )}
        {user && (
          <CardActions>
            {auth.admin && (
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
      {user && auth.admin && borrows && (
        <div className={classes.borrowings}>
          <List component="nav">
            {user.borrowed.length ? (
              user.borrowed.map((book) => (
                <ListItem button key={book.book._id}>
                  <ListItemText primary={book.book.title} />
                </ListItem>
              ))
            ) : (
              <ListItem button>
                <ListItemText primary="No books" />
              </ListItem>
            )}
          </List>
        </div>
      )}
      {user && auth.admin && edit && (
        <div className={classes.form}>
          <UserEdit
            data={formData}
            hide={showForm}
            updateUserComponent={updateUser}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default User;
