import React from 'react';
import { Provider } from "react-redux";
import store from "../../redux/store";
import { Stage, Container } from '@inlet/react-pixi';

// material-ui components
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

// images
import BackgroundImage from '../../assets/sand.png';

// simulation components
import ReactViewport from '../ReactViewport';
import Engine from './Engine';

// project components
import { Bug } from '../Bug';

/**
* -----------------------------------------------
* Component styles
* -----------------------------------------------
*/
const useStyles = makeStyles({
  card: props => ({
    maxWidth: "100%",
    maxHeight: "100%",
    backgroundImage: 'url(' + BackgroundImage + ')',
    backgroundRepeat: 'repeat',
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  })
});

/**
* -----------------------------------------------
* Config
* -----------------------------------------------
*/
const config = {
  properties: {
    position: true,
    rotation: true,
    scale: false,
    uvs: false,
    alpha: false,
  },

  listeners: [],
  onChange: function (prop, val) { this.listeners.forEach(l => l(prop, val)) },
}

/**
* -----------------------------------------------
* Settings Component
* -----------------------------------------------
*/
class Settings extends React.PureComponent {

  state = { ...config.properties, changed: false }

  componentDidMount() {
    config.listeners.push(this.onChange)
  }

  onChange = (prop, val) => {
    this.setState({ [prop]: val, changed: true })

    // creates new ParticleContainer as properties cannot be changed over time
    clearTimeout(this.changeTimeout)
    this.changeTimeout = setTimeout(() => this.setState({ changed: false }), 0)
  }

  render() {
    return this.state.changed ? null : this.props.children(this.state)
  }
};


/**
* -----------------------------------------------
* Top level simulation component
* -----------------------------------------------
*/
function Simulation(props) {

  const classes = useStyles(props);

  const [bug, setBug] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (b) => {
    setBug(b);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <Stage width={props.width} height={props.height} options={{ transparent: true }}>
        <Provider store={store}>
        {/* <ReactViewport app={app}> */}
          <Settings>
            {config => (
              <Container properties={config}>
                <Engine config={props} handleOpen={handleOpen} />
              </Container>
            )}
          </Settings>
          </Provider>
        {/* </ReactViewport> */}
      </Stage>
      <Bug open={open} bug={bug} handleClose={handleClose}/>
    </Card>
  );
}

export default Simulation;