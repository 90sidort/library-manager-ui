import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import useStyles from "../../styles/user.styles";

const NotFound = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{ minHeight: 400, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {auth.token ? "This page does not exist" : "Sign in or signup!"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {auth.token ? "Wrong redirection!" : "You are not logged in."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <RouterLink
            to={auth.token ? `/` : `/signin`}
            style={{ textDecoration: "none" }}
          >
            <Link variant="body2">
              {auth.token ? `Home page` : `Sign page`}
            </Link>
          </RouterLink>
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotFound;
