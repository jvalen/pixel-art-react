import React from 'react';

export const SimpleSpinner = React.createClass({
  show: function() {
    console.log("show spinner");
  },
  hide: function() {
    console.log("hide spinner");
  },
  render: function() {
    let styles = {
      wrapper: {
        position: 'absolute',
        zIndex: '1',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: this.props.spin ? 'block' : 'none',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: '0.4',
        top: 0
      },
      spin: {
        height: '60px',
        width: '60px',
        margin: '94px auto 0 auto',
        position: 'fixed',
        WebkitAnimation: 'spin-rotation .6s infinite linear',
        MozAnimation: 'spin-rotation .6s infinite linear',
        OAnimation: 'spin-rotation .6s infinite linear',
        animation: 'spin-rotation .6s infinite linear',
        borderLeft: '6px solid rgba(239, 149, 50, 0.35)',
        borderRight: '6px solid rgba(239, 149, 50, 0.35)',
        borderBottom: '6px solid rgba(239, 149, 50, 0.35)',
        borderTop: '6px solid rgba(219, 109, 26, 1)',
        borderRadius: '100%',
        top: '50%',
        left: '50%',
        marginTop: '-60px',
        marginLeft: '-60px'
      }
    };

    return(
      <div className="simple-spinner-wrapper" style={styles.wrapper}>
        <div className="simple-spinner" style={styles.spin}></div>
      </div>
      );
  }
});
