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
import {Chart} from './components/Chart';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Title/>
          <Simulation width="800" height="500" background="0xC5C5C5"/>
          <Chart/>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;