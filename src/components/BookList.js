import React from "react";
import { ListItem, ListItemText, List } from "@material-ui/core";

const BookList = (props) => {
  const { borrowed } = props;
  return (
    <List component="nav">
      {borrowed.length ? (
        borrowed.map((book) => (
          <ListItem button key={book.book._id}>
            <ListItemText primary={book.book.title} />
          </ListItem>
        ))
      ) : (
        <ListItem button>
          <ListItemText primary="No books" />
        </ListItem>
      )}
    </List>
  );
};

export default BookList;
