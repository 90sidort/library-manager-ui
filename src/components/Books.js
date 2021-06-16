import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";

import AddBook from "./AddBook";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "3%",
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
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === "add"} onChange={handleChange("add")}>
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
          {loading && (
            <Grid container spacing={2} className={classes.formGrid}>
              <Grid item xs={12} className={classes.formGrid}>
                <CircularProgress
                  color="secondary"
                  style={{
                    width: "10%",
                    height: "10%",
                    margin: "auto",
                  }}
                />
              </Grid>
            </Grid>
          )}
          {!loading && (
            <Grid item xs={12}>
              {" "}
              <AddBook hide={handleChange} loading={setLoading} />
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "list"} onChange={handleChange("list")}>
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
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Books;
