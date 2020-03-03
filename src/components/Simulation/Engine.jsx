import React from 'react';
import { connect } from "react-redux";
import { addMeasure, addSpeciesCount, resetMeasure, resetSpeciesCount, setControl, setTracker } from '../../redux/actions';
import { setAlgae, addAlgae, deleteAlgae, setBugs, addBug, deleteBug } from '../../redux/actions';
import { getControl, getParameters, getAlgae, getBugs } from '../../redux/selectors';
import { Text, withPixiApp, Sprite, useApp } from '@inlet/react-pixi';
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
  }


  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick);
  }


  // direct manipulation version
  bugLogic = () => {
    // first, check once over all items, remove any with 0 energy
    this.props.bugs.forEach((b, i) => {
      if (b.energy === 0) {
        this.props.bugs.splice(i, 1); // other is at position i
        // this.props.deleteBug(b); // slow but correct
        // tracker.speciesCounts[b.tint]--;
        tracker.speciesCounts[b.tint] ? tracker.speciesCounts[b.tint]-- : tracker.speciesCounts[b.tint] = 0; // may not exist if first org
      }
    });


    // BUG PROCESSING
    this.props.bugs.forEach((item) => {

      // BREED
      if (this.props.bugs.length < this.props.parameters.maxBugs 
          && item.width >= item.breedSize 
          && item.energy >= item.breedThreshold) {
        tracker.totalBugs++;
        var offspring = Object.assign({}, this.evolve(item)); // empty object to receive contents of item
        item.energy = Math.round(item.energy * 0.75) - this.props.parameters.breedingCost; // lose 25%, plus breeding cost, for breeding
        offspring.energy = Math.round(item.energy * 0.25); // offspring gets 25% of energy
        offspring.direction = Math.random() * Math.PI * 2; // new heading
        // geneology tracking
        var uuid = uuidv4();
        item.geneology.children.push(uuid); // parent tracks child
        // object.assign does not do a deep copy
        offspring.geneology = {
          id: uuid,
          parent: item.geneology.id,
          children: [] // create blank array for child
        }
        offspring.cycles = 0; // age = 0
        // start small, grow in size
        offspring.width = 5;
        offspring.height = 10;
        this.props.bugs.push(offspring); // add adjusted copy
        // this.props.addBug(offspring); // very slow but correct
        tracker.speciesCounts[offspring.tint] ? tracker.speciesCounts[offspring.tint]++ : tracker.speciesCounts[offspring.tint] = 1; // track new births
      }

      // EAT OTHER BUGS - smaller bugs always eaten, supports growth
      this.props.bugs.forEach((other) => {
        // don't test against self, based on position of other value
        if (item.tint !== other.tint && item.x !== other.x && item.y !== other.y) {
          // if touching and smaller, eat the smaller one, if not own offspring, otherwise no change
          if (contact(item, other) && item.geneology.id !== other.geneology.parent) {
            // eat
            if(item.width > other.width) {
              item.energy += other.energy; // take what energy there is
              other.energy = 0;
              other.tint = 0xFF; // flash white before removal
            }
            // be eaten
            else if(item.width < other.width) {
              other.energy += item.energy; // take what energy there is
              item.energy = 0;
              item.tint = 0xFF; // flash white before removal
            }
            // avoid
            else {
              item.direction += (Math.random() - 0.5) * 0.75; // avoidance
              other.direction += (Math.random() - 0.5) * 0.75; // avoidance
            }
          }
        }
      })

      // EAT ALGAE
      this.props.algae.forEach((algae, i) => {
        if (contact(item, algae)) {
          item.direction += (Math.random() - 0.5) * 0.75; // consume clump, opportunity for intelligence
          // consume the entire contacted algae - no updates
          item.energy += algae.energy; // take what energy there is
          this.props.algae.splice(i, 1); // direct manipulation
          // this.props.deleteAlgae(algae); // slow but correct
          // console.log("consumed",algae.id);
        }
      });

      // MOVE 
      item.x = item.x + Math.sin(item.direction) * (item.speed * item._s);
      item.y = item.y + Math.cos(item.direction) * (item.speed * item._s);
      item.rotation = -item.direction + Math.PI;
      item.direction = item.direction + item.turningSpeed * (Math.random() - 0.5) * 0.5;
      // wrap testing
      if (item.x < this.bounds.x) {
        item.x += this.bounds.width;
      }
      else if (item.x > this.bounds.x + this.bounds.width) {
        item.x -= this.bounds.width;
      }
      if (item.y < this.bounds.y) {
        item.y += this.bounds.height;
      }
      else if (item.y > this.bounds.y + this.bounds.height) {
        item.y -= this.bounds.height;
      }      

      // ENERGY LOSS
      item.energy = Math.max(0, item.energy - (2 + Math.ceil(item.speed))); // energy loss with movement and speed, will need to eat
    })
  }



  // check if should evolve, make small adjustment if so
  evolve = (item) => {
    var offspring = Object.assign({}, item);
    if (Math.floor(Math.random() * this.props.parameters.mutationRate) === 0) {  // 1 in n chance of a mutuation
      tracker.totalSpecies++;
      // TODO - check upper/lower colour bounds
      offspring.tint = item.tint + Math.round(Math.random() * 0xFFFF) - 0x8888; // new colour to indicate change

      // make one small change
      var change = Math.round(Math.random() * 3);
      switch (change) {
        case 0:
          offspring.turningSpeed += (Math.random() * 0.2 - 0.1);
          break;
        case 1:
          offspring.speed += Math.floor(Math.random() * 4) - 2; // allow slow down too
          break;
        case 2:
          offspring.breedThreshold += Math.floor(Math.random() * 20) - 10; // variable breed speed, up or down
          break;
        case 3:
          offspring.breedSize += Math.min(22, Math.max(5, Math.floor(Math.random() * 2) - 1));
          break;
        default:
          console.log("no change ...", change);
      }
    }
    return offspring;
  }

  
  // direct manipulation - no array replacement
  algaeLogic = () => {
    // ALGAE PROCESSING
    this.props.algae.forEach((item) => {
      // increment age
      item.cycles++

      // GROW - based on algae age
      if(item.width < 25 && item.cycles % 75 === 0) {
        item.width++;
        item.height++;
      }
      // BREED
      // TODO - limit to edge algae, or perhaps sample pop if large, to MASSIVELY speed processing
      if (item.energy >= this.props.parameters.algaeBreedThreshold && this.props.algae.length < this.props.parameters.maxAlgae) {
        var offspring = Object.assign({}, item); // empty object to receive contents of item

        // start small, allow for growth
        offspring.width = 5;
        offspring.height = 5;

        var angle = Math.random() * Math.PI * 2;
        var radius = Math.random() * 10 + 10;
        offspring.x += Math.round(Math.cos(angle)*radius);
        offspring.y += Math.round(Math.sin(angle)*radius);   

        // edge wrap detection - move to function
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
        for (var i = 0; i < this.props.algae.length; i++) { // don't use foreach so can break on first hit
          if (contact(offspring, this.props.algae[i])) {
            isContact = true;
            break;
          }
        }

        // no overlap so create
        if (!isContact) {
          // only take energy away when space to breed
          item.energy = Math.round(item.energy * 0.9); // keep 90%
          offspring.energy = Math.round(item.energy * 0.1); // 10%
          this.props.algae.push(offspring); // add adjusted copy
          // this.props.addAlgae(offspring); // slow but correct
        }
      }

      // PHOTOSYNTHESISE
      // put a cap on energy stored based on breeding threshold - must have that much
      // item.energy = Math.min(this.props.parameters.algaeBreedThreshold, item.energy + 1);
      item.energy = Math.min(item.width * 8, item.energy + 1); // limit energy based on size - need to grow
    })
  }



  tick = () => {
    this.bugLogic();
    this.algaeLogic();

    // doing this here to update state to cause re-rendering
    // see if way to force re-render witht replacing bug array
    // re-rendering causes algae to work too
    this.props.setBugs(this.props.bugs.map((bug, i) => {
      bug.cycles++;
      // GROW until width 15
      // TODO - parameterise init and max sizes
      if(bug.width < 22 && bug.cycles % 100 === 0) {
        bug.width++;
        bug.height+=2;
      }
      return bug;
    }));

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
