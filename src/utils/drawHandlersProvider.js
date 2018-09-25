const fromEventToId = (ev, props) => {
  const [{
    radiusX, radiusY, clientX, clientY
  }] = ev.targetTouches;
  const {
    columns,
    grid,
    gridBoundaries: {
      x, y, width, height
    }
  } = props;
  const posX = Math.round(((clientX - x - radiusX) * columns) / width);
  const posY = Math.round(((clientY - y - radiusY) * columns) / height);
  const id = posX < 0 || posY < 0 ? null : posX + (columns * posY);
  return id !== null && id < grid.size ? id : null;
};

const getCellProps = (props, id) => ({
  id,
  color: props.grid.get(id)
});

const drawHandlersProvider = rootComponent => ({
  onMouseUp() {
    rootComponent.setState({
      dragging: false
    });
  },
  drawHandlersFactory(gridComponent) {
    return {
      onMouseDown(id, ev) {
        const { props } = gridComponent;
        const cellProps = getCellProps(props, id);
        ev.preventDefault();
        if (!rootComponent.state.dragging) props.drawCell(cellProps);
        rootComponent.setState({
          dragging: true
        });
      },
      onMouseOver(id, ev) {
        const { props } = gridComponent;
        const cellProps = getCellProps(props, id);
        ev.preventDefault();
        if (rootComponent.state.dragging) props.drawCell(cellProps);
      },
      onTouchMove(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        const id = fromEventToId(ev, props);
        const cellProps = getCellProps(props, id);
        if (id !== null && rootComponent.state.dragging) props.drawCell(cellProps);
      }
    };
  }
});

export default drawHandlersProvider;
