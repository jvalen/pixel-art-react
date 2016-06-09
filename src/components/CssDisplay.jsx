import React from 'react';
import { connect } from 'react-redux';
import { generatePixelDrawCss } from '../utils/cssParse';

class CssDisplay extends React.Component {
  generateCss() {
    const { activeFrame, columns, rows, cellSize } = this.props;
    let cssString = generatePixelDrawCss(
      activeFrame, columns, rows, cellSize, 'string'
    );

    if (!!cssString) {
      cssString = `box-shadow: ${cssString}; `;
      cssString += `height: ${cellSize}px; width: ${cellSize}px;`;
    }

    return <div>{cssString}</div>;
  }

  render() {
    return (
      <div className="css-display">
      {this.generateCss()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const frames = state.present.get('frames');
  const activeFrameIndex = state.present.get('activeFrameIndex');
  return {
    activeFrame: frames.get(activeFrameIndex),
    columns: state.present.get('columns'),
    rows: state.present.get('rows'),
    cellSize: state.present.get('cellSize')
  };
}

const CssDisplayContainer = connect(
  mapStateToProps
)(CssDisplay);
export default CssDisplayContainer;
