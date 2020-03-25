import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
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

const bugPoints = [
  'Species is indicated by colour',
  'A species is a unique set of parameter values',
  'Burn energy when moving',
  'The faster they move the more energy they burn',
  'Eat both \'algae\' and \'bugs\' of other species (colour) in their paths',
  'Can only eat smaller \'bugs\'',
  'Will not eat their own offspring, when mutated to another \'species\'',
  'Breed when they are large enough and have enough energy',
  'Size and energy levels for breeding are a selected factor',
  'When breeding there is a chance of a parameter change, forming a new species'
];

const algaePoints = [
  'Accumulate energy over time; \'photosynthesis\'',
  'Grow over time',
  'The larger they are the more energy they can hold',
  'Will create offspring when they reach a certain energy level',
  'Offspring are spawned in a circle around the parent, when there is space'
];

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

        <Typography variant="body1" color="textSecondary" component="p">&nbsp;</Typography>
      
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            'Bugs'
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <List dense={true}>
              {bugPoints.map(text => (
                <ListItem >
                  <ListItemText primary={text}/>
                </ListItem>
              ))
              }
            </List>
            </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            'Algae'
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <List dense={true}>
              {algaePoints.map(text => (
                <ListItem >
                  <ListItemText primary={text}/>
                </ListItem>
              ))
              }
            </List>
            </Typography>
        </Grid>

      </CardContent>
    </Card>
  );

}
