import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

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
    // TODO - or not use
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
      </div>
    );

};

export default Dashboard;