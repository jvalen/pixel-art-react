import React from 'react';
import radium from 'radium';

const Animation = radium(props => {
  const pulseKeyframes = radium.keyframes(props.boxShadow, 'pulse');
  const style = {
    position: 'absolute',
    animation: `x ${props.duration}s infinite`,
    animationName: pulseKeyframes,
    left: '-5px',
    top: '-5px'
  };
  return <div className="animation-container" style={style} />;
});

export default Animation;
