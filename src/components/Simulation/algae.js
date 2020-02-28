import uuidv4 from 'uuid/v4';

/**
* -----------------------------------------------
* Init algae array
* -----------------------------------------------
*/
export function initAlgae(count) {
    var algae = [...Array(count)].map(() => ({
      id: uuidv4(),
      // TODO - width/height from props
      x: Math.random() * 1000,
      y: Math.random() * 500,
      width: 12,
      height: 12,
      energy: Math.floor(Math.random() * 50) + 50 // spread initial values, avoid all breeding together
    }));
    
    return algae;
  }
  