import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

const Duration = (props) => {
  const handleChange = (event) => {
    props.actions.setDuration(event.target.value);
  };
  return (
    <div className="duration">
      <label htmlFor="duration__input">
        Duration
      </label>
      <input
        type="number"
        value={props.duration}
        onChange={(event) => { handleChange(event); }}
        id="duration__input"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  duration: state.present.get('duration')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const DurationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Duration);
export default DurationContainer;
