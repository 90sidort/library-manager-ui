import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { ExpandMore } from "@material-ui/icons";

import SimpleModal from "../shared/SimpleModal";
import AddBook from "../Book/AddBook";
import BookList from "../Book/BookList";
import useStyles from "../../styles/books.styles";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.hook";
import { initialSearch, initialDataAdd } from "../../utils/books.utils";
import { readSearch } from "../../utils/search.utils";
import { useFormik } from "formik";
import validationSchema from "../../validators/book.validator";

const Books = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState("list");
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [genres, setGenres] = useState(null);
  const [search, setSearch] = useState(readSearch(location, initialSearch));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formik = useFormik({
    initialValues: initialDataAdd,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/books`,
          "POST",
          { ...values },
          { authorization: `Bearer ${auth.token}` },
          null
        );
        resetForm();
        resetData();
      } catch (error) {}
    },
  });

  const loadBooks = async () => {
    let newRoute;
    search.publisher = search.publisher.replaceAll("+", " ");
    search.title = search.title.replaceAll("+", " ");
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page, limit, ...search }
      );
      setCount(response.data.count);
      setBooks(response.data.books);
      newRoute = response.request.responseURL.split("?")[1];
      newRoute = newRoute.replace("%2B", "+");
      history.push({
        pathname: "/",
        search: `${newRoute}`,
      });
    } catch (error) {
      newRoute = error.request.responseURL.split("?")[1];
      newRoute = newRoute.replace("%2B", "+");
      history.push({
        pathname: "/",
        search: `${newRoute}`,
      });
    }
  };
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resetData = () => {
    setSearch(initialSearch);
    history.push({
      pathname: "/",
    });
  };
  const handleBookSearch = (e) => {
    let { value } = e.target;
    const { id } = e.target;
    if (id === "available") value = value === "true" ? false : true;
    setPage(1);
    const newSearch = { ...search, [id]: value };
    setSearch(newSearch);
  };
  const handleChangePage = (e, newPage) => setPage(newPage + 1);
  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  const handleBookDelete = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/books/${id}`,
        "DELETE",
        null,
        { authorization: `Bearer ${auth.token}` },
        null
      );
      setPage(1);
      loadBooks();
    } catch (error) {}
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBooks();
      if (!authors) loadAuthors();
      if (!genres) loadGenres();
    }, 1000);
    return () => clearTimeout(timer);
  }, [auth.token, limit, page, search]);

  return (
    <div className={classes.root}>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={clearError} />
      )}
      {loading && !errorMessage && (
        <Grid container spacing={2} className={classes.formGrid}>
          <Grid item xs={12} className={classes.formGrid}>
            <CircularProgress
              color="secondary"
              style={{
                width: "30%",
                height: "30%",
                margin: "auto",
              }}
            />
          </Grid>
        </Grid>
      )}
      {!loading && authors && books && genres && (
        <React.Fragment>
          {auth.admin && (
            <Accordion
              expanded={expanded === "add"}
              onChange={handleChange("add")}
              className={classes.form}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="add-content"
                id="add-header"
              >
                <Typography className={classes.heading}>Add</Typography>
                <Typography className={classes.secondaryHeading}>
                  Add new book to the database
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} className={classes.root}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.form}>
                      <AddBook
                        authors={authors}
                        genres={genres}
                        formik={formik}
                      />
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}
          <Accordion
            expanded={expanded === "list"}
            onChange={handleChange("list")}
            className={classes.form}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="list-content"
              id="list-header"
            >
              <Typography className={classes.heading}>Books</Typography>
              <Typography className={classes.secondaryHeading}>
                Search for books
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BookList
                setPage={setPage}
                authors={authors}
                genres={genres}
                books={books}
                search={search}
                page={page}
                limit={limit}
                count={count}
                bookSearch={handleBookSearch}
                pageChange={handleChangePage}
                rowsChange={handleChangeRowsPerPage}
                resetData={resetData}
                deleteBook={handleBookDelete}
              />
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )}
    </div>
  );
};

export default Books;
