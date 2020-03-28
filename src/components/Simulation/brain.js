
/**
* -----------------------------------------------
* Bug brain
* -----------------------------------------------
*/
export default class brain {
  constructor() {
    // inheritable attribute from parents
    this.baseSpeed = Math.round(Math.random() * 2);
    this.turnFactor = 0.5 + Math.random();
  }

  move(speed, direction, x, y, energy) {
    // TODO - add smarts
    var newSpeed = Math.min(Math.max(0, speed + Math.floor(Math.random() * 3) - 1 + this.baseSpeed), 10);
    var newDirection = direction + (Math.random() - 0.5) * this.turnFactor;

    return ({ speed: newSpeed, direction: newDirection });
  }
};