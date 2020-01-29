import React, { Component } from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

// icons
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import UserIcon from '@material-ui/icons/GroupTwoTone';
import BugIcon from '@material-ui/icons/BugReportTwoTone';
import WorldIcon from '@material-ui/icons/PublicTwoTone';

// material-ui
import { createMuiTheme } from '@material-ui/core/styles';

// custom components
import { Dashboard } from './dashboard';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  }
});

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Admin theme={theme} dashboard={Dashboard} dataProvider={dataProvider}>
          <Resource name="users" list={ListGuesser} icon={UserIcon}/>
          <Resource name="bugs" icon={BugIcon}/> 
        </Admin>
      </div>
    );
  }
}

export default App;