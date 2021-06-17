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
import { AuthContext } from "../context/auth.context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "3%",
    height: "100%",
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
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState(null);
  const [genres, setGenres] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAuthors = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  const loadGenres = async () => {
    setLoading(true);
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
      setLoading(false);
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

  useEffect(() => {
    loadAuthors();
    loadGenres();
  }, []);

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
                <Grid item xs={12}>
                  <AddBook
                    setError={setErrorMessage}
                    loading={setLoading}
                    authors={authors}
                    genres={genres}
                  />
                </Grid>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "list"}
            onChange={handleChange("list")}
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
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )}
    </div>
  );
};

export default Books;
