import React from 'react';
import { connect } from 'react-redux';
import Picker from 'react-color';
import { switchTool, setCustomColor } from '../store/actions/actionCreators';
import { COLOR_PICKER, PENCIL } from '../store/reducers/drawingToolStates';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    const { switchColorPicker } = this.props;
    const { displayColorPicker } = this.state;
    switchColorPicker();
    if (!displayColorPicker) {
      this.setState({ displayColorPicker: !displayColorPicker });
    }
  }

  handleClose() {
    const { setPencilTool } = this.props;
    this.setState({ displayColorPicker: false });
    setPencilTool();
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
    const { props, state } = this;
    const { colorPickerOn, paletteColor } = props;
    const { displayColorPicker } = state;
    const isSelected = colorPickerOn && displayColorPicker;
    const initialPickerColor = paletteColor || '#ffffff';

    return (
      <div className="color-picker">
        <button
          type="button"
          className={`color-picker__button${isSelected ? ' selected' : ''}`}
          onClick={this.handleClick}
        />
        <div style={styles.picker}>
          {displayColorPicker ? (
            <div style={styles.popover} is="popover">
              <div
                style={styles.cover}
                is="cover"
                onClick={this.handleClose}
                role="presentation"
              />
              <Picker
                color={initialPickerColor}
                onChangeComplete={props.setCustomColor}
                onClose={this.handleClose}
                type="sketch"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const palette = state.present.get('palette');
  return {
    colorPickerOn: state.present.get('drawingTool') === COLOR_PICKER,
    paletteColor: palette.getIn(['grid', palette.get('position'), 'color'])
  };
};

const switchColorPickerAction = switchTool(COLOR_PICKER);
const setPencilToolAction = switchTool(PENCIL);
const mapDispatchToProps = dispatch => ({
  switchColorPicker: () => dispatch(switchColorPickerAction),
  setCustomColor: color => dispatch(setCustomColor(color.hex)),
  setPencilTool: () => dispatch(setPencilToolAction)
});

const ColorPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPicker);
export default ColorPickerContainer;
