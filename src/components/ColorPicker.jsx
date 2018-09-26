import React from 'react';
import { connect } from 'react-redux';
import Picker from 'react-color';
import { switchTool, setCustomColor } from '../store/actions/actionCreators';
import { COLOR_PICKER } from '../store/reducers/drawingToolStates';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.switchColorPicker();
    if (!this.state.displayColorPicker) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
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
    const { props } = this;
    const isSelected = props.colorPickerOn && this.state.displayColorPicker;
    const currentColor = props.currentColor.get('color');
    const initialPickerColor = currentColor || '#ffffff';

    return (
      <div className="color-picker">
        <button
          className={`color-picker__button${isSelected ? ' selected' : ''}`}
          onClick={this.handleClick}
        />
        <div style={styles.picker}>
          {this.state.displayColorPicker ?
            <div style={styles.popover} is="popover">
              <div
                style={styles.cover}
                is="cover"
                onClick={() => { this.handleClose(); }}
                role="presentation"
              />
              <Picker
                color={initialPickerColor}
                onChangeComplete={props.setCustomColor}
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

const mapStateToProps = state => ({
  colorPickerOn: state.present.get('drawingTool') === COLOR_PICKER,
  currentColor: state.present.getIn(['palette', 'currentColor'])
});

const switchColorPickerAction = switchTool(COLOR_PICKER);
const mapDispatchToProps = dispatch => ({
  switchColorPicker: () => dispatch(switchColorPickerAction),
  setCustomColor: color => dispatch(setCustomColor(color.hex))
});

const ColorPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPicker);
export default ColorPickerContainer;
