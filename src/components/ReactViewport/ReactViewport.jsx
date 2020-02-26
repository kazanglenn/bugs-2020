import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";

// see - https://codesandbox.io/s/elated-liskov-pdcd6

export default PixiComponent("Viewport", {
  create: props => {
    const viewport = new Viewport({
      // screenWidth: 1000,
      // screenHeight: 500,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 500,
      // ticker: props.app.ticker,
      // interaction: props.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    console.log(props)
    // viewport.on("drag-start", () => console.log("drag-start"));
    // viewport.on("drag-end", () => console.log("drag-end"));

    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    //viewport.scaled = 30;
    return viewport;
  },
  applyProps: (instance, oldProps, newProps) => {
    console.log("applyProps");
  },
  didMount: () => {
    console.log("didMount");
  },
  willUnmount: () => {
    console.log("willUnmount");
  }
});