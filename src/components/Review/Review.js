import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Comment, StarRate, Delete, Report, Edit } from "@material-ui/icons";

const Review = (props) => {
  const {
    review: { rating, review, title, user, _id: id },
    classes,
    reviewDelete,
    userId,
    admin,
    reviewReport,
    reviewEdit,
  } = props;
  let reviewStars = [];
  for (let i = 0; i < rating; i++) {
    reviewStars.push(<StarRate key={i} fontSize="small" />);
  }
  const deleteButton = admin || user._id === userId;

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
      <ListItemSecondaryAction style={{ top: "8%" }}>
        <Tooltip
          title={`${reviewStars.length.toString()}/6`}
          aria-label="rating"
        >
          <IconButton edge="end" aria-label="rating">
            {reviewStars}
          </IconButton>
        </Tooltip>
        <Tooltip title={`Report`} aria-label="report">
          <IconButton
            edge="end"
            aria-label="report"
            onClick={() => reviewReport(id)}
          >
            <Report />
          </IconButton>
        </Tooltip>
        {user._id === userId && (
          <Tooltip title="Edit" aria-label="edit">
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => reviewEdit(id)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}
        {deleteButton && (
          <Tooltip title="Delete" aria-label="delete">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => reviewDelete(id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Review;
