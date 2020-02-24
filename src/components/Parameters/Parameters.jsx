import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setParameters, resetParameters } from '../../redux/actions';
import { getParameters } from "../../redux/selectors";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    margin: 20
  },
  margin: {
    height: theme.spacing(3),
  },
  button: {
    margin: 5
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

function Parameters(props) {

  const classes = useStyles();

  // clone for local adjustment, copy back to redux parameters if saved
  const [params, setParams] = useState(props.parameters);

  // TODO - consolidate functions, needless repetition here
  const handleMaxBugsChange = (event, newValue) => {
    var newParams = Object.assign({}, params);
    newParams.maxBugs = newValue;
    setParams(newParams);
  };

  const handleBreedingCostChange = (event, newValue) => {
    var newParams = Object.assign({}, params);
    newParams.breedingCost = newValue;
    setParams(newParams);
  };

  const handleMaxAlgaeChange = (event, newValue) => {
    var newParams = Object.assign({}, params);
    newParams.maxAlgae = newValue;
    setParams(newParams);
  };

  const handleAlgaeBreedThresholdChange = (event, newValue) => {
    var newParams = Object.assign({}, params);
    newParams.algaeBreedThreshold = newValue;
    setParams(newParams);
  };

  // reset parameters to defaults
  const reset = () => {
    props.resetParameters(); // reset redux parameters
    // TODO - await? reset to last values, 2nd click shows actual values
    setParams(props.parameters); // update local component state
  };

  return (
    <div className={classes.root}>
      <Typography id="max-bugs-slider" gutterBottom>
        Maximum Bug Population
      </Typography>
      <Slider
        value={params.maxBugs}
        onChange={handleMaxBugsChange}
        aria-labelledby="max-bugs-slider"
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
        value={params.breedingCost}
        onChange={handleBreedingCostChange}
        aria-labelledby="bug-breed-cost-slider"
        step={10}
        marks={marks}
        min={0}
        max={500}
      />
      <div className={classes.margin} />
      <Typography id="max-algae-slider" gutterBottom>
        Maximum Algae Population
      </Typography>
      <Slider
        value={params.maxAlgae}
        onChange={handleMaxAlgaeChange}
        aria-labelledby="max-algae-slider"
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
        value={params.algaeBreedThreshold}
        onChange={handleAlgaeBreedThresholdChange}
        aria-labelledby="algae-breed-threshold-slider"
        step={10}
        marks={marks}
        min={50}
        max={300}
      />
      <div className={classes.margin} />
      <Button className={classes.button} variant="contained" onClick={() => { props.setParameters(params); props.toggle(false); }}>Save</Button>
      <Button className={classes.button} variant="contained" onClick={() => { reset(); }}>Reset</Button>
      <Button className={classes.button} variant="contained" onClick={() => { props.toggle(false); }}>Close</Button>
    </div>
  );

};

const mapStateToProps = state => {
  const parameters = getParameters(state);
  return { parameters };
};

export default connect(mapStateToProps, {setParameters, resetParameters})(Parameters);
