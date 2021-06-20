import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import {
  Card,
  CircularProgress,
  Grid,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

import { AuthContext } from "../context/auth.context";
import SimpleModal from "./shared/SimpleModal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "3%",
  },
}));

const Book = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cancelError = () => {
    setErrorMessage("");
    setLoading(false);
  };

  const getBook = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/books`,
        headers: { authorization: `Bearer ${auth.token}` },
        params: {
          page: 1,
          limit: 1,
          bid: location.pathname.substring(7),
        },
      });
      setBook(response.data.books[0]);
      setLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Server error"
      );
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  console.log(book);

  return (
    <React.Fragment>
      {errorMessage && (
        <SimpleModal errorMessage={errorMessage} cancelError={cancelError} />
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
                    {auth.admin && <Button size="small">Borrower</Button>}
                    {auth.admin && <Button size="small">Edit book data</Button>}
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
