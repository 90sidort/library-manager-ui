import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import { ExpandMore } from "@material-ui/icons";

import SimpleModal from "./shared/SimpleModal";
import AddBook from "./AddBook";
import BookList from "./BookList";
import { AuthContext } from "../context/auth.context";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
  },
  form: {
    width: "90%",
    marginTop: "1%",
    margin: "auto !important",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  formGrid: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

const Books = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const initialData = {
    title: "",
    authors: "all",
    genre: "all",
    pageMin: 0,
    pageMax: 10000,
    publishedMin: 1900,
    publishedMax: 3000,
    language: "polish",
    publisher: "",
    available: true,
    description: "",
  };
  const readSearch = () => {
    const stateData = initialData;
    if (location.search) {
      const searchQuery = location.search.substring(1);
      const queries = searchQuery.split("&");
      queries.forEach((query) => {
        const variables = query.split("=");
        stateData[variables[0]] = variables[1];
      });
    }
    return stateData;
  };
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [genres, setGenres] = useState(null);
  const [search, setSearch] = useState(readSearch());
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: {
          page,
          limit,
          ...search,
        },
      });
      setCount(response.data.count);
      setBooks(response.data.books);
      const newRoute = response.request.responseURL.split("?")[1];
      history.push({
        pathname: "/",
        search: `${newRoute}`,
      });
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  const loadAuthors = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/authors`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: {
          page: 1,
          limit: 9999,
        },
      });
      setAuthors(response.data.author);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  const loadGenres = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/genres`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: {
          page: 1,
          limit: 9999,
        },
      });
      setGenres(response.data.genres);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const cancelError = () => {
    setErrorMessage("");
    setLoading(false);
  };

  const resetData = () => {
    setSearch(initialData);
    history.push({
      pathname: "/",
      search: `page=1&limit=25&title=&authors=all&genre=all&pageMin=0&pageMax=10000&publishedMin=1900&publishedMax=3000&language=polish&publisher=&available=true&description=`,
    });
  };

  const handleBookSearch = (e) => {
    let { value } = e.target;
    const { id } = e.target;
    console.log(value, id);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBooks();
    }, 1000);
    return () => clearTimeout(timer);
  }, [auth.token, limit, page, search]);

  useEffect(() => {
    loadAuthors();
    loadGenres();
    loadBooks();
  }, [auth.token]);

  console.log(search);

  return (
    <div className={classes.root}>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
      )}
      {loading && !errorMessage && (
        <Grid container spacing={2} className={classes.formGrid}>
          <Grid item xs={12} className={classes.formGrid}>
            <CircularProgress
              color="secondary"
              style={{
                width: "20%",
                height: "20%",
                margin: "auto",
              }}
            />
          </Grid>
        </Grid>
      )}
      {!loading && (
        <React.Fragment>
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
              {authors && genres && (
                <Grid container spacing={2} className={classes.root}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.form}>
                      <AddBook
                        setError={setErrorMessage}
                        loading={setLoading}
                        authors={authors}
                        genres={genres}
                      />
                    </div>
                  </Grid>
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
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
              {books && authors && genres && (
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
                  setLoading={setLoading}
                  pageChange={handleChangePage}
                  rowsChange={handleChangeRowsPerPage}
                  resetData={resetData}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )}
    </div>
  );
};

export default Books;
