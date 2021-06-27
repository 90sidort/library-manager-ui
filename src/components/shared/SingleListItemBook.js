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
import calculateFine from "../../utils/fine.utils";

const SingleListItemBook = (props) => {
  const {
    id,
    link,
    title,
    published,
    authors,
    deleteBook,
    returnBook,
    overdue,
    endDate,
  } = props;
  const authorsString = (authors) => {
    let authorsReady = ``;
    authors.forEach((author) => {
      authorsReady = `${authorsReady} ${author.name} ${author.surname}; `;
    });
    authorsReady.trim();
    return authorsReady;
  };

  let fine;
  if (overdue) fine = calculateFine(endDate);

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
        {overdue && (
          <ListItemText
            primary={`OVERDUE!!!`}
            secondary={`Fine to be paid: ${fine}zł.`}
            style={{ color: "red" }}
          />
        )}
        {deleteBook && <ListItemText secondary={`${authorsString(authors)}`} />}
        {deleteBook && <ListItemText secondary={`${published}`} />}
      </Link>
      <ListItemSecondaryAction>
        {deleteBook && (
          <Tooltip title="Delete" aria-label="delete">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteBook(id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
        {returnBook && (
          <Tooltip title="Return" aria-label="return">
            <IconButton
              edge="end"
              aria-label="return"
              onClick={() => returnBook(id)}
            >
              <KeyboardReturn />
            </IconButton>
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SingleListItemBook;
