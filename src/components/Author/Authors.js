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
import { initialSearch, initialDataAdd } from "../../utils/authors.utils";
import AddAuthor from "../Author/AddAuthor";
import useStyles from "../../styles/books.styles";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.hook";
import { readSearch } from "../../utils/search.utils";
import validationSchemaAuthor from "../../validators/author.validator";
import AuthorList from "./AuthorList";

const Authors = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState("list");
  const [authors, setAuthors] = useState(null);
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState(readSearch(location, initialSearch));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [count, setCount] = useState(0);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formik = useFormik({
    initialValues: initialDataAdd,
    validationSchema: validationSchemaAuthor,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/authors`,
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
  const loadAuthors = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/authors`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page, limit, ...search }
      );
      setCount(response.data.count);
      setAuthors(response.data.author);
      history.push({
        pathname: "/authors",
        search: `${response.request.responseURL.split("?")[1]}`,
      });
    } catch (error) {
      history.push({
        pathname: "/authors",
        search: `${error.request.responseURL.split("?")[1]}`,
      });
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const resetData = () => {
    setSearch(initialSearch);
    history.push({
      pathname: "/authors",
    });
  };
  const handleAuthorSearch = (e) => {
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
  const handleAuthorDelete = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/authors/${id}`,
        "DELETE",
        null,
        { authorization: `Bearer ${auth.token}` },
        null
      );
      setPage(1);
      loadAuthors();
    } catch (error) {}
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAuthors();
      if (!countries) loadCountries();
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
      {!loading && authors && countries && (
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
              <Typography className={classes.heading}>Add author</Typography>
              <Typography className={classes.secondaryHeading}>
                Add new author to the database
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.form}>
                    <AddAuthor countries={countries} formik={formik} />
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
              <Typography className={classes.heading}>Authors</Typography>
              <Typography className={classes.secondaryHeading}>
                Search for authors
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AuthorList
                location={location}
                authors={authors}
                setPage={setPage}
                page={page}
                countries={countries}
                search={search}
                limit={limit}
                pageChange={handleChangePage}
                rowsChange={handleChangeRowsPerPage}
                resetData={resetData}
                count={count}
                authorSearch={handleAuthorSearch}
                deleteAuthor={handleAuthorDelete}
              />
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )}
    </div>
  );
};

export default Authors;
