const drawHandlersProvider = component => ({
  onMouseUp() {
    component.setState({
      dragging: false
    });
  },
  drawHandlersFactory(update) {
    return {
      onMouseDown(id, ev) {
        ev.preventDefault();
        if (!component.state.dragging) update(id);
        component.setState({
          dragging: true
        });
      },
      onMouseOver(id, ev) {
        ev.preventDefault();
        if (component.state.dragging) update(id);
      },
      onTouchMove(id, ev) {
        ev.preventDefault();
        if (id !== null && component.state.dragging) update(id);
      }
    };
  }
});


export default drawHandlersProvider;
