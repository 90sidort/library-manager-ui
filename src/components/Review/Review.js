import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Comment, StarRate } from "@material-ui/icons";

const Review = (props) => {
  const { rating, review, title, user, classes, id } = props;
  let reviewStars = [];
  for (let i = 0; i < rating; i++) {
    reviewStars.push(<StarRate key={i} fontSize="small" />);
  }

  return (
    <ListItem alignItems="flex-start" key={id} className={classes.item}>
      <ListItemAvatar>
        <Avatar>
          <Comment />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${title}`}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {`Reviewer: ${user.surname}, ${user.name}`}
            </Typography>{" "}
            {review ? review : ""}
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="rating">
          {reviewStars}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Review;
