const fromPositionToId = (posX, posY, grid, columns) => {
  const id = posX + columns * posY;
  return id < grid.size && posX >= 0 && posX < columns && posY >= 0 ? id : null;
};

const fromEventToId = (ev, props) => {
  const [{ radiusX, radiusY, clientX, clientY }] = ev.targetTouches;
  const {
    columns,
    grid,
    gridBoundaries: { x, y, width, height }
  } = props;
  const posX = Math.round(((clientX - x - radiusX) * columns) / width);
  const posY = Math.round(((clientY - y - radiusY) * columns) / height);
  return fromPositionToId(posX, posY, grid, columns);
};

const getCellActionProps = (props, id) =>
  Object.assign(
    {
      color: props.grid.get(id),
      id
    },
    props
  );

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
        const actionProps = getCellActionProps(props, id);
        ev.preventDefault();
        if (!rootComponent.state.dragging) props.cellAction(actionProps);
        rootComponent.setState({
          dragging: true
        });
      },
      onMouseOver(id, ev) {
        const { props } = gridComponent;
        const actionProps = getCellActionProps(props, id);
        ev.preventDefault();
        if (rootComponent.state.dragging) props.cellAction(actionProps);
      },
      onTouchMove(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        const id = fromEventToId(ev, props);
        const actionProps = getCellActionProps(props, id);
        if (id !== null && rootComponent.state.dragging)
          props.cellAction(actionProps);
      }
    };
  }
});

export default drawHandlersProvider;
