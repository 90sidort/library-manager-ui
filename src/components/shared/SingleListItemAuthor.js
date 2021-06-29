import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { MenuBook, Delete, KeyboardReturn } from "@material-ui/icons";
import { Link } from "react-router-dom";

const SingleListItemAuthor = (props) => {
  const { id, link, name, surname, country, deleteAuthor } = props;
  const authorsString = (authors) => {
    let authorsReady = ``;
    authors.forEach((author) => {
      authorsReady = `${authorsReady} ${author.name} ${author.surname}; `;
    });
    authorsReady.trim();
    return authorsReady;
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <MenuBook />
        </Avatar>
      </ListItemAvatar>
      <Link
        to={{
          pathname: `${link}`,
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemText primary={`${surname}, ${name}`} />
      </Link>
      <ListItemSecondaryAction>
        {deleteAuthor && (
          <Tooltip title="Delete" aria-label="delete">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteAuthor(id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItemAuthor;
