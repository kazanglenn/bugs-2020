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

export default function Bug({bug, open, handleClose}) {

  const classes = useStyles();

  console.log(bug.geneology.id)

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={open}
      onClose={handleClose}
      aria-labelledby="Bug" // a11y
      aria-describedby="Bug details" // a11y
      className={classes.modal}
    >
      <div className={classes.paper}>
        <p>ID: {bug.geneology.id}</p>
        <p>X: {bug.x}</p>
        <p>Y: {bug.y}</p>
      </div>
    </Modal>
  );

};
