import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import {
  Card,
  CircularProgress,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

import { AuthContext } from "../../context/auth.context";
import SimpleModal from "../shared/SimpleModal";
import useStyles from "../../styles/book.styles";
import { useHttp } from "../../hooks/http.hook";
import validationSchema from "../../validators/book.validator";
import BookUpdate from "./BookUpdate";

const Book = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [edit, showEdit] = useState(false);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const initialValues = { ...book };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await sendRequest(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/books/${location.pathname.substring(7)}`,
          "PUT",
          null,
          { authorization: `Bearer ${auth.token}` },
          { ...values }
        );
        console.log(response);
      } catch (error) {}
    },
  });

  const showForm = () => {
    showEdit(!edit);
  };

  const getBook = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        {
          page: 1,
          limit: 1,
          bid: location.pathname.substring(7),
        }
      );
      setBook(response.data.books[0]);
    } catch (error) {}
  };

  useEffect(() => {
    getBook();
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
                    width: "200%",
                    height: "200%",
                    margin: "auto",
                    marginTop: "3%",
                  }}
                />
              </Grid>
            )}
            {book && !loading && (
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Book details
                </Typography>
                <Typography variant="h3" className={classes.lines}>
                  {`${book.title}`}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="h5"
                  className={classes.lines}
                >
                  {`Status: `}
                  {book.available ? "available" : "borrowed"}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Author(s):`}
                  {book.authors.map(
                    (author) => ` ${author.surname}, ${author.name};`
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Genre(s):`}
                  {book.genre.map((genreSingle) => ` ${genreSingle.name};`)}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Language: ${
                    book.language.charAt(0).toUpperCase() +
                    book.language.slice(1)
                  }. Pages: ${book.pages}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Published by: ${book.publisher}, ${book.published}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Description: ${book.description}`}
                </Typography>
                {book && (
                  <CardActions>
                    {auth.admin && (
                      <Button size="small" onClick={showForm}>
                        Edit book data
                      </Button>
                    )}
                    <Button size="small" onClick={() => history.goBack()}>
                      Go back
                    </Button>
                  </CardActions>
                )}
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Book;
