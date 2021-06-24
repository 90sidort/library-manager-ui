import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { MenuBook, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const SingleListItemBook = (props) => {
  const { id, link, title, published, authors, fromUser, deleteBook } = props;
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
        <ListItemText primary={`${title}`} />
        {!fromUser && <ListItemText secondary={`${authorsString(authors)}`} />}
        {!fromUser && <ListItemText secondary={`${published}`} />}
      </Link>
      {!fromUser && (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteBook(id)}
          >
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default SingleListItemBook;
