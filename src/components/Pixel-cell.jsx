import React from 'react';

export default React.createClass({
  render: function() {
    const { padding, color, width } = this.props;

    const styles = {
      cellWrapper: {
        display: "inline-block",
        width: `${width}%`,
        boxSizing: "border-box",
        padding: padding + 'em'
      },
      cell: {
        backgroundColor: color,
        color: 'white',
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
      }
    };

    return <div className="cellWrapper" style={styles.cellWrapper}>
        <div className="cell" style={styles.cell}></div>
      </div>;
  }
});
