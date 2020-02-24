import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings'; 
import Drawer from '@material-ui/core/Drawer';
import {Parameters} from '../Parameters';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  // React hooks state setting
  const [state, setState] = React.useState({
    parameters: false
  });

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, parameters: open });
  };  

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bugs 2020
          </Typography>
          {/* <Button color="inherit" onClick={toggleDrawer(true)}>Parameters</Button> */}
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="settings" onClick={toggleDrawer(true)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={state.parameters} onClose={toggleDrawer(false)}>
        <Parameters/>
      </Drawer>
    </div>
  );

}
