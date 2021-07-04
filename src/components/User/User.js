import React, { useContext, useEffect, useState } from "react";

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

import { AuthContext } from "../../context/auth.context";
import UserEdit from "./UserEdit";
import SimpleModal from "../shared/SimpleModal";
import SingleListItemBook from "../shared/SingleListItemBook";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles/user.styles";
import { useHttp } from "../../hooks/http.hook";
import { useFormik } from "formik";
import validationSchema from "../../validators/editUser.validator";

const User = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [borrows, showBorrows] = useState(false);
  const [edit, showEdit] = useState(false);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const initialDataEditUser = {
    name: user ? user.name : "",
    surname: user ? user.surname : "",
    email: user ? user.email : "",
    about: user ? user.about : "",
  };

  const formik = useFormik({
    initialValues: initialDataEditUser,
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/users/${location.pathname.substring(7)}`,
          "PUT",
          { ...values, bid: location.pathname.substring(7) },
          { authorization: `Bearer ${auth.token}` },
          { uid: location.pathname.substring(7) }
        );
        resetForm();
        getUser();
        setSubmitting(false);
        showEdit(false);
      } catch (error) {}
    },
  });

  const showList = () => {
    showEdit(false);
    showBorrows(!borrows);
  };
  const showForm = () => {
    showBorrows(false);
    showEdit(!edit);
  };

  const getUser = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 1, uid: location.pathname.substring(7) }
      );
      const userData = response.data.users[0];
      setUser(userData);
    } catch (error) {}
  };

  const returnBook = async (bid) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/borrows/return`,
        "PATCH",
        { bid, uid: location.pathname.substring(7) },
        { authorization: `Bearer ${auth.token}` },
        null
      );
      getUser();
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={clearError} />
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
            <div className={classes.borrowings} style={{ listStyle: "none" }}>
              {user.borrowed.length > 0 ? (
                user.borrowed.map((borrowing) => (
                  <SingleListItemBook
                    key={borrowing.book._id}
                    id={borrowing.book._id}
                    title={borrowing.book.title}
                    published={borrowing.book.published}
                    authors={borrowing.book.authors}
                    link={`/books/${borrowing.book._id}`}
                    returnBook={returnBook}
                    overdue={
                      Date.parse(new Date()) > Date.parse(borrowing.end)
                        ? true
                        : false
                    }
                    endDate={borrowing.end}
                  />
                ))
              ) : (
                <p>No borrowings</p>
              )}
            </div>
          </Grid>
        </Grid>
      )}
      {user && edit && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.form}>
              <UserEdit formik={formik} />
            </div>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default User;
