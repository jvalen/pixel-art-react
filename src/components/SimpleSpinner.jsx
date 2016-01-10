import React from 'react';

export const SimpleSpinner = React.createClass({
  show: function() {
    console.log("show spinner");
  },
  hide: function() {
    console.log("hide spinner");
  },
  render: function() {
    var spin = {
      height: '60px',
      width: '60px',
      margin: '94px auto 0 auto',
      position: 'relative',
      WebkitAnimation: 'spin-rotation .6s infinite linear',
      MozAnimation: 'spin-rotation .6s infinite linear',
      OAnimation: 'spin-rotation .6s infinite linear',
      animation: 'spin-rotation .6s infinite linear',
      borderLeft: '6px solid rgba(0, 174, 239, .15)',
      borderRight: '6px solid rgba(0, 174, 239, .15)',
      borderBottom: '6px solid rgba(0, 174, 239, .15)',
      borderTop: '6px solid rgba(0, 174, 239, .8)',
      borderRadius: '100%'
    };

    return(
      <div>
        <div className="simple-spinner" style={this.props.spin ? spin : {}}></div>
      </div>
      );
  }
});
