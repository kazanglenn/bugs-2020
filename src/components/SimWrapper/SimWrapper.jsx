import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// custom components
import { Simulation } from '../Simulation';
import { SummaryChart } from '../SummaryChart';
import { SpeciesChart } from '../SpeciesChart';
import { BugList } from '../BugList';
import { Controls } from '../Controls';
import { Tracker } from '../Tracker';
import { Footer } from '../Footer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SimWrapper() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable">
          <Tab label="Simulation" {...a11yProps(0)} />
          <Tab label="Summary" {...a11yProps(1)} />
          <Tab label="Species" {...a11yProps(2)} />
          <Tab label="Bugs" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Controls />
        <Simulation/>
        <SummaryChart height={200}/>
        <Tracker />
        <Footer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SummaryChart height={400}/>
        <Tracker />
        <Footer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SpeciesChart height={700}/>
        <Footer />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BugList />
        <Footer />
      </TabPanel>
    </div>
  );
}