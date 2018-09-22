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
  const id = posX < 0 || posY < 0 ? null : posX + (columns * posY);
  return id !== null && id < activeFrame.get('grid').size ? id : null;
};

const drawHandlersProvider = rootComponent => ({
  onMouseUp(ev) {
    ev.preventDefault();
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
