import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

class Eyedropper extends React.Component {
  handleClick() {
    this.props.actions.setEyedropper();
  }
  render() {
    return (
      <div
        className={`eyedropper${this.props.eyedropperOn ? ' selected' : ''}`}
        onClick={() => { this.handleClick(); }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  eyedropperOn: state.present.get('eyedropperOn'),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export const EyedropperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eyedropper);
export default EyedropperContainer;
