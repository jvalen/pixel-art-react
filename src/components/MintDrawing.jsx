import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import { useEthContext } from '../contexts/ethContext';
import * as actionCreators from '../store/actions/actionCreators';
import Grid from '../utils/grid';

const MintDrawing = props => {
  const { mintFn } = useEthContext();

  const mint = () => {
    const drawingToMint = {
      activeFrame: props.activeFrame,
      frames: props.frames,
      paletteGridData: props.paletteGridData,
      cellSize: props.cellSize,
      columns: props.columns,
      rows: props.rows,
      animate: props.frames.size > 1,
      id: shortid.generate()
    };

    const grid = new Grid(drawingToMint.activeFrame, drawingToMint.columns);
    mintFn(grid.toGridArray())
      .then(function(result) {
        if (result) {
          props.actions.sendNotification('Drawing minted');
        } else {
          props.actions.sendNotification('Error minting');
        }
      })
      .catch(function(err) {
        props.actions.sendNotification('Error minting');
        console.log('Error minting:', err);
      });
  };

  return (
    <div className="mint-drawing">
      <button type="button" onClick={mint}>
        MINT
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    frames: frames.get('list'),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    paletteGridData: state.present.getIn(['palette', 'grid'])
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const MintDrawingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MintDrawing);
export default MintDrawingContainer;
