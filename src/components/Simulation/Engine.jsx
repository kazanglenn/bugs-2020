import React from 'react';
import { connect } from "react-redux";
import { addMeasure, addSpeciesCount, resetMeasure, resetSpeciesCount, setControl, setTracker } from '../../redux/actions';
import { setAlgae, addAlgae, deleteAlgae, setBugs, addBug, deleteBug } from '../../redux/actions';
import { getControl, getParameters, getAlgae, getBugs } from '../../redux/selectors';
import { Stage, Container, Text, withPixiApp, Sprite, useApp } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
import uuidv4 from 'uuid/v4';

// images
import BugImage from '../../assets/flatworm.png';
import AlgaeImage from '../../assets/algae_small.png';

// simulation components
import { contact, wrap } from './physics';
import { initBugs } from './bugs';
import { initAlgae } from './algae';

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

// for algae positioning on birth
const positions = [[-10, -10], [-10, 0], [10, 10], [0, -10], [0, 10], [10, -10], [10, 0], [10, 10]];

/**
* -----------------------------------------------
* Message to display when all dead
* -----------------------------------------------
*/
const notice = <Text
  text="All Bugs Dead"
  anchor={0}
  x={380}
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
* Core simulation engine
* -----------------------------------------------
*/
const Engine = withPixiApp(class extends React.Component {
  bounds = null

  componentDidMount() {
    const padding = 10;
    this.bounds = new PIXI.Rectangle(
      -padding,
      -padding,
      Number(this.props.app.screen.width) + padding,
      Number(this.props.app.screen.height) + padding
    );

    // this adds ticker to app causing execution of graphics loop
    this.props.app.ticker.add(this.tick);

    console.log("engine props => ", this.props)
    console.log("engine state => ", this.state)
  }


  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick);
  }


  // remove items without energy - 'deaths'
  deaths = (items) => {
    items.forEach((item, i) => {
      if (item.energy === 0) {
        items.splice(i, 1); // other is at position i
        if(item.tint) { tracker.speciesCounts[item.tint]-- };
      }
    });
    return items;
  }


  bugLogic = (vbugs) => {
    var bugs = this.deaths(vbugs); // first, remove any bugs with 0 energy

    // BUG PROCESSING
    bugs.forEach((item) => {
      // BREED
      if (item.energy >= item.breedThreshold && bugs.length < this.props.parameters.maxBugs) {
        tracker.totalBugs++;
        item.energy = Math.round(item.energy / 2) - this.props.parameters.breedingCost; // half, plus breeding cost
        var offspring = Object.assign({}, this.evolve(item)); // empty object to receive contents of item
        offspring.direction = Math.random() * Math.PI * 2; // new heading
        // geneology tracking
        // TODO - fix this, values being duplicated
        var uuid = uuidv4();
        item.geneology.children.push(uuid);
        // object.assign does not do a deep copy
        offspring.geneology = {
          id: uuid,
          parent: item.geneology.id,
          children: [] // create blank array for child
        }
        offspring.cycles = 0; // age = 0
        bugs.push(offspring); // add adjusted copy
        // this.props.addBug(offspring);
        tracker.speciesCounts[offspring.tint] ? tracker.speciesCounts[offspring.tint]++ : tracker.speciesCounts[offspring.tint] = 1; // track new births
      }

      // EAT BUGS
      bugs.forEach((other) => {
        // don't test against self, based on position of old value
        if (item.tint !== other.tint && item.x !== other.x && item.y !== other.y) {
          if (contact(item, other)) {
            item.direction += (Math.random() - 0.5) * 0.75; // avoidance
            // consume the contacted bug
            if (other.energy > 0) {
              item.energy += Math.min(500, other.energy); // take what there is
              other.energy = Math.max(0, other.energy - 500); // reduce to 0, or by 500
            }
          }
        }
      })

      // EAT ALGAE
      var eatenAlgae = this.props.algae;
      eatenAlgae.forEach((algae, i) => {
        if (contact(item, algae)) {
          item.direction += (Math.random() - 0.5) * 0.75; // consume clump, opportunity for intelligence
          // consume the entire contacted algae - no updates
          item.energy += algae.energy; // take what there is
          this.props.deleteAlgae(algae);
        }
      });

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


  // check if should evolve, make small adjustment if so
  evolve = (item) => {
    var offspring = Object.assign({}, item);
    if (Math.floor(Math.random() * this.props.parameters.mutationRate) === 0) {  // 1 in n chance of a mutuation
      tracker.totalSpecies++;
      // TODO - check upper/lower colour bounds
      offspring.tint = item.tint + Math.round(Math.random() * 0xFFFF) - 0x8888; // new colour to indicate change

      // make one small change
      var change = Math.round(Math.random() * 2);
      switch (change) {
        case 0:
          offspring.turningSpeed = item.turningSpeed + (Math.random() * 0.2 - 0.1);
          break;
        case 1:
          offspring.speed = item.speed + Math.floor(Math.random() * 4) - 2; // allow slow down too
          break;
        case 2:
          offspring.breedThreshold += item.breedThreshold + Math.floor(Math.random() * 20) - 10; // variable breed speed, up or down
          break;
        default:
          console.log("no change ...", change);
      }
    }
    return offspring;
  }

  
  algaeLogic = (items) => {
    var algae = this.deaths(items); // first, check once over all items, remove any with 0 energy

    // ALGAE PROCESSING
    algae.forEach((item) => {
      // BREED
      // TODO - limit to edge algae, or perhaps sample pop if large, to MASSIVELY speed processing
      if (item.energy >= this.props.parameters.algaeBreedThreshold && algae.length < this.props.parameters.maxAlgae) {
        var offspring = Object.assign({}, item); // empty object to receive contents of item

        var index = Math.floor(Math.random() * positions.length);
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
        for (var i = 0; i < algae.length; i++) { // don't use foreach so can break
          if (contact(offspring, algae[i])) {
            isContact = true;
            break;
          }
        }

        // no overlap so create
        if (!isContact) {
          // only take energy away when space to breed
          item.energy = Math.round(item.energy / 2); // half
          offspring.energy = Math.round(item.energy / 2); // half
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
    // TODO - update to use wrap
    this.props.setBugs(this.bugLogic(this.props.bugs).map((item, i) => {
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
    }));

    this.props.setAlgae(this.algaeLogic(this.props.algae));

    // stop processing, all dead
    if (this.props.bugs.length === 0) {
      this.props.app.ticker.stop();
    };    

    tracker.ticks++;

    // every nth tick, record bug volumes by species - not too oftem, will slow processing
    if (tracker.ticks % this.props.parameters.sampleInterval === 0) {

      // add population measures to redux store
      let sample = {
        cycle: tracker.ticks,
        bugs: this.props.bugs.length,
        algae: this.props.algae.length
      };
      this.props.addMeasure(sample);

      // update redux tracker with local values
      tracker.bugs = this.props.bugs.length;
      tracker.algae = this.props.algae.length;
      this.props.setTracker(tracker);

      // periodically trim tracker species counts of 0 values
      Object.entries(tracker.speciesCounts).forEach(([key, value]) => {
        // should not need undefined test, not sure where undefined coming from
        if (tracker.speciesCounts[key] === 0 || key === 'undefined') {
          delete tracker.speciesCounts[key];
        }
      });

      // normalise species counts into standard structure to make plotting easier
      // const normal = Object.keys(counts).map((name) => {
      const normal = Object.keys(tracker.speciesCounts).map((name) => {
        return { species: name, count: tracker.speciesCounts[name] }
      });

      // wrap up species counts with a cycle indicator
      const species = { cycle: tracker.ticks, counts: normal }

      // add species counts to redux store
      this.props.addSpeciesCount(species);
    }

  }


  render = () => {
    var algae = this.props.algae.map(props => <AlgaeSprite {...props} />);
    var bugs = this.props.bugs.map(props => <BugSprite {...props} />);

    var message =
      "Cycle: ".concat(tracker.ticks)
        .concat("\n Bugs: ").concat(this.props.bugs.length)
        .concat("\nAlgae: ").concat(this.props.algae.length);

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
        this.props.setBugs(initBugs(5));
        this.props.setAlgae(initAlgae(500));
        // reset measures redux array
        this.props.resetMeasure();
        // reset species redux array
        this.props.resetSpeciesCount();
        // reset tracker counts
        // TODO - call function, avoid this nasty hard coding of values
        tracker.ticks = 0;
        tracker.totalBugs = 5;
        tracker.totalSpecies = 5;
        // restart processing
        this.props.app.ticker.start();
        // set control value
        this.props.setControl('PLAY'); // set running again
        break;
      default:
        console.log("command not recognised ...");
    }

    if (this.props.bugs.length > 0) {
        return [...algae, ...bugs, text];
    }
    return [...algae, ...bugs, text, notice];
  }
});


const mapStateToProps = state => {
  const bugs = getBugs(state);
  const algae = getAlgae(state);
  const control = getControl(state);
  const parameters = getParameters(state);
  return { bugs, algae, control, parameters };
};

const mapDispatchToProps = {
  setBugs, addBug, deleteBug,
  setAlgae, addAlgae, deleteAlgae,
  addMeasure, resetMeasure,
  addSpeciesCount, resetSpeciesCount,
  setControl,
  setTracker
};

export default connect(mapStateToProps, mapDispatchToProps)(Engine);
