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

const Books = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [authors, setAuthors] = useState(null);
  const [books, setBooks] = useState(null);
  const [genres, setGenres] = useState(null);
  const [search, setSearch] = useState(readSearch(location, initialSearch));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const [dataAdd, setDataAdd] = useState(initialDataAdd);
  const [disable, setDisable] = useState(true);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const loadBooks = async () => {
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
      const newRoute = response.request.responseURL.split("?")[1];
      history.push({
        pathname: "/",
        search: `${newRoute}`,
      });
    } catch (error) {}
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
  const submitAddBook = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        "POST",
        dataAdd,
        { authorization: `Bearer ${auth.token}` },
        null
      );
      resetDataAdd();
      resetData();
    } catch (error) {}
  };

  const resetDataAdd = () => {
    setDataAdd(initialDataAdd);
    setDisable(true);
  };

  const onDataChange = (e) => {
    let { value } = e.target;
    const { id, options } = e.target;
    if (id === "pages" || id === "published") value = parseInt(value);
    else if (id === "available") value = value === "true" ? false : true;
    if (id === "genre" || id === "authors") {
      value = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    }
    const newDataAdd = { ...dataAdd, [id]: value };
    setDataAdd(newDataAdd);
    for (const [key, value] of Object.entries(newDataAdd)) {
      if (key !== "description") {
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length < 1)
        ) {
          setDisable(true);
          break;
        } else setDisable(false);
      }
    }
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
                        authors={authors}
                        genres={genres}
                        resetData={resetDataAdd}
                        onDataChange={onDataChange}
                        disable={disable}
                        submitAddBook={submitAddBook}
                        data={dataAdd}
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
