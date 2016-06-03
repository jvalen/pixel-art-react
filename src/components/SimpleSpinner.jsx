import React from 'react';

export const SimpleSpinner = (props) => {
  return (
    <div className={`simple-spinner${props.spin ? ' display' : ''}`}>
      <div className="circle"></div>
    </div>
  );
};
