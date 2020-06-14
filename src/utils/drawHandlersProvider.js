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

const getCellActionProps = (props, id) => ({
  color: props.grid.get(id),
  id,
  ...props
});

const getCellCoordinates = (id, columnsCount) => {
  const y = Math.trunc(Math.abs(id / columnsCount));
  const x = id - columnsCount * y;
  return { x: x + 1, y: y + 1 };
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
        const { props } = gridComponent;
        if (props.drawingTool !== 'MOVE') {
          const actionProps = getCellActionProps(props, id);
          if (!rootComponent.state.dragging) props.cellAction(actionProps);
          rootComponent.setState({
            dragging: true
          });
        }
      },
      onMouseOver(id, ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        props.hoveredCell(getCellCoordinates(id, props.columns));
        if (props.drawingTool !== 'MOVE') {
          const actionProps = getCellActionProps(props, id);
          if (rootComponent.state.dragging) props.cellAction(actionProps);
        }
      },
      onTouchMove(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        if (props.drawingTool !== 'MOVE') {
          const id = fromEventToId(ev, props);
          const actionProps = getCellActionProps(props, id);
          if (id !== null && rootComponent.state.dragging) {
            props.cellAction(actionProps);
          }
        }
      },
      onMoveTouchMove(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        if (props.drawingTool === 'MOVE') {
          const { draggingCoord } = rootComponent.state;
          const { dragging } = rootComponent.state;
          const touch = ev.touches[0];
          const { pageX, pageY } = touch;
          const xDiff = draggingCoord ? pageX - draggingCoord.clientX : 0;
          const yDiff = draggingCoord ? pageY - draggingCoord.clientY : 0;
          const cellWidth = ev.target.clientWidth;
          if (
            dragging &&
            (Math.abs(xDiff) > cellWidth || Math.abs(yDiff) > cellWidth)
          ) {
            rootComponent.setState({
              draggingCoord: { clientX: pageX, clientY: pageY }
            });
            props.applyMove({ xDiff, yDiff, cellWidth });
          }
        }
      },
      onMoveMouseOver(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        if (props.drawingTool === 'MOVE') {
          const { draggingCoord } = rootComponent.state;
          const { dragging } = rootComponent.state;
          const { clientX, clientY } = ev;
          const xDiff = draggingCoord ? clientX - draggingCoord.clientX : 0;
          const yDiff = draggingCoord ? clientY - draggingCoord.clientY : 0;
          const cellWidth = ev.target.clientWidth;
          if (
            dragging &&
            (Math.abs(xDiff) > cellWidth || Math.abs(yDiff) > cellWidth)
          ) {
            rootComponent.setState({
              draggingCoord: { clientX, clientY }
            });
            props.applyMove({ xDiff, yDiff, cellWidth });
          }
        }
      },
      onMoveMouseDown(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        if (props.drawingTool === 'MOVE') {
          const { clientX, clientY } = ev;
          rootComponent.setState({
            dragging: true,
            draggingCoord: { clientX, clientY }
          });
        }
      },
      onMoveTouchStart(ev) {
        ev.preventDefault();
        const { props } = gridComponent;
        if (props.drawingTool === 'MOVE') {
          const touch = ev.touches[0];
          const { pageX, pageY } = touch;
          rootComponent.setState({
            dragging: true,
            draggingCoord: { clientX: pageX, clientY: pageY }
          });
        }
      }
    };
  }
});

export default drawHandlersProvider;
