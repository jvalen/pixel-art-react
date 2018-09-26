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

const getCellActionProps = ({ grid, drawingTool }, id) => ({
  id,
  color: grid.get(id),
  drawingTool
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
        const actionProps = getCellActionProps(props, id);
        ev.preventDefault();
        if (!rootComponent.state.dragging) props.drawCell(actionProps);
        rootComponent.setState({
          dragging: true
        });
      },
      onMouseOver(id, ev) {
        const { props } = gridComponent;
        const actionProps = getCellActionProps(props, id);
        ev.preventDefault();
        if (rootComponent.state.dragging) props.drawCell(actionProps);
      },
      onTouchMove(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        const id = fromEventToId(ev, props);
        const actionProps = getCellActionProps(props, id);
        if (id !== null && rootComponent.state.dragging) props.drawCell(actionProps);
      }
    };
  }
});

export default drawHandlersProvider;
