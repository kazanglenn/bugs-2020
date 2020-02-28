import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 1000,
    maxHeight: 500,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    flex: '1 0 auto',
    margin: 10,
    width: "90%"
  },
  media: {
    margin: 5,
    height: 100,
    width: 100
  },
});

export default function Title() {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="body1" color="textSecondary" component="p">
          The environment is a chaotic system, and the 'bugs' are selected by their ability to survive in this system. Those that can consume
          sufficient energy in the form of the green 'algae' or other 'bugs' will reproduce and persist. Those that do not die off.
          Population oscillations can be observed as selection pushes towards equilibrium.
          There are parameters that can be adjusted to experiment with the system. These can be adjusted as it is running.
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" align="right">
            Kazan Glenn
        </Typography>
      </CardContent>
    </Card>
  );

}
