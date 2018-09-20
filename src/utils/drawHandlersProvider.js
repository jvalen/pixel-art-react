const drawHandlersProvider = component => ({
  onMouseUp(ev) {
    ev.preventDefault();
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
        /*
          TODO: It should draw the every cell we are moving over
          like is done in handleMouseOver. But is not working due
          to the nature of the touch events.

          The target element in a touch event is always the one
          when the touch started, not the element under the cursor
          (like the mouse event behaviour)
        */
        ev.preventDefault();
        if (component.state.dragging) update(id);
      }
    };
  }
});


export default drawHandlersProvider;
