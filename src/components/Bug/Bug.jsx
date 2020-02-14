import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux';
// import { getBug } from "../../redux/selectors";
// import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
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

export default function Bug(bug) {

  const classes = useStyles();
  const rootRef = React.useRef(null);

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open
      aria-labelledby="Bug"
      aria-describedby="Bug details"
      className={classes.modal}
      container={() => rootRef.current}
    >
      <div className={classes.paper}>
        <p id="server-modal-description">{bug}</p>
      </div>
    </Modal>
  );

};
