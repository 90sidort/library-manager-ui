import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, List, CircularProgress } from "@material-ui/core";

import Review from "./Review";
import SimpleModal from "../shared/SimpleModal";
import useStyles from "../../styles/booklist.styles";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/auth.context";

const AdminReview = () => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [reported, setReported] = useState(null);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const loadReported = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/reviews`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999, reported: true }
      );
      setReported(response.data.review);
    } catch (error) {}
  };

  const handleReviewDelete = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`,
        "DELETE",
        null,
        { authorization: `Bearer ${auth.token}` },
        null
      );
      setReported();
    } catch (error) {}
  };

  useEffect(() => {
    loadReported();
  }, [auth.token]);

  return (
    <div>
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
      {reported && (
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Reported reviews
          </Typography>
          <div className={classes.demo}>
            {reported && (
              <List className={classes.root}>
                {reported.map((review) => (
                  <Review
                    classes={classes}
                    review={review}
                    reviewDelete={handleReviewDelete}
                    admin={auth.admin}
                    adminReview={true}
                  />
                ))}
              </List>
            )}
          </div>
        </Grid>
      )}
    </div>
  );
};

export default AdminReview;
