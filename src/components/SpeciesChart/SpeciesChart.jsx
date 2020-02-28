import React from 'react';
import { connect } from 'react-redux';
import { getSpecies } from "../../redux/selectors";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Line } from 'react-chartjs-2';
import * as PIXI from "pixi.js";

const useStyles = makeStyles({
  card: {
    maxWidth: 1000,
    maxHeight: 600,
    margin: 5
  }
});

const options = {
  responsive: true,
  animation: false,
  scales: {
    xAxes: [{
      display: true,
      type: 'linear',
      position: 'bottom',
      ticks: {
        stepSize: 100
      }
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

function SpeciesChart({ species }) {

  const classes = useStyles();

  // species data needs to be pivoted from by cycle to by species to chart
  // TODO - filter to top n species for efficiency
  var chartData = [];
  species.forEach(element => {
    element.counts.forEach(entry => {
      chartData[entry.species] ? chartData[entry.species].push({ x: element.cycle, y: entry.count }) : chartData[entry.species] = [{ x: element.cycle, y: entry.count }];
    });
  });

  var datasets = Object.keys(chartData).map((name) => {
    let colour = PIXI.utils.premultiplyTintToRgba(name, 0.5);
    let hexcolour = [colour[0] * 0x255, colour[1] * 0x255, colour[2] * 0x255];
    let borderColourString = 'rgba(' + hexcolour[0] + ',' + hexcolour[1] + ',' + hexcolour[2] + ', 0.9)';
    let colourString = 'rgba(' + hexcolour[0] + ',' + hexcolour[1] + ',' + hexcolour[2] + ', 0.5)';
    return {
      label: name,
      data: chartData[name],
      borderColor: borderColourString,
      backgroundColor: colourString,
      borderWidth: 1,
      pointRadius: 1,
      pointHoverRadius: 1,
      spanGaps: false
    }
  });

  var chartdata = {
    datasets: datasets
  }

  return (
    <Card className={classes.card}>
      <Line
        data={chartdata}
        width={1000}
        height={600}
        options={options}
      />
    </Card>
  );
};

const mapStateToProps = state => {
  const species = getSpecies(state);
  return { species };
};

export default connect(mapStateToProps)(SpeciesChart);
