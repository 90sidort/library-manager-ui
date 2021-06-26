import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { MenuBook, Delete, KeyboardReturn } from "@material-ui/icons";
import { Link } from "react-router-dom";

const SingleListItemBook = (props) => {
  const { id, link, title, published, authors, deleteBook, returnBook } = props;
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
        {deleteBook && <ListItemText secondary={`${authorsString(authors)}`} />}
        {deleteBook && <ListItemText secondary={`${published}`} />}
      </Link>
      <ListItemSecondaryAction>
        {deleteBook && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteBook(id)}
          >
            <Delete />
          </IconButton>
        )}
        {returnBook && (
          <IconButton
            edge="end"
            aria-label="returnBook"
            onClick={() => returnBook(id)}
          >
            <KeyboardReturn />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItemBook;
