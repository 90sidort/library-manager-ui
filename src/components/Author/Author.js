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
import validationSchemaAuthor from "../../validators/author.validator";
import AuthorUpdate from "./AuthorUpdate";
import SingleListItemBook from "../shared/SingleListItemBook";

const Author = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [countries, setCountries] = useState(null);
  const [author, setAuthor] = useState(null);
  const [edit, showEdit] = useState(false);
  const [authored, showAuthored] = useState(false);
  const [books, setBooks] = useState(null);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formikEdit = useFormik({
    initialValues: {
      name: author ? author.name : "",
      surname: author ? author.surname : "",
      country: author ? author.country._id : "",
      description: author ? author.description : "",
    },
    validationSchema: validationSchemaAuthor,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/api/authors/${location.pathname.substring(9)}`,
          "PUT",
          { ...values },
          { authorization: `Bearer ${auth.token}` },
          null
        );
        setSubmitting(false);
        showEdit(!edit);
      } catch (error) {}
    },
  });

  const loadAuthorBooks = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999, authors: location.pathname.substring(9) }
      );
      setBooks(response.data.books);
    } catch (error) {}
  };

  const loadAuthor = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/authors`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999, aid: location.pathname.substring(9) }
      );
      setAuthor(response.data.author[0]);
    } catch (error) {}
  };
  const loadCountries = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/countries`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999 }
      );
      setCountries(response.data.countries);
    } catch (error) {}
  };

  const showEditForm = async () => {
    if (!countries) await loadCountries();
    showEdit(!edit);
    showAuthored(false);
  };

  const showAuthoredData = () => {
    if (!books) loadAuthorBooks();
    showAuthored(!authored);
    showEdit(false);
  };

  useEffect(() => {
    loadAuthor();
  }, [formikEdit.isSubmitting]);

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
            {author && !loading && (
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Author details
                </Typography>
                <Typography variant="h3" className={classes.lines}>
                  {`${author.surname}, ${author.name}`}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="h5"
                  className={classes.lines}
                >
                  {`From: ${author.country.name}`}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.lines}
                >
                  {`Description: ${author.description}`}
                </Typography>
                {author && (
                  <CardActions>
                    {auth.admin && (
                      <Button size="small" onClick={showEditForm}>
                        Edit author data
                      </Button>
                    )}
                    <Button size="small" onClick={showAuthoredData}>
                      Authored books
                    </Button>
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
      {edit && author && countries && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.form}>
              <AuthorUpdate formik={formikEdit} countries={countries} />
            </div>
          </Grid>
        </Grid>
      )}
      {authored && books && (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={6}>
            <div className={classes.borrowings} style={{ listStyle: "none" }}>
              {books.length > 0 ? (
                books.map((book) => (
                  <SingleListItemBook
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    published={book.published}
                    authors={book.authors}
                    link={`/books/${book._id}`}
                  />
                ))
              ) : (
                <p>No books</p>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Author;
