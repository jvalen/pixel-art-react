import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const UndoRedo = React.createClass({
  undo: function() {
    if (this.props.pastStatesCount > 1) {
      this.props.undo();
    }
  },
  redo: function() {
    this.props.redo();
  },
  render: function() {
    const styles = {
      undo: {
        width: '48%',
        float: 'left'
      },
      redo: {
        width: '48%',
        float: 'right'
      }
    };

    return <div className="self_clear">
          <button className="gray" style={styles.undo} onClick={this.undo}><span className="fa fa-undo"></span></button>
          <button className="gray" style={styles.redo} onClick={this.redo}><span className="fa fa-repeat"></span></button>
        </div>;
  }
});

function mapStateToProps(state) {
  return {
    pastStatesCount: state.past.length
  };
}
export const UndoRedoContainer = connect(
  mapStateToProps,
  actionCreators
)(UndoRedo);
