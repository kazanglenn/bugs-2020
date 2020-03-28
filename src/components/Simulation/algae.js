import { contact } from './physics';
import uuidv4 from 'uuid/v4';

// green algae
import algae01 from "../../assets/algae/algae01.png";
import algae02 from "../../assets/algae/algae02.png";
import algae03 from "../../assets/algae/algae03.png";
import algae04 from "../../assets/algae/algae04.png";
import algae05 from "../../assets/algae/algae05.png";
import algae06 from "../../assets/algae/algae06.png";
// red algae
import algae07 from "../../assets/algae/algae07.png";
import algae08 from "../../assets/algae/algae08.png";
import algae09 from "../../assets/algae/algae09.png";
import algae10 from "../../assets/algae/algae10.png";
import algae11 from "../../assets/algae/algae11.png";
import algae12 from "../../assets/algae/algae12.png";
// blue green algae
import algae13 from "../../assets/algae/algae13.png";
import algae14 from "../../assets/algae/algae14.png";
import algae15 from "../../assets/algae/algae15.png";
import algae16 from "../../assets/algae/algae16.png";
import algae17 from "../../assets/algae/algae17.png";
import algae18 from "../../assets/algae/algae18.png";
// brown
import algae19 from "../../assets/algae/algae19.png";
import algae20 from "../../assets/algae/algae20.png";
import algae21 from "../../assets/algae/algae21.png";
import algae22 from "../../assets/algae/algae22.png";
import algae23 from "../../assets/algae/algae23.png";
import algae24 from "../../assets/algae/algae24.png";
// alt green
import algae25 from "../../assets/algae/algae25.png";
import algae26 from "../../assets/algae/algae26.png";
import algae27 from "../../assets/algae/algae27.png";
import algae28 from "../../assets/algae/algae28.png";
import algae29 from "../../assets/algae/algae29.png";
import algae30 from "../../assets/algae/algae30.png";


const images = [
  algae01, algae02, algae03, algae04, algae05, algae06, // green
  algae07, algae08, algae09, algae10, algae11, algae12, // red
  algae13, algae14, algae15, algae16, algae17, algae18, // blue
  algae19, algae20, algae21, algae22, algae23, algae24, // brown
  algae25, algae26, algae27, algae28, algae29, algae30  // alt green
];

/**
* -----------------------------------------------
* Init algae array
* -----------------------------------------------
*/
export function initAlgae(count, screenWidth, screenHeight, rocks) {
  // create algae array
  var algae = [...Array(count)].map(() => ({
    id: uuidv4(),
    image: images[Math.floor(Math.random() * images.length)],
    // x: Math.floor(Math.random() * screenWidth),
    // y: Math.floor(Math.random() * screenHeight),
    rotation: Math.random() * Math.PI * 2,
    cycles: 0, // track age in cycles
  }));

  // set size, energy and location 
  algae.forEach(alg => {
    // size and energy
    var size = Math.floor(Math.random() * 15) + 5; // size = 5 -> 25, no full grown algae to start
    alg.width = size;
    alg.height = size;
    alg.energy = Math.floor(Math.random() * size) + size; // relate initial energy to size

    // location - find a location not overlapping with rocks or other algae
    var isContact = true; // start by assuming contact until found otherwise
    while(isContact) {
      alg.x = Math.floor(Math.random() * screenWidth);
      alg.y = Math.floor(Math.random() * screenHeight);

      // start by asuming no contact again
      isContact = false;

      // first check not overlapping with rocks, smaller number of larger entities
      if(rocks){
        rocks.forEach(rock => {
          if(contact(alg, rock)){
            isContact = true;
          }
        })  
      }

      // if still no contacts, check not overlapping with other algae
      if(!isContact) {
        algae.forEach(other => {
          if(alg.id !== other.id) {
            if(contact(alg, other)){
              isContact = true;
            }
          }
        })
      }
    };
  })

  return algae;
}
