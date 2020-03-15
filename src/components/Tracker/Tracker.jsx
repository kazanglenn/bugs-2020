import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getTracker } from "../../redux/selectors";
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
    maxWidth: "100%",
    maxHeight: 200,
    margin: 5
  }
});

function Tracker({tracker}) {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="tracker data">
          <TableHead>
            <TableRow>
              <TableCell align="right">Cycle</TableCell>
              <TableCell align="right">Current Bugs</TableCell>
              <TableCell align="right">Current Algae</TableCell>
              <TableCell align="right">Total Bugs</TableCell>
              <TableCell align="right">Total Species</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={tracker.ticks}>
              <TableCell align="right">{tracker.ticks}</TableCell>
              <TableCell align="right">{tracker.bugs}</TableCell>
              <TableCell align="right">{tracker.algae}</TableCell>
              <TableCell align="right">{tracker.totalBugs}</TableCell>
              <TableCell align="right">{tracker.totalSpecies}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

};

const mapStateToProps = state => {
  const tracker = getTracker(state);
  return { tracker };
};

export default connect(mapStateToProps)(Tracker);
