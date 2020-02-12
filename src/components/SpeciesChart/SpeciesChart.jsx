import React from 'react';
import { connect } from 'react-redux';
import { getSpecies } from "../../redux/selectors";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Line } from 'react-chartjs-2';
import * as PIXI from "pixi.js";

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    maxHeight: 300,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  }
});

const options = {
  responsive: true,
  scales: {
    xAxes: [{
      display: true,
      type: 'linear',
      position: 'bottom'
    }],
    yAxes: [{
      display: true,
      position: 'left'
    }]      
  },
  legend: {
    display: true,
    labels: {
        fontColor: 'rgb(63, 63, 191, 0.9)'
    }
  },    
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 5,
      bottom: 5
    }
  }
}

function SpeciesChart ({species}) {
  
  const classes = useStyles();

  // console.log(species)

  // species data needs to be pivoted from by cycle to by species to chart - TODO use reducer for this
  const chartData = [];
  species.forEach(element => {
    element.counts.forEach(entry => {
      chartData[entry.species] ? chartData[entry.species].push({x: element.cycle, y: entry.count}) : chartData[entry.species] = [{x: element.cycle, y: entry.count}];
    });
  });

  const datasets = Object.keys(chartData).map((name) => {
    let colour = PIXI.utils.premultiplyTintToRgba(name, 0.5);
    let borderColourString = 'rgba('+(colour[0]*0x255)+','+(colour[1]*0x255)+','+(colour[2]*0x255)+', 0.9)';
    let colourString = 'rgba('+(colour[0]*0x255)+','+(colour[1]*0x255)+','+(colour[2]*0x255)+', 0.5)';
    // console.log(colourString);
    return {
      label: name,
      data: chartData[name],
      borderColor: borderColourString,
      backgroundColor: colourString,
      borderWidth: 1,
      pointRadius: 1,
      pointHoverRadius: 1
    }
  });

  const chartdata = {
    datasets: datasets
  }

  return (
    <Card className={classes.card}>
      <Line
        data={chartdata}
        width={800}
        height={300}
        options={options}
      />
    </Card>    
  );  
};

const mapStateToProps = state => {
  const species = getSpecies(state).slice(Math.max(state.species.length - 100, 0));
  return { species };
};

export default connect(mapStateToProps)(SpeciesChart);
