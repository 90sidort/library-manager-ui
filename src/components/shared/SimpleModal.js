import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  return {
    top: `41%`,
    left: `48%`,
    transform: `translate(-${41}%, -${48}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { cancelError, errorMessage } = props;

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Error</h2>
      <p id="simple-modal-description">{errorMessage}</p>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={errorMessage ? true : false}
        onClose={cancelError}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
