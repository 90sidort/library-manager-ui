import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { LibraryBooks, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const SingleListItemGenre = (props) => {
  const { id, deleteGenre, link, name } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <LibraryBooks />
        </Avatar>
      </ListItemAvatar>
      <Link
        to={{
          pathname: `${link}`,
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemText primary={`${name}`} />{" "}
      </Link>
      <ListItemSecondaryAction>
        {deleteGenre && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteGenre(id)}
          >
            <Delete />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItemGenre;
