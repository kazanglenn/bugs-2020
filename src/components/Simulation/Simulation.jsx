import React from 'react';
import { connect } from "react-redux";
import { addMeasure, addSpeciesCount, resetMeasure, resetSpeciesCount, setControl, setTracker, setParameters } from '../../redux/actions';
import { getControl, getParameters } from '../../redux/selectors';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Stage, Container, Text, withPixiApp, Sprite } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import uuidv4 from 'uuid/v4';
import { Bug } from '../Bug';

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
* tracker, for stats, local copy to make redux management easier
* update redux copy for display
* -----------------------------------------------
*/
var tracker = {
  ticks: 0,
  bugs: 0,
  algae: 0,
  speciesCounts: {}, // support constant tracking of population by species
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
  bugs: 5,
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
const BugSprite = props => (
  <Sprite {...props}
    image={BugImage}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true} 
    interactive={true}
    pointerdown={() => { // respond to click
      // TODO - create a popup or something on screen - this is to browser console
      console.log(props);
      // <Bug props/>
      // render()
    }}   
  />
);

// for algae positioning on birth
// TODO - use PI to derive angle rathen than pseudo grid system here
// const positions = [[-15,-15],[-15,0],[15,15],[0,-15],[0,15],[15,-15],[15,0],[15,15]];
// const positions = [[-12,-12],[-12,0],[12,12],[0,-12],[0,12],[12,-12],[12,0],[12,12]];
const positions = [[-10,-10],[-10,0],[10,10],[0,-10],[0,10],[10,-10],[10,0],[10,10]];

/**
* -----------------------------------------------
* Algae Component
* -----------------------------------------------
*/
const AlgaeSprite = props => (
  <Sprite {...props}
    image={AlgaeImage}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true} 
  />
);

/**
* -----------------------------------------------
* Message to display when all dead
* -----------------------------------------------
*/
const notice = <Text
  text="All Bugs Dead"
  anchor={0}
  x={280}
  y={250}
  style={new PIXI.TextStyle({
    fontSize: 30,
    fontFamily: 'Courier',
    fontWeight: 'bold',
    fill: '#ff0000'
  })}
/>

