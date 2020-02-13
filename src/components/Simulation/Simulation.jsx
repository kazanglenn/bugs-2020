import React from 'react';
import { connect } from "react-redux";
import { addMeasure, addSpeciesCount, resetMeasure, resetSpeciesCount, setControl, setTracker } from '../../redux/actions';
import { getControl } from '../../redux/selectors';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Container, Text, withPixiApp, Sprite } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import uuidv4 from 'uuid/v4';

// project components
import { contact } from './physics';

// images
import BugImage from '../../assets/flatworm.png';
import AlgaeImage from '../../assets/algae_small.png';

/**
* -----------------------------------------------
* Component styles
* -----------------------------------------------
*/
const useStyles = makeStyles({
  card: props => ({
    maxWidth: 800,
    maxHeight: 500,
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
* Global constants
* -----------------------------------------------
*/
const globals = {
  maxBugs: 200,
  maxAlgae: 700,
  algaeBreedThreshold: 100,
  breedingCost: 100,
  sampleInterval: 50 // number of ticks before counting species
}

/**
* -----------------------------------------------
* tracker, for stats, local copy to make redux management easier
* update redux copy for display
* -----------------------------------------------
*/
var tracker = {
  ticks: 0,
  bugs: 0,
  algae: 0,
  totalBugs: 10, // init value
  totalSpecies: 10 // init value
}

/**
* -----------------------------------------------
* Config
* -----------------------------------------------
*/
const config = {
  // these are starting values
  bugs: 10,
  algae: 400, // max = 800

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

  state = { ...config.properties, bugs: config.bugs, algae: config.algae, changed: false }

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
* Bug Component
* -----------------------------------------------
*/
const Bug = props => (
  <Sprite {...props}
    image={BugImage}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true} 
    interactive={true}
    pointerdown={() => { // respond to click
      // TODO - create a popup or something on screen - this is to browser console
      console.log(props)
      // render()
    }}   
  />
);

// for algae positioning on birth
// TODO - use PI to derive angle rathen than pseudo grid system here
// const positions = [[-15,-15],[-15,0],[15,15],[0,-15],[0,15],[15,-15],[15,0],[15,15]];
const positions = [[-12,-12],[-12,0],[12,12],[0,-12],[0,12],[12,-12],[12,0],[12,12]];

/**
* -----------------------------------------------
* Bug Component
* -----------------------------------------------
*/
const Algae = props => (
  <Sprite {...props}
    image={AlgaeImage}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true} 
  />
);

function initBugs(count) {
  var bugs = [...Array(count)].map(() => ({
    type: "bug",
    speed: Math.ceil((2 + Math.random() * 4) * 0.5),
    // offset: Math.random() * 100,
    turningSpeed: Math.random() - 0.8,
    direction: Math.random() * Math.PI * 2,
    tint: Math.round(Math.random() * 0xFFFFFF),
    // TODO - width/height from props
    x: Math.random() * 800,
    y: Math.random() * 500,
    _s: 0.6, // base speed - could add to globals
    rotation: 0,
    // w/h only for collision detection
    width: 16,
    height: 30,
    energy: 400,
    cycles: 0, // track age in cycls
    breedThreshold: Math.floor(Math.random() * 1000) + 1000,
    // info to allow geneology reports
    geneology: {
      id: uuidv4(),
      parent: 'SEED', // track parent - this is initial SEED
      children: [] // empty to start
    }
  }));
  return bugs;
}

function initAlgae(count) {
  var algae = [...Array(count)].map(() => ({
    type: "algae",
    // TODO - width/height from props
    x: Math.random() * 800,
    y: Math.random() * 500,
    width: 15,
    height: 15,
    energy: Math.floor(Math.random() * 50) + 50 // spread initial values, avoid all breeding together
  }));
  return algae;
}


/**
* -----------------------------------------------
* Batch Component
* -----------------------------------------------
*/
const Batch = withPixiApp(class extends React.PureComponent {
  time = 0
  bounds = null
  state = { 
    items: [], 
    count: 0
  };

  // see https://larry-price.com/blog/2018/06/27/how-to-use-getderivedstatefromprops-in-react-16-dot-3-plus/
  static getDerivedStateFromProps(nextProps, prevState) {
    // use count for algae and bugs - so *2 for comparison
    if (prevState.count === nextProps.count + nextProps.algae) {
        return prevState
    }

    var algae = initAlgae(nextProps.algae);
    var bugs = initBugs(nextProps.count);
    var items = algae.concat(bugs);

    return {
      items: items,
      count: items.length
    }
  }

  componentDidMount() {
    const padding = 10; // 20

    this.bounds = new PIXI.Rectangle(
      -padding,
      -padding,
      // were being read as strings - so = 80020 not 820!
      Number(this.props.app.screen.width) + padding,
      Number(this.props.app.screen.height) + padding
    );

    this.props.app.ticker.add(this.tick);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick);
  }

  // called when a bug is clicked on-screen
  display(bug) {
    console.log(bug);
  }

  // remove items without energy - 'deaths'
  deaths = (items) => {
    items.forEach((item, i) => {
      if(item.energy === 0) {
        items.splice(i, 1); // other is at position i
      }
    });
    return items;
  }

  // TODO - deconstruct into smaller functions
  logic = (items) => {
    // build arrays once
    var all = this.deaths(items); // first, check once over all items, remove any with 0 energy
    var algae = all.filter(item => item.type === "algae");
    var bugs = all.filter(item => item.type === "bug");

    // ALGAE PROCESSING
    algae.forEach((item, i) => {
      // BREED
      // TODO - limit to edge algae, or perhaps sample pop if large, to speed processing
      if(item.energy >= globals.algaeBreedThreshold && algae.length < globals.maxAlgae) {
        let offspring = Object.assign({}, item); // empty object to receive contents of item

        let index = Math.floor(Math.random() * positions.length);
        // randomness creates drift from pure grid, lines reminisent of algae
        offspring.x += positions[index][0] + Math.floor(Math.random() * 8) - 4;
        offspring.y += positions[index][1] + Math.floor(Math.random() * 8) - 4;

        // can push this into a function - used for bugs as well
        if (offspring.x < this.bounds.x) {
          offspring.x += this.bounds.width;
        }
        else if (offspring.x > this.bounds.x + this.bounds.width) {
          offspring.x -= this.bounds.width;
        }
        if (offspring.y < this.bounds.y) {
          offspring.y += this.bounds.height;
        }
        else if (offspring.y > this.bounds.y + this.bounds.height) {
          offspring.y -= this.bounds.height;
        }

        // check overlap - if overlap, do not breed (do no add offpsring) until space
        let isContact = false;
        for(i = 0; i < algae.length; i++) { // don't use foreach so can break
          if(contact(offspring, algae[i])) {
            isContact = true;
            break;
          }
        }

        // no overlap so create
        if(!isContact) {
          // only take energy away when space to breed
          item.energy = Math.round(item.energy/2); // half
          offspring.energy = Math.round(item.energy/2); // half
          algae.push(offspring); // add adjusted copy
        }
      }

      // PHOTOSYNTHESISE
      item.energy = Math.min(100, item.energy + 1); // put a cap on energy stored 
    })

    // BUG PROCESSING
    bugs.forEach((item, i) => {
      // BREED
      if(item.energy >= item.breedThreshold && bugs.length < globals.maxBugs) {
        tracker.totalBugs++;
        item.energy = Math.round(item.energy/2) - globals.breedingCost; // half, plus breeding cost
        let offspring = Object.assign({}, item); // empty object to receive contents of item
        offspring.direction = Math.random() * Math.PI * 2; // new heading
        // geneology tracking
        // TODO - fix this, values being duplicated
        let uuid = uuidv4();
        item.geneology.children.push(uuid);
        // object.assign does not do a deep copy
        offspring.geneology = {
          id: uuid,
          parent: item.geneology.id,
          children: [] // create blank array for child
        }
        offspring.cycles = 0;
        // 'mutations'
        if(Math.floor(Math.random() * 20) === 0) {  // 1 in n chance of a mutuation
          tracker.totalSpecies++;
          offspring.turningSpeed = item.turningSpeed + (Math.random() * 0.2 - 0.1);
          offspring.speed = item.speed + Math.floor(Math.random() * 3); // (1 + Math.random() * 10) * 0.5; // new speed
          offspring.tint = Math.round(Math.random() * 0xFFFFFF); // new colour to indicate change
          offspring.breedThreshold += item.breedThreshold + Math.floor(Math.random() * 50) - 25; // variable breed speed, up or down
        }
        bugs.push(offspring); // add adjusted copy
      }

      // EAT
      items.forEach((other, j) => {
        // don't test against self, based on position of old value
        if(item.tint !== other.tint && item.x !== other.x && item.y !== other.y) {
          if(contact(item, other)) {
            // TODO - switch to bump library, more sophisticated contact detection
            // TODO - avoid overlap
            item.direction += (Math.random() - 0.5) * 0.75; // avoidance, irrelevant for algae
            // consume the contacted bug or algae
            if(other.energy > 0) {
              item.energy += Math.min(500, other.energy); // take what ther
              other.energy = Math.max(0, other.energy - 500); // reduce to 0, or by 100, so eat algae in one go - faster
            }
          }
        }
      }) 

      // MOVE 
      item.x = item.x + Math.sin(item.direction) * (item.speed * item._s);
      item.y = item.y + Math.cos(item.direction) * (item.speed * item._s);
      item.rotation = -item.direction + Math.PI;
      item.direction = item.direction + item.turningSpeed * (Math.random() - 0.5) * 0.5;

      // ENERGY LOSS
      item.energy = Math.max(0, item.energy - (2 + Math.ceil(item.speed))); // slow energy loss with movement, will need to eat

      // TRACK AGE
      item.cycles++;
    })

    return bugs.concat(algae);
  }

  tick = () => {

    this.setState(({ items }) => ({
      // items: this.logic(items).filter(item => item.type === 'bug').map((item, i) => {
      // not filtering - need to reach each for all to render
      items: this.logic(items).map((item, i) => {
        // perform basic movement operations here, causes rendering to take place
        
        if(item.type === "bug") {
          // clone item
          var newItem = Object.assign({}, item);

          // check bounds of environment not exceeded, wrap around if so
          if (newItem.x < this.bounds.x) {
            newItem.x += this.bounds.width;
          }
          else if (newItem.x > this.bounds.x + this.bounds.width) {
            newItem.x -= this.bounds.width;
          }
          if (newItem.y < this.bounds.y) {
            newItem.y += this.bounds.height;
          }
          else if (newItem.y > this.bounds.y + this.bounds.height) {
            newItem.y -= this.bounds.height;
          }
        }

        return { ...item, ...newItem };
      })
    }));

    tracker.ticks++;
    // every nth tick, record bug volumes by species - not too oftem, will slow processing
    if(tracker.ticks % globals.sampleInterval === 0) {
      let bugs = this.state.items.filter(item => item.type === 'bug');
      let algae = this.state.items.filter(item => item.type === 'algae');

      if(bugs.length === 0) {
        // TODO - display message
        console.log("all bugs dead");
        this.props.app.ticker.stop();
      }

      // add population measures to redux store
      let sample = {
        cycle: tracker.ticks,
        bugs: bugs.length,
        algae: algae.length
      };
      this.props.addMeasure(sample);

      // update redux tracker with local values
      tracker.bugs = bugs.length;
      tracker.algae = algae.length;
      this.props.setTracker(tracker);

      // count population by species
      const counts = bugs.reduce((cnts, item) => {
        let name = item.tint.toString();
        cnts[name] = cnts[name] ? cnts[name] + 1 : 1;
        return cnts;
      }, Object.create(null)); // or []

      // normalise species counts into standard structure to make plotting easier
      const normal = Object.keys(counts).map((name) => {
        return {species: name, count: counts[name]}
      });

      // wrap up species counts with a cycle indicator
      const species = {cycle: tracker.ticks, counts: normal}

      // add species counts to redux store
      this.props.addSpeciesCount(species);
    }

    this.time += 0.1;
  }

  render() {
    var algae = this.state.items.filter(item => item.type === "algae").map(props => <Algae {...props} />);
    var bugs = this.state.items.filter(item => item.type === "bug").map(props => <Bug {...props} />);

    var message = 
            "        Cycle: ".concat(tracker.ticks)
    .concat("\n Current Bugs: ").concat(bugs.length)
    .concat("\nCurrent Algae: ").concat(algae.length)
    .concat("\n   Total Bugs: ").concat(tracker.totalBugs)
    .concat("\nTotal Species: ").concat(tracker.totalSpecies);

    // show the 'ticks' on screen - cycle
    var text = <Text
      text={message}
      anchor={0}
      x={5}
      y={5}
      style={new PIXI.TextStyle({
        fontSize: 14,
        fontFamily: 'Courier',
        fontWeight: 'bold',
        fill: '#000080'
      })}
    />

    // manage control buttons
    // TODO - move into function
    switch (this.props.control) {
      case 'PLAY':
        // prevent repeated start calls by testing started
        if (!this.props.app.ticker.started) {
          this.props.app.ticker.start();
        }
        break;
      case 'PAUSE':
        this.props.app.ticker.stop();
        break;
      case 'RESET':
        // stop processing
        this.props.app.ticker.stop();
        // reset the algae and bugs
        let bugs = initBugs(this.props.count);
        let algae = initAlgae(this.props.algae);
        this.state.items = algae.concat(bugs);
        // this.setState({items: algae.concat(bugs)}); // should use, but nested
        // restart processing
        this.props.app.ticker.start();
        // reset measures redux array
        this.props.resetMeasure();
        // reset species redux array
        this.props.resetSpeciesCount();
        // reset tracker counts
        // TODO - call function, avoid this hard coding of values
        tracker.ticks = 0;
        tracker.totalBugs = 10;
        tracker.totalSpecies = 10;
        // set control value
        this.props.setControl('PLAY'); // set running again
        break;
      default:
        console.log("command not recognised ...");
    }

    return [...algae, ...bugs, text];
  }
});

/**
* -----------------------------------------------
* Top Level World Component
* -----------------------------------------------
*/
function Simulation (props) {  

  const classes = useStyles(props);

  // note passing functions to Batch component
  return (
    <Card className={classes.card}>
      <Stage width={props.width} height={props.height} options={{ backgroundColor: props.background }}>
        <Settings>
          {config => (
            <Container properties={config}>
              <Batch 
                control={props.control}
                setControl={props.setControl}
                setTracker={props.setTracker}
                addMeasure={props.addMeasure}
                addSpeciesCount={props.addSpeciesCount}
                resetMeasure={props.resetMeasure}
                resetSpeciesCount={props.resetSpeciesCount}
                count={config.bugs} algae={config.algae}/>
            </Container>
          )}
        </Settings>
      </Stage>
    </Card>
  );
}


const mapStateToProps = state => {
  const control = getControl(state);  
  return { control };
};

export default connect(
  mapStateToProps,
  { addMeasure, addSpeciesCount, resetMeasure, resetSpeciesCount, setControl, setTracker }
)(Simulation);