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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LibraryBooks className={classes.icon} color="inherit" />
          <Typography variant="h6" className={classes.title}>
            LIB MANAGER
          </Typography>
          {auth.token ? (
            <React.Fragment>
              {auth.admin ? (
                <Tooltip title="Users" aria-label="users">
                  <Link to="/users">
                    <PeopleAlt className={classes.icon} color="inherit" />
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip title="Profile" aria-label="users">
                  <Link to={`/users/${auth.userId}`}>
                    <AccountCircle className={classes.icon} color="inherit" />
                  </Link>
                </Tooltip>
              )}
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
                <Link to="/reviews">
                  <RateReview className={classes.icon} color="inherit" />
                </Link>
              </Tooltip>
              <Tooltip title="Logout" aria-label="logout">
                <Button onClick={auth.logout}>
                  <ExitToApp className={classes.icon} color="inherit" />
                </Button>
              </Tooltip>
            </React.Fragment>
          ) : (
            <Tooltip title="Sign" aria-label="sign">
              <Link to="/signin">
                <VpnKey className={classes.icon} color="inherit" />
              </Link>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
