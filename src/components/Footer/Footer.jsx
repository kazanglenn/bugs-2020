import React from "react";
import { BottomNavigation, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    textDecoration: 'none',
    width: 'calc(100% - 10px)',
    padding: '5px',
    height: '22px',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  link: {
    color: 'rgb(63, 63, 191, 0.9)',
    "&:hover": {
      color: '#0066ff'
    }
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.footer}>
      <Link className={classes.link} href="https://www.linkedin.com/in/kazanglenn/">Kazan Glenn</Link>
    </BottomNavigation>
  );
}

export default Footer;