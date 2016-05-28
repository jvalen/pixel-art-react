import React from 'react';
import { generatePixelDrawCss } from '../utils/helpers';

export class CssDisplay extends React.Component {
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
