import React from 'react';

export default React.createClass({
  handleClick: function(event) {
    this.setState({currentColor: this.props.color});
  },
  render: function() {
    const { width, color } = this.props;
    let cellColor = color;

    const styles = {
      cellWrapper: {
        display: "inline-block",
        width: `${width}%`,
        padding: "0.1em"
      },
      cell: {
        backgroundColor: '#' + cellColor,
        color: 'white',
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
      }
    };

    return <div className="cellWrapper" style={styles.cellWrapper}>
        <div className="cell" onClick={this.handleClick} style={styles.cell}></div>
      </div>;
  }
});
