import React from 'react';

// material-ui components
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

// custom components
import { Header } from './components/Header';

const theme = createMuiTheme({
  palette: {
    type: 'light', // dark | light
  }
});

export default function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </div>
  );
};
