import React from 'react';
import { connect } from 'react-redux';
import { setControl } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

// icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
    maxHeight: 100,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: 5
  }
});

var CONTROL = {
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  RESET: 'RESET'
};

function Controls(props) {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Button className={classes.button} variant="contained" onClick={() => { props.setControl(CONTROL.PAUSE); }}><PauseIcon /></Button>
      <Button className={classes.button} variant="contained" onClick={() => { props.setControl(CONTROL.PLAY); }}><PlayArrowIcon /></Button>
      <Button className={classes.button} variant="contained" onClick={() => { props.setControl(CONTROL.RESET); }}><RefreshIcon /></Button>
    </Card>
  );
}

export default connect(
  null,
  { setControl }
)(Controls);
