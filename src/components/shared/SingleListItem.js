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
  const { id, deleteUser } = props;
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
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemText primary={`${props.surname}, ${props.name}`} />{" "}
      </Link>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteUser(id)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItem;
