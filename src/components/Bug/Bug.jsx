import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getBug } from "../../redux/selectors";
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    maxHeight: 500,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  }
});

export default function Bug() {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
    </Card>
  );

};
