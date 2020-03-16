import React from 'react';
import { connect } from 'react-redux';
import { getBugs } from "../../redux/selectors";

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import * as PIXI from "pixi.js";
import { ReactImageTint } from 'react-image-tint';

// project components
import { Bug } from '../Bug';
// import BugImage from '../../assets/flatworm.png';
import BugImage from '../../assets/micro_horseshoe.png';


const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
    maxHeight: 700,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  media: {
    height: 40,
    width: 20,
  }
});

function BugList({ bugs }) {

  const classes = useStyles();

  const [bug, setBug] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (b) => {
    setBug(b);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO - add paging though will never be many
  return (
    <Card className={classes.card}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="bug-list">
          <TableHead>
            <TableRow>
              <TableCell align="left">Bug</TableCell>
              <TableCell align="right">Species</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Energy</TableCell>
              <TableCell align="right">Offspring</TableCell>
              <TableCell align="right">Speed</TableCell>
              <TableCell align="right">Width</TableCell>
              <TableCell align="right">Breed Width</TableCell>
              <TableCell align="right">Breed Energy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.map((b, i) => {
              let colour = PIXI.utils.premultiplyTintToRgba(b.tint, 0.5);
              let hexcolour = [colour[0] * 0x255, colour[1] * 0x255, colour[2] * 0x255];
              let colourString = 'rgba(' + hexcolour[0] + ',' + hexcolour[1] + ',' + hexcolour[2] + ', 0.8)';
              return (
              <TableRow key={i}>
                <TableCell align="left">
                  <CardActions>
                    <CardMedia className={classes.media} title={"View bug " + b.geneology.id} onClick={() => {handleOpen(b)}} >
                    <ReactImageTint src={BugImage} color={colourString} />
                    </CardMedia>
                  </CardActions>
                </TableCell>
                <TableCell align="right">{b.tint}</TableCell>
                <TableCell align="right">{b.cycles}</TableCell>
                <TableCell align="right">{b.energy}</TableCell>
                <TableCell align="right">{b.geneology.children.length}</TableCell>
                <TableCell align="right">{b.speed}</TableCell>
                <TableCell align="right">{b.width}</TableCell>
                <TableCell align="right">{b.breedSize}</TableCell>
                <TableCell align="right">{b.breedThreshold}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
      <Bug open={open} bug={bug} handleClose={handleClose}/>
    </Card>
  );

};


const mapStateToProps = state => {
  const bugs = getBugs(state);
  return { bugs };
};

export default connect(mapStateToProps)(BugList);