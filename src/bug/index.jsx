import React, { useState, useEffect } from 'react';

// icons
import BugIcon from '@material-ui/icons/BugReportTwoTone';


function Bug() {

  const classes = useStyles();

  // using React hooks - not e.g. componentDidMount()
  useEffect(() => {
  });

  // use dashboard for 'world' for now - can create custom menus later

  return (
    <BugIcon fontSize="large" />
  );

};

export default Bug;