import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CardMedia from '@material-ui/core/CardMedia';
import BugImage from '../../assets/flatworm.png';

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
  media: {
    height: 40,
    width: 20,
  }
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
        <CardMedia className={classes.media} image={BugImage} />
        <p>ID: {props.bug.geneology.id}</p>
        <p>Energy: {props.bug.energy}</p>
        <p>Cycles: {props.bug.cycles}</p>
        <p>Speed: {props.bug.speed}</p>
        <p>Turning Speed: {props.bug.turningSpeed}</p>
        <p>Breed Size: {props.bug.breedSize}</p>
        <p>Breed Threshold: {props.bug.breedThreshold}</p>
        <p>Offspring: {props.bug.geneology.children.length}</p>
      </div>
      : <div><p>bug not specified</p></div>
    }
    </Modal>
  );

};
