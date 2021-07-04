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
  const startValues = {
    title: "",
    review: "",
    rating: 3,
    book: location.pathname.substring(9),
    user: auth.userId,
  };
  const [formVisible, setFormVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(startValues);
  const [rid, setRid] = useState("");
  const [reviews, setReviews] = useState(null);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

  const formikAdd = useFormik({
    initialValues: startValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
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
        resetForm();
        setFormVisible(false);
      } catch (error) {}
    },
  });

  const formikEdit = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${rid}`,
          "PUT",
          { ...values },
          { authorization: `Bearer ${auth.token}` },
          null
        );
        setSubmitting(false);
        setEditVisible(false);
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

  const handleReviewReport = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`,
        "PATCH",
        { reported: true },
        { authorization: `Bearer ${auth.token}` },
        null
      );
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
      loadReviews();
    } catch (error) {}
  };

  const handleReviewEdit = async (id) => {
    setEditVisible(true);
    const editValues = await reviews.filter(
      (review) => review._id.toString() === id
    );
    const setEditValues = { ...editValues[0] };
    setRid(setEditValues._id);
    setInitialValues({
      title: setEditValues.title,
      review: setEditValues.review,
      rating: setEditValues.rating,
      book: setEditValues.book._id,
      user: setEditValues.user._id,
    });
  };

  const handleReviewCancel = () => {
    setEditVisible(false);
    formikEdit.resetForm();
  };

  const handleReviewAdd = () => {
    setFormVisible(!formVisible);
    setEditVisible(false);
  };

  useEffect(() => {
    loadReviews();
  }, [auth.token, formikAdd.isSubmitting, formikEdit.isSubmitting]);

  let body;
  if (reviews && reviews.length > 0) {
    body = (
      <List className={classes.root}>
        {reviews.map((review) => (
          <Review
            classes={classes}
            review={review}
            reviewDelete={handleReviewDelete}
            userId={auth.userId}
            admin={auth.admin}
            reviewReport={handleReviewReport}
            reviewEdit={handleReviewEdit}
          />
        ))}
      </List>
    );
  } else {
    body = <p>No reviews, maybe write one?</p>;
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
      <Button size="small" onClick={() => handleReviewAdd()}>
        Add review
      </Button>
      {formVisible && <AddReview formik={formikAdd} />}
      {editVisible && (
        <AddReview formik={formikEdit} cancelButton={handleReviewCancel} />
      )}
      {body}
    </div>
  );
};

export default Reviews;
