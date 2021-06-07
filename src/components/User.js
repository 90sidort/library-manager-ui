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
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const uid = location.pathname.substring(7);
  const [user, setUser] = useState(null);
  const [borrows, showBorrows] = useState(false);

  const showList = () => showBorrows(!borrows);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: { page: 1, limit: 1, uid },
      });
      setUser(response.data.users[0]);
    };
    getUser();
  }, [auth.token, uid]);
  return (
    <React.Fragment>
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
              <Button size="small" onClick={showList}>
                Edit user data
              </Button>
            )}
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
    </React.Fragment>
  );
};

export default User;
