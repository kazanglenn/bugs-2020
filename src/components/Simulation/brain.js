
/**
* -----------------------------------------------
* Bug brain
* -----------------------------------------------
*/
export default class brain {
  move(speed, direction, x, y, energy) {
    var newSpeed = speed; // will be delta on speed
    var newDirection = direction; // will be delta on direction

    console.log(speed, direction, x, y, energy);

    // TODO - smarts
    newSpeed = Math.min(Math.max(0, speed + Math.random() * 4 - 2),9);
    newDirection = direction + 0.5 * Math.random() - 0.25;



    return ({ speed: newSpeed, direction: newDirection });
  }
};