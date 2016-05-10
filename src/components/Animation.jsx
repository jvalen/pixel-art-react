import React from 'react';
import radium from 'radium';

export const Animation = radium((props) => {
  const pulseKeyframes = radium.keyframes(props.boxShadow, 'pulse');
  const style = {
    position: 'absolute',
    animation: `x ${props.duration}s infinite`,
    animationName: pulseKeyframes,
    // -webkit-animation-timing-function: 'linear',
    // animation-timing-function: 'linear'
    background: 'blue',
    height: '4px',
    margin: '0 auto'
  };
  return (
    <div className="animation-container" style={style} />
  );
});
