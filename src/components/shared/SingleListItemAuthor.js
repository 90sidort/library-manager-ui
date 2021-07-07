import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { CreateOutlined, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const SingleListItemAuthor = (props) => {
  const { id, link, name, surname, deleteAuthor } = props;

  return (
    <ListItem key={id}>
      <ListItemAvatar>
        <Avatar>
          <CreateOutlined />
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
