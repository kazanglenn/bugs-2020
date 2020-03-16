
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
    // console.log(speed, direction, x, y, energy);

    // TODO - add smarts
    var newSpeed = Math.min(Math.max(0, speed + Math.floor(Math.random() * 3) - 1 + this.baseSpeed), 10);
    var newDirection = direction + ((Math.random() - 0.5) / 2);


    return ({ speed: newSpeed, direction: newDirection });
  }
};