import React from 'react';

const SimpleSpinner = (props) =>
  <div className={`simple-spinner${props.spin ? ' display' : ''}`}>
    <div className="circle"></div>
  </div>
;
export default SimpleSpinner;
