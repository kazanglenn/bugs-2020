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

// project components
import { Bug } from '../Bug';
import BugImage from '../../assets/flatworm.png';


const useStyles = makeStyles({
  card: {
    maxWidth: 1000,
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

  // initial modal values
  const init = () => {
    var b = [];
    console.log(bugs)
    bugs.forEach((bug) => {
      console.log(bug)
      b.push(
        {
          id: bug.geneology.id,
          open: false
        }
      );
    });
    return b;
  }

  const [open, setOpen] = React.useState(init());
  // setOpen(init());

  const handleOpen = (bug) => {
    console.log("open", bug.geneology.id);
    open.forEach((b, i) => {
      if (b.id === bug.geneology.id) {
        open.splice(i, 1);
      }
    });
    setOpen([
      ...open,
      {
        id: bug.geneology.id,
        open: true
      }
    ]);
  };

  const handleClose = (bug) => {
    console.log("close", bug.geneology.id);
    open.forEach((b, i) => {
      if (b.id === bug.geneology.id) {
        open.splice(i, 1);
      }
    });
    setOpen([
      ...open,
      {
        id: bug.geneology.id,
        open: false
      }
    ]);
  };

  // TODO - add paging, pop up bug details ...
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
              <TableCell align="right">Turning Speed</TableCell>
              <TableCell align="right">Width</TableCell>
              <TableCell align="right">Breed Width</TableCell>
              <TableCell align="right">Breed Energy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.map((bug, i) => (
              <TableRow key={i}>
                <TableCell align="left">
                  <CardActions>
                    <CardMedia className={classes.media} image={BugImage} title={"View bug " + bug.geneology.id} onClick={() => handleOpen(bug)} />
                  </CardActions>
                  <Bug bug={bug} open={open[i].open} handleClose={() => handleClose(bug)}/>
                </TableCell>
                <TableCell align="right">{bug.tint}</TableCell>
                <TableCell align="right">{bug.cycles}</TableCell>
                <TableCell align="right">{bug.energy}</TableCell>
                <TableCell align="right">{bug.geneology.children.length}</TableCell>
                <TableCell align="right">{bug.speed}</TableCell>
                <TableCell align="right">{(bug.turningSpeed).toFixed(6)}</TableCell>
                <TableCell align="right">{bug.width}</TableCell>
                <TableCell align="right">{bug.breedSize}</TableCell>
                <TableCell align="right">{bug.breedThreshold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

};


const mapStateToProps = state => {
  const bugs = getBugs(state);
  return { bugs };
};

export default connect(mapStateToProps)(BugList);