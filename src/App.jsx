import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

// custom components
import {Header} from './components/Header';
import {Title} from './components/Title';
import {Simulation} from './components/Simulation';
import {SummaryChart} from './components/SummaryChart';
import {SpeciesChart} from './components/SpeciesChart';
import {Controls} from './components/Controls';
import {Tracker} from './components/Tracker';

const theme = createMuiTheme({
  palette: {
    type: 'light', // dark | light
  }
});

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}));

export default function App()  {
  
  const classes = useStyles();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header/>
        <div className={classes.offset}/>
        <Title/>
        <Controls/>
        <Simulation width={800} height={500} background={0xFFFFFF}/>
        <Tracker/>
        <SummaryChart/>
        <SpeciesChart/>
      </ThemeProvider>
    </div>
  );
};
