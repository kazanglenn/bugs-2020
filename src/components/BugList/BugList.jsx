import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getBugList } from "../../redux/selectors";
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
    maxHeight: 800,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  }
});

export default function BugList() {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="bug-list">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Energy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              {/* TODO - bugs.map() */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

};