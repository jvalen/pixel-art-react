import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

const NewProject = props => {
  const newProject = () => {
    props.actions.newProject();
  };

  return (
    <div className="new-project">
      <button
        type="button"
        onClick={() => {
          newProject();
        }}
      >
        NEW
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const NewProjectContainer = connect(
  null,
  mapDispatchToProps
)(NewProject);
export default NewProjectContainer;
