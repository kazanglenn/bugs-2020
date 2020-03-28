import uuidv4 from 'uuid/v4';
import brain from './brain';

import bug01 from "../../assets/bugs/bug01.png";
import bug02 from "../../assets/bugs/bug02.png";
import bug03 from "../../assets/bugs/bug03.png";

const images = [
  bug01, bug02, bug03
];

/**
* -----------------------------------------------
* Init bugs array
* -----------------------------------------------
*/
export function initBugs(count, screenWidth, screenHeight) {
  var bugs = [...Array(count)].map(() => ({
    image: images[Math.floor(Math.random() * images.length)],
    brain: new brain(),
    speed: Math.ceil((2 + Math.random() * 4) * 0.5),
    direction: Math.random() * Math.PI * 2,
    tint: Math.round(Math.random() * 0xFFFFFF), // species and colour
    x: Math.random() * screenWidth,
    y: Math.random() * screenHeight,
    _s: 0.6, // base speed - could add to parameters
    rotation: 0,
    // w/h used for collision detection, and controls sprite size
    width: 6,
    height: 12,
    energy: 800,
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
