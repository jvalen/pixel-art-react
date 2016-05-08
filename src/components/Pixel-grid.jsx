import React from 'react';
import { PixelCellContainer } from './Pixel-cell';

export class Grid extends React.Component {
  getCells() {
    const { grid, columns, currentColor } = this.props;
    const width = 100 / columns;
    return grid.toJS().map((currentCell, i) => {
      return (
        <PixelCellContainer
          key={i}
          id={i}
          width={width}
          color={currentCell.color}
          currentColor={currentColor}
        />
      );
    });
  }

  render() {
    let customCursor = 'cell';

    if (this.props.eraserOn) {
      customCursor = 'context-menu';
    } else if (this.props.eyedropperOn) {
      customCursor = 'copy';
    }
    const style = {
      lineHeight: '0px',
      minHeight: '1px',
      margin: '0 auto',
      width: '80%',
      cursor: customCursor
    };

    return (
      <div className="grid-container" style={style}>
        {this.getCells()}
      </div>
    );
  }
}
