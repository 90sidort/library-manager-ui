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
  const [initialValues, setInitialValues] = useState(null);
  const [genres, setGenres] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [edit, showEdit] = useState(false);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const initiateValues = (book) => ({
    ...book,
    genre: book ? book.genre.map((singleGenre) => singleGenre._id) : [],
    authors: book ? book.authors.map((author) => author._id) : [],
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/books/${location.pathname.substring(7)}`,
          "PUT",
          { ...values },
          { authorization: `Bearer ${auth.token}` },
          null
        );
        showEdit(!edit);
      } catch (error) {}
    },
  });

  const loadAuthors = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/authors`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999 }
      );
      setAuthors(response.data.author);
    } catch (error) {}
  };
  const loadGenres = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/genres`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999 }
      );
      setGenres(response.data.genres);
    } catch (error) {}
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
      const book = response.data.books[0];
      setBook(book);
      const data = initiateValues(book);
      setInitialValues(data);
    } catch (error) {}
  };

  const showForm = async () => {
    if (!genres) await loadGenres();
    if (!authors) await loadAuthors();
    showEdit(!edit);
  };

  useEffect(() => {
    getBook();
  }, [formik.isSubmitting]);

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
      {edit && genres && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.form}>
              <BookUpdate formik={formik} genres={genres} authors={authors} />
            </div>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Book;
