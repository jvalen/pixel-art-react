import React from 'react';
import { List } from 'immutable';
import { Draggable } from 'react-beautiful-dnd';
import Preview from './Preview';

export default class Frame extends React.Component {
  handleClick() {
    this.props.actions.changeActiveFrame(this.props.dataId);
  }

  deleteFrame(e) {
    e.stopPropagation();
    if (this.props.active) {
      this.props.actions.deleteFrame(this.props.dataId);
    }
  }

  duplicateFrame(e) {
    e.stopPropagation();
    if (this.props.active) {
      this.props.actions.duplicateFrame(this.props.dataId);
    }
  }

  changeInterval(e) {
    e.stopPropagation();
    if (this.props.active) {
      this.props.actions.changeFrameInterval(
        this.props.dataId,
        this.percentage.value
      );
    }
  }

  render() {
    return (
      <Draggable
        key={this.props.dataId}
        draggableId={this.props.dataId}
        index={this.props.dataId}
      >
        {provided => (
          <div
            className={`frame${this.props.active ? ' active' : ''}`}
            onClick={() => {
              this.handleClick();
            }}
            onKeyPress={() => {
              this.handleClick();
            }}
            role="button"
            tabIndex={0}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Preview
              frames={List([this.props.frame])}
              columns={this.props.columns}
              rows={this.props.rows}
              cellSize={2}
              activeFrameIndex={0}
            />
            <button
              className="delete"
              onClick={event => {
                this.deleteFrame(event);
              }}
            />
            <button
              className="duplicate"
              onClick={event => {
                this.duplicateFrame(event);
              }}
            />
            <input
              type="number"
              value={this.props.frame.get('interval')}
              onChange={event => {
                this.changeInterval(event);
              }}
              className="frame__percentage"
              ref={c => {
                this.percentage = c;
              }}
              disabled={this.props.lastFrame || !this.props.active}
            />
          </div>
        )}
      </Draggable>
    );
  }
}
