import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Eraser = React.createClass({
  getInitialState: function() {
    return {previousColor: null};
  },
  handleClick: function(event) {
    if (this.props.currentColor === null) {
      //Disable eraser
      this.props.setColorSelected(this.state.previousColor);
    } else {
      //Enable eraser
      this.setState({previousColor: this.props.currentColor});
      this.props.setEraser();
    }
  },
  getStyles: function (...args) {
    const styles = {
      eraserWrapper: {
        width: '70%',
        height: '50px',
        position: 'relative',
        //Transform style
        perspective: '1000px',
        WebkitPerspective: '1000px',
        MozPerspective: '1000px',
        OPerspective: '1000px',
        margin: '0 auto',
        marginBottom: '3em',
        display: 'table'
      },
      eraser: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        //Transform style
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        MozTransformStyle: 'preserve-3d',
        OTransformStyle: 'preserve-3d',
        transition: 'transform 1s',
        WebkitTransition: '-webkit-transform 1s',
        MozTransition: '-moz-transform 1s',
        OTransition: '-o-transform 1s',
        transform: 'translateZ( -150px ) rotateY( 0deg ) rotateX( 0deg )'
      },
      figure: {
        margin: '0',
        display: 'block',
        position: 'absolute',
        border: '1px solid #684747',
        fontSize: '1.2em',
        textAlign: 'center'
      },
      front:  {
        left: '20px', top: '18px', width: '100%', height: '100%',
        backgroundColor: '#C38282',
        transform: 'rotateX( 0deg ) translateZ( 18px )',
        paddingTop: '0.7em',
        color: '#7A5252'
      },
      back:   {
        left: '-18px', width: '100%', height: '100%',
        backgroundColor: '#C38282',
        transform: 'rotateX( 180deg ) translateY( -18px ) translateZ( 17px )' },
      right:  {
        right: '208px', width: '56px', height: '100%',
        backgroundColor: '#C38282',
        transform: 'rotateX( 0deg ) rotateY( 140deg ) translateY( 18px ) translateX( -180px ) translateZ( 150px )' },
      left:   {
        left: '-260px', width: '56px', height: '100%',
        backgroundColor: '#C38282',
        transform: 'rotateX( 0deg ) rotateY( 140deg ) translateY( 18px ) translateX( -180px ) translateZ( 150px )' },
      top:    {
        top: '50px', width: '100%', height: '36px',
        backgroundColor: '#C38282',
        transform: 'rotateX( 90deg ) translateZ( 50px ) skew(50deg, 0deg)'
      },
      bottom: {
        top: '20px', width: '100%', height: '36px',
        backgroundColor: '#C38282',
        transform: 'rotateX( -90deg ) translateZ( 29px ) skew(-50deg, 0deg)'
      },
      square: {
        width: '30%',
        height: '100%',
        backgroundColor: 'red'
      }
    },
    erarerId = null;

    if (this.props.currentColor === erarerId) {
      styles.eraser.transform = 'translateZ( -50px ) rotateY( 26deg ) rotateX( 56deg )';

      styles.front.backgroundColor = '#975C5C';
      styles.back.backgroundColor = '#975C5C';
      styles.right.backgroundColor = '#975C5C';
      styles.left.backgroundColor = '#975C5C';
      styles.top.backgroundColor = '#975C5C';
      styles.bottom.backgroundColor = '#975C5C';

      styles.figure.border = '1px solid white';
      styles.figure.color = 'white';
    }

    return args.reduce((accumulator, current, index) => {
      return Object.assign(accumulator, styles[current]);
    }, {});
  },
  render: function() {
    return (
      <div className="eraserWrapper self_clear" style={this.getStyles('eraserWrapper')}>
        <div className="eraser" onClick={this.handleClick} style={this.getStyles('eraser')}>
          <figure className="figure front" style={this.getStyles('front', 'figure')}>Eraser</figure>
          <figure className="figure back" style={this.getStyles('back', 'figure')}></figure>
          <figure className="figure right" style={this.getStyles('right', 'figure')}></figure>
          <figure className="figure left" style={this.getStyles('left', 'figure')}></figure>
          <figure className="figure top" style={this.getStyles('top', 'figure')}></figure>
          <figure className="figure bottom" style={this.getStyles('bottom', 'figure')}></figure>
        </div>
      </div>);
  }
});

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor')
  };
}
export const EraserContainer = connect(
  mapStateToProps,
  actionCreators
)(Eraser);
