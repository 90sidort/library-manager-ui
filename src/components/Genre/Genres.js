import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
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
import GenresList from "./GenresList";
import useStyles from "../../styles/books.styles";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.hook";
import { readSearch } from "../../utils/search.utils";
import validationSchemaGenre from "../../validators/genre.validator";
import AddGenre from "./AddGenre";

const Genres = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState("list");
  const [genres, setGenres] = useState(null);
  const [search, setSearch] = useState(readSearch(location, { name: "" }));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: validationSchemaGenre,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/genres`,
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

  const loadGenres = async () => {
    try {
      search.name = search.name.replaceAll("+", " ");
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/genres`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page, limit, ...search }
      );
      setCount(response.data.count);
      setGenres(response.data.genres);
      history.push({
        pathname: "/genres",
        search: `${response.request.responseURL.split("?")[1]}`,
      });
    } catch (error) {
      history.push({
        pathname: "/genres",
        search: `${error.request.responseURL.split("?")[1]}`,
      });
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resetData = () => {
    setSearch({ name: "" });
    history.push({
      pathname: "/genres",
    });
  };
  const handleGenreSearch = (e) => {
    let { value } = e.target;
    const { id } = e.target;
    setPage(1);
    const newSearch = { ...search, [id]: value };
    setSearch(newSearch);
  };
  const handleChangePage = (e, newPage) => setPage(newPage + 1);
  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };
  const handleGenreDelete = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/genres/${id}`,
        "DELETE",
        null,
        { authorization: `Bearer ${auth.token}` },
        null
      );
      setPage(1);
      loadGenres();
    } catch (error) {}
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadGenres();
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
      {!loading && genres && (
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
              <Typography className={classes.heading}>Add genre</Typography>
              <Typography className={classes.secondaryHeading}>
                Add new genre to the database
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.form}>
                    <AddGenre formik={formik} />
                  </div>
                </Grid>
              </Grid>
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
              <Typography className={classes.heading}>Genres</Typography>
              <Typography className={classes.secondaryHeading}>
                Search for genres
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GenresList
                location={location}
                setPage={setPage}
                page={page}
                search={search}
                limit={limit}
                pageChange={handleChangePage}
                rowsChange={handleChangeRowsPerPage}
                resetData={resetData}
                count={count}
                genres={genres}
                genreSearch={handleGenreSearch}
                deleteGenre={handleGenreDelete}
              />
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )}
    </div>
  );
};

export default Genres;
