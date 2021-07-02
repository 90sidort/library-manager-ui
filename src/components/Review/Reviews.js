import React, { useContext, useEffect, useState } from "react";
import { List, Button, CircularProgress, Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import Review from "./Review";
import AddReview from "./AddReview";
import SimpleModal from "../shared/SimpleModal";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.hook";
import useStyles from "../../styles/reviews.styles";
import validationSchema from "../../validators/review.validator";

const Reviews = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [formVisible, setFormVisible] = useState(false);
  const [reviews, setReviews] = useState(null);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formikAdd = useFormik({
    initialValues: {
      title: "",
      review: "",
      rating: 3,
      book: location.pathname.substring(9),
      user: auth.userId,
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews`,
          "POST",
          { ...values },
          { authorization: `Bearer ${auth.token}` },
          null
        );
        setSubmitting(false);
        setFormVisible(false);
      } catch (error) {}
    },
  });

  const loadReviews = async () => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/reviews`,
        "GET",
        null,
        { authorization: `Bearer ${auth.token}` },
        { page: 1, limit: 9999, book: location.pathname.substring(9) }
      );
      setReviews(response.data.review);
    } catch (error) {}
  };

  useEffect(() => {
    loadReviews();
  }, [auth.token]);

  let body;
  if (reviews && reviews.length > 0) {
    body = (
      <List className={classes.root}>
        {reviews.map((review) => (
          <Review
            id={review._id}
            classes={classes}
            rating={review.rating}
            review={review.review}
            title={review.title}
            user={review.user}
          />
        ))}
      </List>
    );
  } else {
    body = <p>No reviews</p>;
  }

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
      <Button size="small" onClick={() => history.goBack()}>
        Go back
      </Button>
      <Button size="small" onClick={() => setFormVisible(!formVisible)}>
        Add review
      </Button>
      {formVisible && <AddReview formik={formikAdd} />}
      {body}
    </div>
  );
};

export default Reviews;
