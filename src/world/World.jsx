import React, { Component } from 'react';
import { Stage, ParticleContainer, Container, Text, withPixiApp, Sprite } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
// import './World.scss';

// TODO - use assets folder
const bug = '/flatworm.png';
const algae = '/algae_small.png';

// tracker, for stats
// TODO - should this be state?
var tracker = {
  ticks: 0,
  totalBugs: 10, // init value
  totalSpecies: 10 // init value
}

// see https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function
function contact(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  // console.log("h", r1.height, r2.height);

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

/**
* -----------------------------------------------
* Config
* -----------------------------------------------
*/
const config = {
  bugs: 10,
  algae: 600, // max = 800

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
    image={bug}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true} />
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
    image={algae}
    anchor={0.5}
    overwriteProps={true}
    ignoreEvents={true} />
);

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
    count: 0, 
    // component: null,
    tracker: {
      ticks: 0,
      totalBugs: 10, // init value
      totalSpecies: 10 // init value
    }    
  };

  // static propTypes = {
  //   count: PropTypes.number.isRequired,
  //   component: PropTypes.func.isRequired,
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // use count for algae and bugs - so *2 for comparison
    // if (prevState.count === nextProps.count+nextProps.algae && prevState.component === nextProps.component) {
    if (prevState.count === nextProps.count + nextProps.algae) {
    // if (prevState.count === nextProps.count && prevState.component === nextProps.component) {
        return prevState
    }

    // create array of algae
    var algae = [...Array(nextProps.algae)].map(() => ({
      type: "algae",
      speed: 0,
      offset: Math.random() * 100,
      turningSpeed: 0,
      direction: 0,
      x: Math.random() * 800,
      y: Math.random() * 500,
      _s: 0.5, // all the same size
      scale: 0.5,
      rotation: 0,
      // w/h only for collision detection
      width: 15,
      height: 15,
      energy: Math.floor(Math.random() * 50) + 50 // spread values, avoid all breeding together
    }));

    // var algae = [];

    // create bugs array
    var bugs = [...Array(nextProps.count)].map(() => ({
      type: "bug",
      speed: (2 + Math.random() * 4) * 0.4,
      offset: Math.random() * 100,
      turningSpeed: Math.random() - 0.8,
      direction: Math.random() * Math.PI * 2,
      tint: Math.random() * 0xFFFFFF,
      x: Math.random() * 800,
      y: Math.random() * 500,
      _s: 0.5, // all the same size
      scale: 0.5,
      rotation: 0,
      // w/h only for collision detection
      width: 16,
      height: 30,
      energy: 400, // this is getting into gamification
      breedThreshold: Math.floor(Math.random() * 1000) + 1000
    }));

    // unit into common 'items' list
    var items = algae.concat(bugs);

    return {
      items: items,
      count: items.length,
      component: nextProps.component
    }
  }

  componentDidMount() {
    const padding = 10; // 20

    this.bounds = new PIXI.Rectangle(
      -padding,
      -padding,
      this.props.app.screen.width + padding * 2,
      this.props.app.screen.height + padding * 2
    )

    this.props.app.ticker.add(this.tick)
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.tick)
  }

  // remove items without energy - 'deaths'
  deaths = (items) => {
    items.forEach((item, i) => {
      // check if still has energy
      if(item.energy === 0) {
        items.splice(i, 1); // other is at position i
        // console.log(item.type,"death");
      }
    });
    return items;
  }

  // TODO - deconstruct into smaller functions
  logic = (items) => {
    // build arrays once
    var all = this.deaths(items); // check once over all items
    var algae = all.filter(item => item.type === "algae");
    var bugs = all.filter(item => item.type === "bug");

    // ALGAE PROCESSING
    algae.forEach((item, i) => {
      // BREED
      if(item.energy >= 100 && algae.length <= 800) {
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

      // EAT
      item.energy = Math.min(100, item.energy + 1); // put a cap on energy stored
    })

    // BUG PROCESSING
    bugs.forEach((item, i) => {
      // BREED
      if(item.energy >= item.breedThreshold && bugs.length <= 200) {
        tracker.totalBugs++;
        item.energy = Math.round(item.energy/2) - 100; // half, plus breeding cost
        let offspring = Object.assign({}, item); // empty object to receive contents of item
        offspring.direction = Math.random() * Math.PI * 2; // new heading
        if(Math.floor(Math.random() * 10) === 0) {  // 1 in n chance of a mutuation
          tracker.totalSpecies++;
          offspring.turningSpeed = item.turningSpeed + (Math.random() * 0.2 - 0.1);
          offspring.speed = item.speed + Math.floor(Math.random() * 3); // (1 + Math.random() * 10) * 0.5; // new speed
          offspring.tint = Math.random() * 0xFFFFFF; // new colour to indicate change
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
            item.direction += (Math.random() - 0.5) * 0.5; // avoidance, irrelevant for algae
            // consume the contacted bug or algae
            if(other.energy > 0) {
              item.energy += Math.min(20, other.energy); // take what there is, or 20
              other.energy = Math.max(0, other.energy - 20); // reduce to 0, or by 20
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
    })

    return bugs.concat(algae);
  }

  tick = () => {

    this.setState(({ items }) => ({
      items: this.logic(items).map((item, i) => {
        // basic movement operations here, causes rendering to take place

        // clone item
        // var newItem = item;
        var newItem = Object.assign({}, item);

        if(newItem.type === "bug") {

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
    // this.setState(tracker.ticks++);
    this.time += 0.1;
  }

  render() {
    var algae = this.state.items.filter(item => item.type === "algae").map(props => <Algae {...props} />);
    var bugs = this.state.items.filter(item => item.type === "bug").map(props => <Bug {...props} />);

    // show the 'ticks' on screen - cycle
    var text = <Text
      text={tracker.ticks}
      anchor={0}
      x={5}
      y={5}
      style={new PIXI.TextStyle({
        fontSize: 12
      })}
    />

    return [...algae, ...bugs, text];
  }
});

/**
* -----------------------------------------------
* Top Level World Component
* -----------------------------------------------
*/
class World extends Component { 
  constructor(props) {
    super(props);
    this.state = {}
  }

  // TODO - track and display elapsed time - cycles?
  // colours - see https://www.w3schools.com/colors/colors_names.asp
  render() {
    
    return (
      <Stage width={800} height={500} options={{ backgroundColor: 0xF5F5F5 }}>
        <Settings>
          {config => (
          <Container properties={config}>
            <Batch count={config.bugs} algae={config.algae}/>
          </Container>
          )}
        </Settings>
      </Stage>
    )
  }
}

export default World;
