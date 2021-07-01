import React, { useContext, useEffect, useState } from "react";
import { List, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import Review from "./Review";
import SimpleModal from "../shared/SimpleModal";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.hook";
import useStyles from "../../styles/reviews.styles";

const Reviews = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [reviews, setReviews] = useState(null);
  const { loading, errorMessage, sendRequest, clearError } = useHttp();

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
  if (reviews) {
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
      <Button size="small" onClick={() => history.goBack()}>
        Go back
      </Button>
      {body}
    </div>
  );
};

export default Reviews;
