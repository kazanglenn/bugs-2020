import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Bug(props) {

  const classes = useStyles();

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="Bug" // a11y
      aria-describedby="Bug details" // a11y
      className={classes.modal}
    >{props.bug !== null ?
      <div className={classes.paper}>
        <p>ID: {props.bug.geneology.id}</p>
        <p>X: {props.bug.x}</p>
        <p>Y: {props.bug.y}</p>
      </div>
      : <div><p>bug not specified</p></div>
    }
    </Modal>
  );

};
