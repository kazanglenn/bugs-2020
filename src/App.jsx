import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';

// icons
// import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
// import UserIcon from '@material-ui/icons/GroupTwoTone';
// import BugIcon from '@material-ui/icons/BugReportTwoTone';
// import WorldIcon from '@material-ui/icons/PublicTwoTone';

// material-ui
import { createMuiTheme } from '@material-ui/core/styles';

// custom components
import {Title} from './components/Title';
import {Simulation} from './components/Simulation';
import {SummaryChart} from './components/SummaryChart';
import {SpeciesChart} from './components/SpeciesChart';

const theme = createMuiTheme({
  palette: {
    type: 'light', // dark | light
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Title/>
          <Simulation width={800} height={500} background={0xFFFFFF}/>
          <SummaryChart/>
          <SpeciesChart/>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;