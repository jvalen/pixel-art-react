import React from 'react';

export const SimpleSpinner = (props) =>
  <div className={`simple-spinner${props.spin ? ' display' : ''}`}>
    <div className="circle"></div>
  </div>
;
