import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink, Switch } from 'react-router-dom';

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// material-ui icons
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import BugReportIcon from '@material-ui/icons/BugReport';

// custom components
import { Parameters } from '../Parameters';
import { Title } from '../Title';
import { Simulation } from '../Simulation';
import { SummaryChart } from '../SummaryChart';
import { SpeciesChart } from '../SpeciesChart';
import { Controls } from '../Controls';
import { Tracker } from '../Tracker';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    width: 250,
  }
}));

export default function Header() {
  const classes = useStyles();

  // React hooks state management
  const [settings, setSettings] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleSettings = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSettings(open);
  };

  const toggleMenu = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenu(open);
  };

  const ListItemLink = (props) => {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );

    return (
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    );
  };

  ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  const menuList = () => (
    <div
      className={classes.menu}
      role="presentation"
      onClick={toggleMenu(false)}
      onKeyDown={toggleMenu(false)}
    >
      <List component="nav" aria-label="navigation">
        {[
          { text: 'Home', icon: <HomeIcon />, href: '/' },
          { text: 'Simulation', icon: <BugReportIcon />, href: '/simulation' },
          { text: 'About', icon: <InfoIcon />, href: '/about' },
        ].map((entry, index) => (
          <ListItemLink to={entry.href} primary={entry.text} icon={entry.icon} />
        ))}
      </List>
    </div>
  );

  return (
    <MemoryRouter initialEntries={['/about']} initialIndex={0}>
      
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Bugs 2020
          </Typography>
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="settings" onClick={toggleSettings(true)}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={menu} onClose={toggleMenu(false)}>
          {menuList()}
        </Drawer>
        <Drawer anchor="right" open={settings} onClose={toggleSettings(false)}>
          <Parameters toggle={toggleSettings()} />
        </Drawer>
      </div>

      <Switch>
        <Route exact path="/">
          {/* <Home /> */}
          <div/>
        </Route>
        <Route exact path="/simulation">
          <div className={classes.offset} />
          <div>
            <Controls />
            <Simulation width={1000} height={500} />
            <Tracker />
            <SummaryChart />
            <SpeciesChart />
          </div>
        </Route>
        <Route path="/about">
          <div className={classes.offset} />
          <div>
            <Title />
          </div>
        </Route>
      </Switch>

    </MemoryRouter>
  );

}
