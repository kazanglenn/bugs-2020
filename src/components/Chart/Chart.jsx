import React from 'react';
import { connect } from 'react-redux';
import { getMeasures } from "../../redux/selectors";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    maxHeight: 200,
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
      display: true
    }]      
  },
  legend: {
    display: true,
    labels: {
        fontColor: 'rgb(255, 255, 255, 0.5)'
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

function Chart ({measures}) {
  
  const classes = useStyles();

  const chartdata = {
    datasets: [
      {
        label: "Bugs",
        data: measures && measures.length ? measures.map((m) => {return {x: m.cycle, y: m.bugs}}) : [],
        borderColor: 'rgba(240, 163, 10, 0.7)',
        backgroundColor: 'rgba(240, 163, 10, 0.3)'
      },
      {
        label: "Algae",
        data: measures && measures.length ? measures.map((m) => {return {x: m.cycle, y: m.algae}}) : [],
        borderColor: 'rgba(0, 138, 0, 0.7)',
        backgroundColor: 'rgba(0, 138, 0, 0.3)'
      }
    ]
  }

  return (
    <Card className={classes.card}>
      <Line
        data={chartdata}
        width={800}
        height={200}
        options={options}
      />
    </Card>    
  );  
};

const mapStateToProps = state => {
  // console.log(state); // working, updates per post
  // const measures = getMeasures(state); // TODO - REDUCER NOT WORKING BUT SHOULD
  // take last 200 records
  const measures = state.measures.slice(Math.max(state.measures.length - 200, 0)); // this does work - direct access
  // console.log(measures); // working, updates per post
  return { measures };
};

export default connect(mapStateToProps)(Chart);
// export default Chart;
