const fromPositionToId = (posX, posY, grid, columns) => {
  const id = posX + (columns * posY);
  return id < grid.size && posX >= 0 && posX < columns && posY >= 0 ? id : null;
};

const fromEventToId = (ev, props) => {
  const [{
    radiusX, radiusY, clientX, clientY
  }] = ev.targetTouches;
  const {
    columns,
    activeFrame,
    gridBoundaries: {
      x, y, width, height
    }
  } = props;
  const posX = Math.round(((clientX - x - radiusX) * columns) / width);
  const posY = Math.round(((clientY - y - radiusY) * columns) / height);
  return fromPositionToId(posX, posY, activeFrame.get('grid'), columns);
};

const drawHandlersProvider = rootComponent => ({
  onMouseUp() {
    rootComponent.setState({
      dragging: false
    });
  },
  drawHandlersFactory(gridComponent) {
    return {
      onMouseDown(id, ev) {
        ev.preventDefault();
        if (!rootComponent.state.dragging) gridComponent.props.drawCell(id);
        rootComponent.setState({
          dragging: true
        });
      },
      onMouseOver(id, ev) {
        ev.preventDefault();
        if (rootComponent.state.dragging) gridComponent.props.drawCell(id);
      },
      onTouchMove(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        const id = fromEventToId(ev, props);
        if (id !== null && rootComponent.state.dragging) props.drawCell(id);
      }
    };
  }
});

export default drawHandlersProvider;
