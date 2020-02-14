import React from 'react';
import { connect } from 'react-redux';
import { getMeasures } from "../../redux/selectors";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    maxHeight: 300,
    margin: 5
  }
});

const options = {
  responsive: true,
  scales: {
    xAxes: [{
      display: true,
      type: 'linear',
      position: 'bottom',
      ticks: {
        stepSize: 100
      }
    }],
    yAxes: [
      {
        id: 'bugs',
        position: 'left',
        display: true
      },
      {
        id: 'algae',
        position: 'right',
        display: true
      }
    ]
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

function SummaryChart({ measures }) {

  const classes = useStyles();

  var chartdata = {
    datasets: [
      {
        label: "Bugs",
        data: measures && measures.length ? measures.map((m) => { return { x: m.cycle, y: m.bugs } }) : [],
        yAxisID: "bugs",
        borderColor: 'rgba(191, 63, 63, 0.5)',
        backgroundColor: 'rgba(191, 63, 63, 0.3)',
        borderWidth: 1,
        pointRadius: 1,
        pointHoverRadius: 1
      },
      {
        label: "Algae",
        data: measures && measures.length ? measures.map((m) => { return { x: m.cycle, y: m.algae } }) : [],
        yAxisID: "algae",
        borderColor: 'rgba(0, 138, 0, 0.7)',
        backgroundColor: 'rgba(0, 138, 0, 0.3)',
        borderWidth: 1,
        pointRadius: 1,
        pointHoverRadius: 1
      }
    ]
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
  const measures = getMeasures(state);
  return { measures };
};

export default connect(mapStateToProps)(SummaryChart);
