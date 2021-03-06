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

const SingleListItemUser = (props) => {
  const { id, deleteUser, link, surname, name } = props;
  return (
    <ListItem key={id}>
      <ListItemAvatar>
        <Avatar>
          <AccountCircle />
        </Avatar>
      </ListItemAvatar>
      <Link
        to={{
          pathname: `${link}`,
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemText primary={`${surname}, ${name}`} />{" "}
      </Link>
      <ListItemSecondaryAction>
        {deleteUser && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteUser(id)}
          >
            <Delete />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItemUser;
