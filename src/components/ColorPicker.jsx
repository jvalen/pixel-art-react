import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Picker from  'react-color';

export const ColorPicker = React.createClass({
  getInitialState: function() {
    return {
      displayColorPicker: false,
      background: '#fff'
    };
  },
  handleClick: function(event) {
    this.props.setColorPicker();
    if (!this.state.displayColorPicker) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  },
  handleChange(color) {
    this.setState({ background: color.hex });
    this.props.setCustomColor(color.hex);
  },
  handleClose() {
    this.setState({ displayColorPicker: false });
  },
  render: function() {
    let styles = {
      button: {
        border: '2px solid #313131',
        backgroundColor: '#585858'
      },
      picker: {
        position: 'relative',
        bottom: '18.4em'
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
        right: -250,
        top: 155
      },
      cover: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };

    if (this.props.colorPickerOn && this.state.displayColorPicker) {
      styles.button.color = '#BBBBBB';
      styles.button.border = '2px solid #BBBBBB';
    }

    return (
      <div>
        <div className="fa fa-paint-brush"
          onClick={this.handleClick}
          style={styles.button}>
        </div>
        <div style={styles.picker}>
            {this.state.displayColorPicker ?
              <div style={styles.popover} is="popover">
                <div style={styles.cover} is="cover" onClick={this.handleClose} />
                <Picker
                  color={this.state.background}
                  onChange={this.handleChange}
                  onClose={this.handleClose}
                  type="sketch"
                />
              </div>
              : null
             }
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    currentColor: state.present.get('currentColor'),
    colorPickerOn: state.present.get('colorPickerOn')
  };
}
export const ColorPickerContainer = connect(
  mapStateToProps,
  actionCreators
)(ColorPicker);
