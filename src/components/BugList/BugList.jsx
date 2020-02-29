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


const useStyles = makeStyles({
  card: {
    maxWidth: 1000,
    maxHeight: 700,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  }
});

function BugList({ bugs }) {

  const classes = useStyles();

  // TODO - add paging, pop up bug details ...
  return (
    <Card className={classes.card}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="bug-list">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="right">Species</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Energy</TableCell>
              <TableCell align="right">Speed</TableCell>
              <TableCell align="right">Turning Speed</TableCell>
              <TableCell align="right">Breed Threshold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.map((bug, i) => (
              <TableRow key={i}>
                <TableCell align="left">{bug.geneology.id}</TableCell>
                <TableCell align="right">{bug.tint}</TableCell>
                <TableCell align="right">{bug.cycles}</TableCell>
                <TableCell align="right">{bug.energy}</TableCell>
                <TableCell align="right">{bug.speed}</TableCell>
                <TableCell align="right">{(bug.turningSpeed).toFixed(6)}</TableCell>
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