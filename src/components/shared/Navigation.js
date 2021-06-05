import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import {
  LibraryBooks,
  ExitToApp,
  PeopleAlt,
  MenuBook,
  Public,
  Create,
  Category,
  RateReview,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LibraryBooks className={classes.icon} color="inherit" />
          <Typography variant="h6" className={classes.title}>
            LIB MANAGER
          </Typography>
          <Link to="/users">
            <PeopleAlt className={classes.icon} color="inherit" />
          </Link>
          <Link to="/">
            <MenuBook className={classes.icon} color="inherit" />
          </Link>
          <Link to="/authors">
            <Create className={classes.icon} color="inherit" />
          </Link>
          <Link to="/countries">
            <Public className={classes.icon} color="inherit" />
          </Link>
          <Link to="/genres">
            <Category className={classes.icon} color="inherit" />
          </Link>
          <Link to="/reviews">
            <RateReview className={classes.icon} color="inherit" />
          </Link>
          <ExitToApp className={classes.icon} color="inherit" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
