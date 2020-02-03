import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// custom components
import World from '../world/World';
// import Physics from '../logic/Physics';

// icons
// import PlayIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
// import PauseIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
// import ChartIcon from '@material-ui/icons/AssessmentTwoTone';


const useStyles = makeStyles({
  card: {
    maxWidth: 800,
    maxHeight: 500,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    width: "50%"
  },
  media: {
    margin: 5,
    height: 100,
    width: 100
  },
});

function Dashboard () {

  const classes = useStyles();

  // using React hooks - in place of componentDidMount()
  useEffect(() => {
    // Physics.gameLoop();
  });

  // hujacking dashboard for 'world' for now - can create custom menus later

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/bugs2020.png"
            title="Bugs 2020"
          />
          <CardContent className={classes.content}>Exploring machine learning and evolutionary adaptation by observing synthetic creatures ('bugs') in a dynamic environment.</CardContent>
        </Card>
        <Card className={classes.card}>
          {/* <World width={classes.card.maxWidth} height={classes.card.maxHeight}/> */}
          <World width={800} height={500} />
        </Card>
        {/* <Card className={classes.card}>
          <CardContent>
            <PlayIcon fontSize="large" />
            <PauseIcon fontSize="large" />
            <ChartIcon fontSize="large" />
          </CardContent>
        </Card> */}
      </div>
    );

};

export default Dashboard;