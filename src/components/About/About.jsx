import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
    maxHeight: 800,
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
        <Typography variant="body1" color="textSecondary" component="p">
          'Bugs'
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>Species is indicated by colour</p>
          <p>A species is a unique set of parameter values</p>
          <p>Burn energy when moving</p>
          <p>The faster they move the more energy they burn</p>
          <p>Eat both 'algae' and 'bugs' of other species (colour) in their paths</p>
          <p>Can only eat smaller 'bugs'</p>
          <p>Will not eat their own offspring, when mutated to another 'species'</p>
          <p>Breed when they are large enough and have enough energy</p>
          <p>Size and energy levels for breeding are a selected factor</p>
          <p>When breeding there is a chance of a parameter change, forming a new species</p>
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          'Algae'
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>Accumulate energy over time; 'photosynthesis'</p>
          <p>Grow over time</p>
          <p>The larger they are the more energy they can hold</p>
          <p>Will create offspring when they reach a certain energy level</p>
          <p>Offspring are spawned in a circle around the parent, when there is space</p>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" align="right">
          Kazan Glenn
        </Typography>
      </CardContent>
    </Card>
  );

}
