import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import {
  LibraryBooks,
  ExitToApp,
  PeopleAlt,
  MenuBook,
  Public,
  Create,
  Category,
  RateReview,
  VpnKey,
  AccountCircle,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontWeight: 1000,
  },
  icon: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  let body;
  if (!auth.token)
    body = (
      <Tooltip title="Sign" aria-label="sign">
        <Link to="/signin">
          <VpnKey className={classes.icon} color="inherit" />
        </Link>
      </Tooltip>
    );
  else if (auth.token && auth.admin)
    body = (
      <React.Fragment>
        <Tooltip title="Users" aria-label="users">
          <Link to="/users">
            <PeopleAlt className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Books" aria-label="books">
          <Link to="/">
            <MenuBook className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Authors" aria-label="author">
          <Link to="/authors">
            <Create className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Countries" aria-label="countries">
          <Link to="/countries">
            <Public className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Genres" aria-label="genres">
          <Link to="/genres">
            <Category className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Reviews" aria-label="reviews">
          <Link to="/review">
            <RateReview className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Logout" aria-label="logout">
          <Button onClick={auth.logout}>
            <Link to="/signin">
              <ExitToApp className={classes.icon} color="inherit" />
            </Link>
          </Button>
        </Tooltip>
      </React.Fragment>
    );
  else
    body = (
      <React.Fragment>
        <Tooltip title="Profile" aria-label="profile">
          <Link to={`/users/${auth.userId}`}>
            <PeopleAlt className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Books" aria-label="books">
          <Link to="/">
            <MenuBook className={classes.icon} color="inherit" />
          </Link>
        </Tooltip>
        <Tooltip title="Logout" aria-label="logout">
          <Button onClick={auth.logout}>
            <Link to="/signin">
              <ExitToApp className={classes.icon} color="inherit" />
            </Link>
          </Button>
        </Tooltip>
      </React.Fragment>
    );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LibraryBooks className={classes.icon} color="inherit" />
          <Typography variant="h6" className={classes.title}>
            LIB MANAGER
          </Typography>
          {body}
        </Toolbar>
      </AppBar>
    </div>
  );
}
