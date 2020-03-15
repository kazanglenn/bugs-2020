import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TitleImage from '../../assets/bugs2020.png';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
    maxHeight: 500,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    width: "80%"
  },
  media: {
    margin: 5,
    height: 100,
    width: 100
  },
});

export default function Title() {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={TitleImage}
        title="Bugs 2020"
      />
      <CardContent className={classes.content}>
        <Typography variant="body1" color="textSecondary" component="p">
          Exploring machine learning and evolutionary adaptation by observing synthetic entities in a dynamic environment.
        </Typography>
      </CardContent>
    </Card>
  );

}
