import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import Picker from 'react-color';

export class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      background: '#ffffff'
    };
  }

  handleClick() {
    this.props.setColorPicker();
    if (!this.state.displayColorPicker) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  }

  handleChange(color) {
    this.setState({ background: color.hex });
    this.props.setCustomColor(`#${color.hex}`);
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  render() {
    /* Necessary inline styles for react-color component */
    const styles = {
      picker: {
        position: 'relative',
        bottom: '9em'
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

    const isSelected = this.props.colorPickerOn && this.state.displayColorPicker;

    return (
      <div className={`color-picker${isSelected ? ' selected' : ''}`}>
        <div
          className="color-picker__button"
          onClick={() => { this.handleClick(); }}
        >
        </div>
        <div style={styles.picker}>
            {this.state.displayColorPicker ?
              <div style={styles.popover} is="popover">
                <div style={styles.cover} is="cover" onClick={() => { this.handleClose(); }} />
                <Picker
                  color={this.state.background}
                  onChange={(color) => { this.handleChange(color); }}
                  onClose={() => { this.handleClose(); }}
                  type="sketch"
                />
              </div>
              : null
             }
        </div>
      </div>
    );
  }
}

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
