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
import brain from './brain';
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
const BugSprite = (props) => (
  <Sprite {...props.bug}
    image={BugImage}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true}
    interactive={true}
    pointerdown={() => { // respond to click
      console.log(props.bug, props.handleOpen);
      props.handleOpen(props.bug); // open bug modal popup
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
 * TODO - add event listener, get this working to allow scaling for mobile devices
 * @param {PIXI.Application} app
 * @returns {Function}
 * see https://github.com/michelfaria/pixijs-scaletofit/blob/master/game.js
 */
function resize(app) {

  return function () {
    // these values controls the size of the simulation plane
    const WIDTH = 1000;
    var HEIGHT = 500;

    const vpw = window.innerWidth; // Width of the viewport
    const vph = window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    // The aspect ratio is the ratio of the screen's sizes in different dimensions.
    // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.

    if (vph / vpw < HEIGHT / WIDTH) {
      // If height-to-width ratio of the viewport is less than the height-to-width ratio
      // of the game, then the height will be equal to the height of the viewport, and
      // the width will be scaled.
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }

    // each tab causes a call, once rendered - here check we are dealing with the PIXI tab
    if(app.renderer) {
      // Set the game screen size to the new values.
      // This command only makes the screen bigger --- it does not scale the contents of the game.
      // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
      app.renderer.resize(nvw, nvh);

      // This command scales the stage to fit the new size of the game.
      app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
    }
  };
}

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
      Number(1000) + padding,
      Number(500) + padding
    );

    // initial sizing
    resize(this.props.app, this.props.app.screen.width, this.props.app.screen.height)();

    // scale as window is resized
    window.addEventListener("resize", resize(this.props.app));

    // this adds ticker to app causing execution of graphics loop
    this.props.app.ticker.add(this.tick);

    console.log("engine props => ", this.props);
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
        tracker.speciesCounts[b.tint] ? tracker.speciesCounts[b.tint]-- : tracker.speciesCounts[b.tint] = 0; // may not exist if first org
      }
    });


    // BUG PROCESSING
    this.props.bugs.forEach((item) => {

      // BREED
      if (this.props.bugs.length < this.props.parameters.maxBugs // less than max
        && item.width >= item.breedSize // big enough
        && item.energy >= item.breedThreshold // with enough energy
        && Math.floor(Math.random() * 4) === 0) { // and element of chance - fudge factor to slow explosive growth
        tracker.totalBugs++;
        var offspring = Object.assign({}, this.evolve(item)); // empty object to receive contents of item
        // TODO - parameterise how much energy offspring gets, cap energy
        offspring.energy = Math.floor(item.energy * 0.40); // offspring gets 25% of energy - do this first
        item.energy = Math.floor(item.energy * 0.60) - this.props.parameters.breedingCost; // lose 40%, plus breeding cost, for breeding
        offspring.direction = Math.random() * Math.PI * 2; // new heading
        // geneology tracking
        var uuid = uuidv4();
        item.geneology.children.push(uuid); // parent tracks child
        offspring.geneology = {
          id: uuid,
          parent: item.geneology.id,
          children: [] // create blank array for child
        }
        offspring.cycles = 0; // age tracking
        // start small, grow in size
        offspring.width = 6;
        offspring.height = 12;
        this.props.bugs.push(offspring); // add adjusted copy
        // this.props.addBug(offspring); // very slow but correct
        tracker.speciesCounts[offspring.tint] ? tracker.speciesCounts[offspring.tint]++ : tracker.speciesCounts[offspring.tint] = 1; // track new births
      }

      // EAT OTHER BUGS - smaller bugs always eaten, supports growth
      this.props.bugs.forEach((other) => {
        // don't test against self, based on position of other value
        if (other.geneology.id !== item.geneology.id // don't compare to self!
          && item.tint !== other.tint
          && (item.geneology.id !== other.geneology.parent && item.geneology.parent !== other.geneology.id)) {
          // if not offspring and touching and smaller, eat the smaller one, or be eaten
          if (contact(item, other)) {
            // eat
            if (item.width > other.width) {
              item.energy += other.energy; // take what energy there is
              other.energy = 0;
              // other.tint = 0xFFFFFF; // flash white before removal
            }
            // be eaten
            else if (item.width < other.width) {
              other.energy += item.energy; // take what energy there is
              item.energy = 0;
              // item.tint = 0xFFFFFF; // flash white before removal
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
          // consume the entire contacted algae at once - no updates
          item.energy += algae.energy; // take what energy there is
          this.props.algae.splice(i, 1); // direct manipulation
          // this.props.deleteAlgae(algae); // slow but correct
        }
      });

      // BRAIN TEST
      var movement = item.brain.move(item.speed, item.direction, item.x, item.y, item.energy);
      item.direction = movement.direction;
      item.speed = movement.speed;

      // MOVE 
      item.x = item.x + Math.sin(item.direction) * (item.speed * item._s);
      item.y = item.y + Math.cos(item.direction) * (item.speed * item._s);
      item.rotation = -item.direction + Math.PI;

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

  /**
  * -----------------------------------------------
  * Evolve bug
  * check if should evolve, make small adjustment if so
  * -----------------------------------------------
  */
  evolve = (item) => {
    var offspring = Object.assign({}, item);
    if (Math.floor(Math.random() * this.props.parameters.mutationRate) === 0) {  // 1 in n chance of a mutuation
      tracker.totalSpecies++;
      // TODO - check upper/lower colour bounds
      offspring.tint = item.tint + Math.round(Math.random() * 0xFFFF) - 0x8888; // new colour to indicate change

      // make one small change
      // TODO - change smarts, 'brain' attributes, as option
      var change = Math.floor(Math.random() * 3);
      switch (change) {
        case 0:
          offspring.breedThreshold += Math.floor(Math.random() * 20) - 10; // variable breed speed, up or down
          break;
        case 1:
          offspring.breedSize += Math.min(22, Math.max(5, Math.floor(Math.random() * 2) - 1));
          break;
        case 2:
          offspring.brain = new brain(); // constructor changes
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
      if (item.width < 25 && item.cycles % 75 === 0) {
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
        var radius = Math.random() * 60 + 5;
        offspring.x += Math.round(Math.cos(angle) * radius);
        offspring.y += Math.round(Math.sin(angle) * radius);
        offspring.rotation = Math.random() * Math.PI * 2;

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
    // see if way to force re-render without replacing bug array
    // re-rendering causes algae to work too without direct manipulation - hack
    this.props.setBugs(this.props.bugs.map((bug, i) => {
      bug.cycles++;
      // GROW - takes time and energy
      // TODO - parameterise cycles and max sizes
      if (bug.width < bug.breedSize && bug.energy >= 5000) { // need to accumulate 5000 to grow, before breeding, will be staggered across bugs
        bug.width++;
        bug.height += 2;
        bug.energy -= 2500; // TODO - parameterise cost of growth; here it is expensive
      }
      return bug;
    }));

    // stop processing, all dead
    if (this.props.bugs.length === 0) {
      this.props.app.ticker.stop();
    };

    tracker.ticks++;

    // every nth tick, record bug volumes by species - not too often, slows processing
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
    var bugs = this.props.bugs.map(bug => <BugSprite bug={bug} handleOpen={this.props.handleOpen} />);

    var message =
      "Cycle: ".concat(tracker.ticks.toString().padStart(7, ' '))
        .concat("\n Bugs: ").concat(this.props.bugs.length.toString().padStart(7, ' '))
        .concat("\nAlgae: ").concat(this.props.algae.length.toString().padStart(7, ' '));

    // show the 'ticks' on screen - cycle
    var text = <Text
      text={message}
      anchor={0}
      x={5}
      y={450}
      style={new PIXI.TextStyle({
        fontSize: 14,
        fontFamily: 'Courier',
        fontWeight: 'bold',
        fill: '#000000'
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
        this.props.setBugs(initBugs(5, 1000, 500));
        this.props.setAlgae(initAlgae(600, 1000, 500));
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
        console.log("control not recognised ...");
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