/**
* -----------------------------------------------
* Init bugs array
* -----------------------------------------------
*/
function initBugs(count) {
  var bugs = [...Array(count)].map(() => ({
    speed: Math.ceil((2 + Math.random() * 4) * 0.5),
    turningSpeed: Math.random() - 0.8,
    direction: Math.random() * Math.PI * 2,
    tint: Math.round(Math.random() * 0xFFFFFF),
    // TODO - width/height from props
    x: Math.random() * 800,
    y: Math.random() * 500,
    _s: 0.6, // base speed - could add to parameters
    rotation: 0,
    // w/h used for collision detection, and controls sprite size
    width: 15,
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

  // inititialise species population tracker
  bugs.forEach((bug) => {
    tracker.speciesCounts[bug.tint] = 1; 
  });

  return bugs;
}

/**
* -----------------------------------------------
* Init algae array
* -----------------------------------------------
*/
function initAlgae(count) {
  var algae = [...Array(count)].map(() => ({
    // TODO - width/height from props
    x: Math.random() * 800,
    y: Math.random() * 500,
    width: 12,
    height: 12,
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
    bugs: [],
    algae: [],
    bugCount: 0,
    algaeCount: 0
  };

  // see https://larry-price.com/blog/2018/06/27/how-to-use-getderivedstatefromprops-in-react-16-dot-3-plus/
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.bugCount === nextProps.bugCount && prevState.algaeCount === nextProps.algaeCount) {
        return prevState
    }

    var algae = initAlgae(nextProps.algaeCount);
    var bugs = initBugs(nextProps.bugCount);

    return {
      bugs: bugs,
      algae: algae,
      bugCount: bugs.length,
      algaeCount: algae.length
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

  // remove items without energy - 'deaths'
  deaths = (items) => {
    items.forEach((item, i) => {
      if(item.energy === 0) {
        items.splice(i, 1); // other is at position i
        tracker.speciesCounts[item.tint]--;
      }
    });
    return items;
  }

  // TODO - deconstruct into smaller functions
  bugLogic = (vbugs) => {
    var bugs = this.deaths(vbugs); // first, remove any bugs with 0 energy

    // BUG PROCESSING
    bugs.forEach((item) => {
      // BREED
      if(item.energy >= item.breedThreshold && bugs.length < this.props.parameters.maxBugs) {
        tracker.totalBugs++;
        item.energy = Math.round(item.energy/2) - this.props.parameters.breedingCost; // half, plus breeding cost
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
        // TODO - make small single adjustments, allow slection of traits
        if(Math.floor(Math.random() * 20) === 0) {  // 1 in n chance of a mutuation
          tracker.totalSpecies++;
          offspring.turningSpeed = item.turningSpeed + (Math.random() * 0.2 - 0.1);
          offspring.speed = item.speed + Math.floor(Math.random() * 3); // (1 + Math.random() * 10) * 0.5; // new speed
          offspring.tint = Math.round(Math.random() * 0xFFFFFF); // new colour to indicate change
          offspring.breedThreshold += item.breedThreshold + Math.floor(Math.random() * 50) - 25; // variable breed speed, up or down
        }
        bugs.push(offspring); // add adjusted copy
        tracker.speciesCounts[offspring.tint] ? tracker.speciesCounts[offspring.tint]++ : tracker.speciesCounts[offspring.tint] = 1; // track new births
      }

      // EAT BUGS
      bugs.forEach((other) => {
        // don't test against self, based on position of old value
        if(item.tint !== other.tint && item.x !== other.x && item.y !== other.y) {
          if(contact(item, other)) {
            item.direction += (Math.random() - 0.5) * 0.75; // avoidance
            // consume the contacted bug
            if(other.energy > 0) {
              item.energy += Math.min(500, other.energy); // take what there is
              other.energy = Math.max(0, other.energy - 500); // reduce to 0, or by 500
            }
          }
        }
      }) 

      // EAT ALGAE
      var eatenAlgae = this.state.algae;
      eatenAlgae.forEach((other, i) => {
        if(contact(item, other)) {
          item.direction += (Math.random() - 0.5) * 0.75; // consume clump
          // consume the contacted bug or algae
          if(other.energy > 0) {
            item.energy += Math.min(500, other.energy); // take what there is
            other.energy = Math.max(0, other.energy - 500); // reduce to 0, or by 500, so eat algae in one go - faster
          }
        }
      });
      this.setState({ algae: eatenAlgae });

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

    return (bugs);
  }

  algaeLogic = (items) => {
    var algae = this.deaths(items); // first, check once over all items, remove any with 0 energy

    // ALGAE PROCESSING
    algae.forEach((item) => {
      // BREED
      // TODO - limit to edge algae, or perhaps sample pop if large, to speed processing
      if(item.energy >= this.props.parameters.algaeBreedThreshold && algae.length < this.props.parameters.maxAlgae) {
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
        for(var i = 0; i < algae.length; i++) { // don't use foreach so can break
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
      // put a cap on energy stored based on breeding threshold - must have that much
      item.energy = Math.min(this.props.parameters.algaeBreedThreshold, item.energy + 1);
    })

    return algae;
  }

  tick = () => {

    this.setState(({ bugs, algae }) => ({
      // not filtering - need to reach each for all to render
      bugs: this.bugLogic(bugs, algae).map((item, i) => {
        // perform basic movement operations here, causes rendering to take place
        
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

        return { ...item, ...newItem };
      })
    }));

    this.setState(({ algae }) => ({
      algae: this.algaeLogic(algae)
    }));  

    // stop processing, all dead
    if(this.state.bugs.length === 0) {
      this.props.app.ticker.stop();
    };
        
    tracker.ticks++;

    // every nth tick, record bug volumes by species - not too oftem, will slow processing
    if(tracker.ticks % this.props.parameters.sampleInterval === 0) {

      // add population measures to redux store
      let sample = {
        cycle: tracker.ticks,
        bugs: this.state.bugs.length,
        algae: this.state.algae.length
      };
      this.props.addMeasure(sample);

      // update redux tracker with local values
      tracker.bugs = this.state.bugs.length;
      tracker.algae = this.state.algae.length;
      this.props.setTracker(tracker);

      // periodically trim tracker species counts of 0 values
      Object.entries(tracker.speciesCounts).forEach(([key, value]) => {
        // should not need undefined test, not sure where undefined coming from
        if(tracker.speciesCounts[key] === 0 || key === 'undefined') {
          delete tracker.speciesCounts[key];
        }
      });    
         
      // normalise species counts into standard structure to make plotting easier
      // const normal = Object.keys(counts).map((name) => {
      const normal = Object.keys(tracker.speciesCounts).map((name) => {
        return {species: name, count: tracker.speciesCounts[name]}
      });

      // wrap up species counts with a cycle indicator
      const species = {cycle: tracker.ticks, counts: normal}

      // add species counts to redux store
      this.props.addSpeciesCount(species);
    }

    this.time += 0.1;
  }

  render() {
    var valgae = this.state.algae.map(props => <AlgaeSprite {...props} />);
    var vbugs = this.state.bugs.map(props => <BugSprite {...props} />);

    var message = 
            "        Cycle: ".concat(tracker.ticks)
    .concat("\n Current Bugs: ").concat(this.state.bugs.length)
    .concat("\nCurrent Algae: ").concat(this.state.algae.length)
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
        // this.setState({bugs: initBugs(config.bugs)}); // should use, but nested
        // this.setState({algae: initAlgae(config.algae)}); // should use, but nested
        this.state.bugs = initBugs(config.bugs);
        this.state.algae = initAlgae(config.algae);
        // reset measures redux array
        this.props.resetMeasure();
        // reset species redux array
        this.props.resetSpeciesCount();
        // reset tracker counts
        // TODO - call function, avoid this hard coding of values
        tracker.ticks = 0;
        tracker.totalBugs = 10;
        tracker.totalSpecies = 10;
        // restart processing
        this.props.app.ticker.start();
        // set control value
        this.props.setControl('PLAY'); // set running again
        break;
      default:
        console.log("command not recognised ...");
    }

    if(this.state.bugs.length > 0) {
      return [...valgae, ...vbugs, text];
    }
    return [...valgae, ...vbugs, text, notice];
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
                parameters={props.parameters}
                setControl={props.setControl}
                setTracker={props.setTracker}
                addMeasure={props.addMeasure}
                addSpeciesCount={props.addSpeciesCount}
                resetMeasure={props.resetMeasure}
                resetSpeciesCount={props.resetSpeciesCount}
                bugCount={config.bugs}
                algaeCount={config.algae}/>
            </Container>
          )}
        </Settings>
      </Stage>
    </Card>
  );
}

const mapStateToProps = state => {
  const control = getControl(state);  
  const parameters = getParameters(state);
  return { control, parameters };
};

export default connect(
  mapStateToProps,
  { addMeasure, addSpeciesCount, resetMeasure, resetSpeciesCount, setControl, setTracker }
)(Simulation);
