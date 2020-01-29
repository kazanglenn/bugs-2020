import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Circle } from 'react-konva';

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };

  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  render() {
    const { width, height } = this.props;

    return (
      <Stage width={width} height={height}>
        <Layer>
          {[...Array(10)].map((_, i) => (
            <Circle
              key={i}
              x={Math.random() * (width-20) + 10}
              y={Math.random() * (height-20) + 10}
              opacity={0.8}
              draggable
              radius={8}
              fill='#cfe434'
              stroke='black'
              strokeWidth={1}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default World;