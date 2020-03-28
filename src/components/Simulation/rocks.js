import { contact } from './physics';
import uuidv4 from 'uuid/v4';

import rock01 from "../../assets/rocks/rock01.png";
import rock02 from "../../assets/rocks/rock02.png";
import rock03 from "../../assets/rocks/rock03.png";
import rock04 from "../../assets/rocks/rock04.png";
import rock05 from "../../assets/rocks/rock05.png";
import rock06 from "../../assets/rocks/rock06.png";
import rock07 from "../../assets/rocks/rock07.png";
import rock08 from "../../assets/rocks/rock08.png";
import rock09 from "../../assets/rocks/rock09.png";
import rock10 from "../../assets/rocks/rock10.png";
import rock11 from "../../assets/rocks/rock11.png";
import rock12 from "../../assets/rocks/rock12.png";

const images = [
  rock01, rock02, rock03, rock04, rock05, 
  rock06, rock07, rock08, rock09, rock10,
  rock11, rock12
];

export function initRocks(count, screenWidth, screenHeight) {
  // create rock array
  var rocks = [...Array(count)].map(() => ({
    id: uuidv4(),
    image: images[Math.floor(Math.random() * images.length)],
    rotation: Math.random() * Math.PI * 2,
  }));

  // set size and location
  rocks.forEach(rock => {
    // size
    var size = Math.floor(Math.random() * 60) + 20;
    rock.width = size;
    rock.height = size;

    // location - checking no overlap
    var isContact = true; // start by assuming contact until found otherwise
    while(isContact) {
      rock.x = Math.floor(Math.random() * (screenWidth - 100)) + 50;
      rock.y = Math.floor(Math.random() * (screenHeight - 100)) + 50;
      // check EVERY other rock for overlap
      isContact = false; // start by asuming no contact again
      rocks.forEach(other => { // will read all rocks, though could stop on first contact
        if(rock.id !== other.id) {
          if(contact(rock,other)){
            isContact = true;
          }
        }
      })
    };
  });

  return rocks;
}
