import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

// custom components
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

export default function App()  {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Title/>
        <Simulation width={800} height={500} background={0xFFFFFF}/>
        <Controls/>
        <Tracker/>
        <SummaryChart/>
        <SpeciesChart/>
      </ThemeProvider>
    </div>
  );
};
