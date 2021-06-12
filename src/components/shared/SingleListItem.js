import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { AccountCircle, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const SingleListItem = (props) => {
  console.log(props);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountCircle />
        </Avatar>
      </ListItemAvatar>
      <Link
        to={{
          pathname: `${props.link}`,
          state: { from: props.back },
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemText primary={`${props.surname}, ${props.name}`} />{" "}
      </Link>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItem;
