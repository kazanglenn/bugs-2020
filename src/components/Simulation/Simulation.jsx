import React from 'react';
import { Provider } from "react-redux";
import store from "../../redux/store";
import { Stage, Container } from '@inlet/react-pixi';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';


// images
import BackgroundImage from '../../assets/background_water.png';

// simulation components
import ReactViewport from '../ReactViewport';
import Engine from './Engine';


/**
* -----------------------------------------------
* Component styles
* -----------------------------------------------
*/
const useStyles = makeStyles({
  card: props => ({
    maxWidth: 1000,
    maxHeight: 500,
    backgroundImage: 'url(' + BackgroundImage + ')',
    // TODO - fix this, use props, should work, see https://material-ui.com/styles/basics/
    // maxWidth: props.width,
    // maxHeight: props.height,
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

  // state = { ...config.properties, bugs: config.bugs, algae: config.algae, changed: false }
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

  console.log("sim props => ", props)

  // note passing functions to Batch component - there must be a better way, getting too many
  return (
    <Card className={classes.card}>
      <Stage width={props.width} height={props.height} options={{ transparent: true }}>
        <Provider store={store}>
        {/* <ReactViewport app={app}> */}
          <Settings>
            {config => (
              <Container properties={config}>
                <Engine config={props}/>
              </Container>
            )}
          </Settings>
          </Provider>
        {/* </ReactViewport> */}
      </Stage>
    </Card>
  );
}

export default Simulation;