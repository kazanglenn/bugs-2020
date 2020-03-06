import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import BugImage from '../../assets/flatworm.png';
import * as PIXI from "pixi.js";
import { ReactImageTint } from 'react-image-tint';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#DDDDDD',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Bug(props) {

  const classes = useStyles();

  let colour = PIXI.utils.premultiplyTintToRgba(props.bug !== null ? props.bug.tint : 0, 0.5);
  let hexcolour = [colour[0] * 0x255, colour[1] * 0x255, colour[2] * 0x255];
  let colourString = 'rgba(' + hexcolour[0] + ',' + hexcolour[1] + ',' + hexcolour[2] + ', 0.8)';

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
        <div className={classes.header}>
        <Avatar alt={"iamge of bug " + props.bug.geneology.id}>
          <ReactImageTint src={BugImage} color={colourString} />
        </Avatar>
        &nbsp;
        <Typography variant="body1" color="primary" component="p" align="center">
          {props.bug.geneology.id}
        </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="bug-list">
            <TableBody>
              <TableRow>
                <TableCell align="right">Energy</TableCell>
                <TableCell align="right">{props.bug.energy}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Cycles</TableCell>
                <TableCell align="right">{props.bug.cycles}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Speed</TableCell>
                <TableCell align="right">{props.bug.speed}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Turning Speed</TableCell>
                <TableCell align="right">{props.bug.turningSpeed.toFixed(6)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Breed Size</TableCell>
                <TableCell align="right">{props.bug.breedSize}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Breed Threshold</TableCell>
                <TableCell align="right">{props.bug.breedThreshold}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Offspring</TableCell>
                <TableCell align="right">{props.bug.geneology.children.length}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </div>
      : <div><p>bug not specified</p></div>
      }
    </Modal>
  );

};
