import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// custom components
import World from '../world/World';
import Physics from '../logic/Physics';

// icons
import BugIcon from '@material-ui/icons/BugReportTwoTone';
import PlayIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import PauseIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
import ChartIcon from '@material-ui/icons/AssessmentTwoTone';


const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    maxHeight: 500,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    // flex: 'auto',
  },
  media: {
    // justifyContent: 'center',
    // padding: 5,
    // height: 80,  
    width: 177
  },
});

function Dashboard () {

  const classes = useStyles();

  // componentDidMount() {
  //   // Sprite.loadSprite(() => Physics.startGameLoop());
  //   // World.gameLoop();
  // }

  useEffect(() => {
    Physics.gameLoop();
  });

  // use dashboard for 'world' for now - can create custom menus later

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
          <World width={500} height={500} />
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <PlayIcon fontSize="large" />
            <PauseIcon fontSize="large" />
            <ChartIcon fontSize="large" />
          </CardContent>
        </Card>
      </div>
    );

};

export default Dashboard;