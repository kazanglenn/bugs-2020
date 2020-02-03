import React, { Component } from 'react';
import { Stage, ParticleContainer, withPixiApp, Sprite, PropTypes } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
// import './World.scss';

// TODO - use assets folder
const bug = '/bug_white.png';
const algae = '/algae.png';

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
  algae: 200,

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
const positions = [[-15,-15],[-15,0],[15,15],[0,-15],[0,15],[15,-15],[15,0],[15,15]];

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
    component: null
  };

  // static propTypes = {
  //   count: PropTypes.number.isRequired,
  //   component: PropTypes.func.isRequired,
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // use count for algae and bugs - so *2 for comparison
    if (prevState.count === nextProps.count+nextProps.algae && prevState.component === nextProps.component) {
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
      energy: 200 // this is getting into gamification
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
    const padding = 20;

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

  // TODO - deconstruct into smaller functions
  logic = (items) => {
    // TODO - reseed algae
    items.forEach((item, i) => {

      // check if still has energy
      if(item.energy === 0) {
        items.splice(i, 1); // other is at position i
        // console.log(item.type,"death");
      }

      else {

        // check if enough energy for bug to breed, artifical break on population
        if(item.type === "bug" && item.energy >= 1000 && items.filter(item => item.type == "bug").length <= 200) {
          item.energy = Math.round(item.energy/2) - 25; // half, plus breeding cost
          var offspring = Object.assign({}, item); // empty object to receive contents of item
          offspring.speed = (2 + Math.random() * 6) * 0.5;
          offspring.turningSpeed = Math.random() - 0.8;
          offspring.direction = Math.random() * Math.PI * 2; // new heading
          items.push(offspring); // add adjusted copy
          // console.log(item.type,"birth");
        }

        // algae breed - if energy doubled, split
        if(item.type === "algae" && item.energy >= 10 && items.filter(item => item.type == "algae").length <= 500) {
          item.energy = Math.round(item.energy/2); // half
          var offspring = Object.assign({}, item); // empty object to receive contents of item
          // TODO - may need to check in bounds
          // TODO - better positioning, avoid overlap
          var index = Math.floor(Math.random() * positions.length);
          offspring.x += positions[index][0] + Math.floor(Math.random() * 60) - 30;
          offspring.y += positions[index][1] + Math.floor(Math.random() * 60) - 30;

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
          
          items.push(offspring); // add adjusted copy
          // console.log(item.type,"birth");
        }

        // check if bug has contact with others, when can take energy from them
        // could at least limit test by reasonable proximity
        if(item.type === "bug"){
          items.forEach((other, j) => {
            // don't test against self, based on position of old value
            // if(item.tint !== other.tint && item.x !== other.x && item.y !== other.y) {
            // if(i !== j) { // just need to check index not same, assumes same array
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
        }

        // simulate photosynthesis; algae gather energy slowly from environment
        if(item.type === "algae") {
          item.energy += 1; 
        }

        // TODO - work out why coord changes here work but not in tick
        if(item.type === "bug") {
          // move the item; this is where ML/AI logic can go - just random adjustments for now
          item.x = item.x + Math.sin(item.direction) * (item.speed * item._s);
          item.y = item.y + Math.cos(item.direction) * (item.speed * item._s);
          item.rotation = -item.direction + Math.PI;
          item.direction = item.direction + item.turningSpeed * (Math.random() - 0.5) * 0.5;
            // speed impacts energy loss rate, slower = lower
          item.energy = Math.max(0, item.energy - 1 - Math.floor(item.speed)); // slow energy loss with movement, will need to eat
        }

        // // check bounds of environment not exceeded, wrap around if so
        // if (item.x < this.bounds.x) {
        //   item.x += this.bounds.width
        // }
        // else if (item.x > this.bounds.x + this.bounds.width) {
        //   item.x -= this.bounds.width
        // }
        // if (item.y < this.bounds.y) {
        //   item.y += this.bounds.height
        // }
        // else if (item.y > this.bounds.y + this.bounds.height) {
        //   item.y -= this.bounds.height
        // }
        
      }

      
    });
    return items;
  }

  tick = () => {
    // this.setState(
    //   ({ items }) => ({

    //     // update bug array for births/deaths
    //     items: items.forEach((item, i) => {

    //       // bug has run out of energy, death ... remove item from array
    //       if(item.energy === 0) {
    //         items.splice(i, 1); // other is at position i
    //         console.log("death");
    //         return { ...item };
    //       }

    //       // breed bugs - quick test, artifical break at 500 on population, stops runaway growth
    //       // TODO - use filters, this is a mess
    //       if(item.type === "bug" && item.energy >= 1200 && items.length <= 300) {
    //         item.energy = item.energy / 2 - 25; // half, plus breeding cost

    //         let baby = Object.assign({}, item); // empty object to receive contents of item
    //         baby.speed = (2 + Math.random() * 4) * 0.4;
    //         baby.turningSpeed = Math.random() - 0.8;
    //         baby.direction = Math.random() * Math.PI * 2; // new heading

    //         items.push(baby); // add adjusted copy
    //         console.log("birth");
    //       }
    //     }),

    //     // items: items.filter(item => item.type === "algae").map((item, i) => {},

    //     // bug movement, filter out algae
    //     // items: items.filter(item => item.type === "bug").map((item, i) => {
    //     items: items.map((item, i) => {

    //       let newItem = {
    //         // scale: item._s + Math.sin(this.time * item._s) * 0.25,
    //         scale: item.scale, // same
    //         x: item.x + Math.sin(item.direction) * (item.speed * item._s),
    //         y: item.y + Math.cos(item.direction) * (item.speed * item._s),
    //         rotation: -item.direction + Math.PI,
    //         // direction: item.direction + item.turningSpeed * 0.01,
    //         // this is where the logic can go - random adjustments for now
    //         direction: item.direction + item.turningSpeed * (Math.random() - 0.5) * 0.5,
    //         width: item.width,
    //         height: item.height,
    //         // this is where the logic can go - random adjustments for now
    //         // TODO - factor speed into energy loss rate, slower = lower
    //         // if(item.type === "bug") {
    //           energy: Math.max(0, item.energy -1) // slow energy loss, will need to eat
    //           // energy: Math.max(0, item.energy) // leave energy loss to breeding only
  
    //         // }
    //       }

    //       if (newItem.x < this.bounds.x) {
    //         newItem.x += this.bounds.width
    //       } else if (newItem.x > this.bounds.x + this.bounds.width) {
    //         newItem.x -= this.bounds.width
    //       }

    //       if (newItem.y < this.bounds.y) {
    //         newItem.y += this.bounds.height
    //       } else if (newItem.y > this.bounds.y + this.bounds.height) {
    //         newItem.y -= this.bounds.height
    //       }

    //       // inefficient experiment - loop through ALL other bugs to test for collision
    //       // should at least limit test by reasonable proximity
    //       // items.map(other => {
    //       //   // don't test against self, based on position of old value
    //       //   if(item.tint !== other.tint && item.x !== other.x && item.y !== other.y) {
    //       //     if(hitTestRectangle(newItem, other)) {
    //       //       // TODO - switch to bump library, more sophisticated contact detection
    //       //       newItem.direction += (Math.random() - 0.5) * 0.5; // avoidance, irrelevant for algae
    //       //       // consume the contacted bug
    //       //       if(other.energy > 0) {
    //       //         newItem.energy += 5;
    //       //         other.energy = Math.max(0, other.energy-5);
    //       //       }
    //       //     }  
    //       //   }
    //       // });
                    
    //       return { ...item, ...newItem }
    //     })
    //   })
    // )

    // all three patterns work but do not re-render items

    // this.setState({
    //   items: this.logic(this.state.items)
    // });

    // this.setState((state, props) => ({
    //   items: this.logic(state.items)
    // }));    

    // shorthand for state.items
    // this.setState(({ items }) => ({
    //   items: this.logic(items)
    // }));

    this.setState(({ items }) => ({
      items: this.logic(items).map((item, i) => {
        // basic movement operations here, causes rendering to take place

        // clone item
        // var newItem = item;
        var newItem = Object.assign({}, item);
        // var newItem = {
        //   type: item.type,
        //   x: item.x,
        //   y: item.y,
        //   rotation: item.rotation,
        //   direction: item.direction
        // }

        if(newItem.type === "bug") {

          // // move the item; this is where logic can go - random adjustments for now
          // newItem.x += Math.sin(item.direction) * (item.speed * item._s);
          // newItem.y += Math.cos(item.direction) * (item.speed * item._s);
          // newItem.rotation += -item.direction + Math.PI;
          // newItem.direction += item.direction + item.turningSpeed * (Math.random() - 0.5) * 0.5;
          //   // TODO - factor speed into energy loss rate, slower = lower
          // newItem.energy = Math.max(0, item.energy -1); // slow energy loss with movement, will need to eat

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


    this.time += 0.1;
  }

  render() {
    // const Comp = this.props.component;
    // return this.state.items.map(props => <Comp {...props} />);
    var algae = this.state.items.filter(item => item.type === "algae").map(props => <Algae {...props} />);
    var bugs = this.state.items.filter(item => item.type === "bug").map(props => <Bug {...props} />);
    
    return [...algae, ...bugs];
    // return algae.concat(bugs);
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

  render() {
    return (
      <Stage width={800} height={500} options={{ backgroundColor: 0xdfe6e8 }}>
        <Settings>
          {config => (
            <ParticleContainer properties={config}>
              {/* <Batch count={config.bugs} component={Bug}/> */}
              <Batch count={config.bugs} algae={config.algae}/>
            </ParticleContainer>
          )}
        </Settings>
      </Stage>
    )
  }
}

export default World;
