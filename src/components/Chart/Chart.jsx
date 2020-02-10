import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    maxHeight: 500,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    width: "100%"
  }
});

function Measures () {
  
  const classes = useStyles();

  return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
          measures list here
          </CardContent>
        </Card>        
      </div>
    );  
};

export default Measures;
