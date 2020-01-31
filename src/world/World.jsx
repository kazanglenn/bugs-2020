import React, { Component } from 'react';
import { Stage, ParticleContainer, withPixiApp, Sprite, PropTypes } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";
// import './World.scss';

const bug = '/bug_white.png'; // TODO - use assets folder, but how?

// see https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function
function hitTestRectangle(r1, r2) {

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
  bugs: 50,

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

  state = { ...config.properties, bugs: config.bugs, changed: false }

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

/**
* -----------------------------------------------
* Batch Component
* -----------------------------------------------
*/
const Batch = withPixiApp(class extends React.PureComponent {
  time = 0
  bounds = null
  state = { items: [], count: 0, component: null }

  // static propTypes = {
  //   count: PropTypes.number.isRequired,
  //   component: PropTypes.func.isRequired,
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.count === nextProps.count && prevState.component === nextProps.component) {
      return prevState
    }

    return {
      count: nextProps.count,
      component: nextProps.component,
      items: [...Array(nextProps.count)].map(() => ({
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
        // w/h for collision detection
        width: 16,
        height: 30,
        energy: 800 // this is getting into gamification
      }))
    }
  }

  componentDidMount() {
    const padding = 25;

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

  tick = () => {
    this.setState(
      ({ items }) => ({
            // update bug array for births/deaths
        items: items.forEach((item, i) => {

          // bug has run out of energy, death ... remove item from array
          if(item.energy == 0) {
            items.splice(i, 1); // other is at position i
            console.log("death");
            return { ...item };
          }

          // breed - quick test, artifical break at 500 on population, stops runaway growth
          if(item.energy >= 1000 && items.length < 500) {
            item.energy = item.energy / 2 - 25; // half, plus breeding cost

            let baby = Object.assign({}, item); // empty object to receive contents of item
            baby.speed = (2 + Math.random() * 4) * 0.4;
            baby.turningSpeed = Math.random() - 0.8;
            baby.direction = Math.random() * Math.PI * 2; // new heading

            items.push(baby); // add adjusted copy
            console.log("birth");
          }
        }),

        // bug movement
        items: items.map((item, i) => {
          let newItem = {
            // scale: item._s + Math.sin(this.time * item._s) * 0.25,
            scale: item.scale, // same
            x: item.x + Math.sin(item.direction) * (item.speed * item._s),
            y: item.y + Math.cos(item.direction) * (item.speed * item._s),
            rotation: -item.direction + Math.PI,
            // direction: item.direction + item.turningSpeed * 0.01,
            // this is where the logic can go - random adjustments for now
            direction: item.direction + item.turningSpeed * (Math.random() - 0.5) * 0.5,
            width: item.width,
            height: item.height,
            // this is where the logic can go - random adjustments for now
            // TODO - factor speed into energy loss rate, slower = lower
            energy: Math.max(0, item.energy -1) // slow energy loss, will need to eat
          }

          if (newItem.x < this.bounds.x) {
            newItem.x += this.bounds.width
          } else if (newItem.x > this.bounds.x + this.bounds.width) {
            newItem.x -= this.bounds.width
          }

          if (newItem.y < this.bounds.y) {
            newItem.y += this.bounds.height
          } else if (newItem.y > this.bounds.y + this.bounds.height) {
            newItem.y -= this.bounds.height
          }

          // inefficient experiment - loop through ALL other bugs to test for collision
          // should at least limit test by reasonable proximity
          items.map(other => {
            // don't test against self, based on position of old value
            if(item.x != other.x && item.y != other.y && item.tint != other.tint) {
              if(hitTestRectangle(newItem, other)) {
                // TODO - move to bump library, more sophisticated contact detection
                newItem.direction += (Math.random() - 0.5) * 0.5; // avoidance
                // consume the contacted bug
                if(other.energy > 0) {
                  newItem.energy += 5;
                  other.energy -= 5;
                }
              }  
            }
          });
                    
          return { ...item, ...newItem }
        })
      })
    )

    this.time += 0.1
  }

  render() {
    const Comp = this.props.component;
    return this.state.items.map(props => <Comp {...props} />);
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
    this.state = {
    }
  }

  render() {
    return (
      <Stage width={800} height={500} options={{ backgroundColor: 0xdfe6e8 }}>
        <Settings>
          {config => (
            <ParticleContainer properties={config}>
              <Batch count={config.bugs} component={Bug}component={Bug} />
            </ParticleContainer>
          )}
        </Settings>
      </Stage>
    )
  }
}

export default World;
