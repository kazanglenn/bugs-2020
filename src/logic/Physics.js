import { timer } from 'd3-timer';

class Physics {

  gameLoop() {
    console.log("game loop entered");
    this.timer = timer(() => this.simulationStep());
  };

  simulationStep() {
    // console.log("step");
  }

}

export default new Physics();