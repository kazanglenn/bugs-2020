
/**
* -----------------------------------------------
* Bug brain
* -----------------------------------------------
*/
export default class brain {
  constructor() {
    this.baseSpeed = Math.round(Math.random() * 3); // inheritable attribute from parents
  }

  move(speed, direction, x, y, energy) {
    var newSpeed = speed; // will be delta on speed
    var newDirection = direction; // will be delta on direction

    // console.log(speed, direction, x, y, energy);

    // TODO - add smarts
    newSpeed = Math.min(Math.max(0, speed + Math.random() * 2 - 1 + this.baseSpeed), 10);
    newDirection = direction + ((Math.random() - 0.5) / 2);


    return ({ speed: newSpeed, direction: newDirection });
  }
};