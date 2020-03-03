import uuidv4 from 'uuid/v4';

/**
* -----------------------------------------------
* Init bugs array
* -----------------------------------------------
*/
export function initBugs(count) {
  var bugs = [...Array(count)].map(() => ({
    speed: Math.ceil((2 + Math.random() * 4) * 0.5),
    turningSpeed: Math.random() - 0.8,
    direction: Math.random() * Math.PI * 2,
    tint: Math.round(Math.random() * 0xFFFFFF),
    // TODO - take width/height from props
    x: Math.random() * 1000,
    y: Math.random() * 500,
    _s: 0.6, // base speed - could add to parameters
    rotation: 0,
    // w/h used for collision detection, and controls sprite size
    width: 15,
    height: 30,
    energy: 400,
    cycles: 0, // track age in cycles
    breedSize: Math.floor(Math.random() * 10) + 10, // minimum width before breeding
    breedThreshold: Math.floor(Math.random() * 1000) + 1000,
    // info to allow geneology reports
    geneology: {
      id: uuidv4(),
      parent: 'SEED', // track parent - this is initial SEED
      children: [] // empty to start
    }
  }));

  return bugs;
}