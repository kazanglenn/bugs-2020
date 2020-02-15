import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getParameters } from "../../redux/selectors";
import { setParameters } from '../../redux/actions';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    margin: 20
  },
  margin: {
    height: theme.spacing(3),
  }
}));

const marks = [
  // {
  //   value: 0,
  //   label: '0',
  // },
  {
    value: 100,
    label: '100',
  },
  {
    value: 200,
    label: '200',
  },
  {
    value: 300,
    label: '300',
  },
  {
    value: 400,
    label: '400',
  },
  {
    value: 500,
    label: '500',
  },
  {
    value: 600,
    label: '600',
  },
  {
    value: 700,
    label: '700',
  },
  {
    value: 800,
    label: '800',
  },
  {
    value: 900,
    label: '900',
  },
  {
    value: 1000,
    label: '1000',
  },
];

function valuetext(value) {
  return `${value}`;
}

// maxBugs: 200,
// breedingCost: 100,
// maxAlgae: 800,
// algaeBreedThreshold: 100,

export default function Parameters() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="max-bugs-slider" gutterBottom>
        Maximum Bug Population
      </Typography>
      <Slider
        defaultValue={200}
        getAriaValueText={valuetext}
        aria-labelledby="max-bugs-slider"
        valueLabelDisplay="auto"
        step={10}
        marks={marks}
        min={50}
        max={300}
      />
      <div className={classes.margin} />
      <Typography id="bug-breed-cost-slider" gutterBottom>
        Bug Breeding Cost (Energy)
      </Typography>
      <Slider
        defaultValue={100}
        getAriaValueText={valuetext}
        aria-labelledby="bug-breed-cost-slider"
        valueLabelDisplay="auto"
        step={10}
        marks={marks}
        min={10}
        max={300}
      />
      <div className={classes.margin} />
      <Typography id="max-algae-slider" gutterBottom>
        Maximum Algae Population
      </Typography>
      <Slider
        defaultValue={800}
        getAriaValueText={valuetext}
        aria-labelledby="max-algae-slider"
        valueLabelDisplay="auto"
        step={50}
        marks={marks}
        min={400}
        max={1000}
      />
      <div className={classes.margin} />
      <Typography id="algae-breed-threshold-slider" gutterBottom>
        Algae Breeding Threshold (Energy)
      </Typography>
      <Slider
        defaultValue={100}
        getAriaValueText={valuetext}
        aria-labelledby="algae-breed-threshold-slider"
        valueLabelDisplay="auto"
        step={10}
        marks={marks}
        min={50}
        max={200}
      />
      <div className={classes.margin} />
      <Button variant="contained">Save</Button>
    </div>
  );

};

