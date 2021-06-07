import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router";
import { AuthContext } from "../context/auth.context";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

const User = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const uid = location.pathname.substring(7);
  const [user, setUser] = useState(null);
  console.log(user);
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
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default User;
