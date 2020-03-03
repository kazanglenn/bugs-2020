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
      x: Math.round(Math.random() * 1000),
      y: Math.round(Math.random() * 500),
      rotation: Math.random() * Math.PI * 2,
      // width: Math.round(Math.random() * 7 + 5),
      width: 12,
      height: 12,
      energy: Math.floor(Math.random() * 100) + 10, // spread initial values, avoid all breeding together
      cycles: 0, // track age in cycles
    }));
    
    return algae;
  }
  