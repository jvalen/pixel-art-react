import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import Preview from './Preview';

class PreviewC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      normalSize: true
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleScreen = this.toggleScreen.bind(this);
  }

  togglePlay(e) {
    const { animate } = this.state;
    if (!animate) {
      e.target.classList.remove('play');
      e.target.classList.add('pause');
    } else {
      e.target.classList.remove('pause');
      e.target.classList.add('play');
    }
    this.setState({
      animate: !animate
    });
  }

  toggleScreen(e) {
    const { normalSize } = this.state;
    const box = document.querySelector('.box-container');
    const preview = document.querySelector('.preview-container');

    if (normalSize) {
      e.target.classList.remove('screen-normal');
      e.target.classList.add('screen-full');
      box.style.height = `${box.offsetHeight}px`;
      preview.style.height = `${preview.offsetHeight}px`;
    } else {
      e.target.classList.remove('screen-full');
      e.target.classList.add('screen-normal');
      box.style.height = '';
      preview.style.height = '';
    }
    this.setState({
      normalSize: !normalSize
    });
  }

  render() {
    const { helpOn } = this.props;
    const props = Object.assign(this.props);
    const { animate, normalSize } = this.state;
    let animTooltip = null;
    let zoomTooltip = null;
    if (helpOn) {
      if (animate) animTooltip = 'Pause the animation';
      else animTooltip = 'Play the animation';
      if (normalSize) zoomTooltip = 'Zoom 0.5';
      else zoomTooltip = 'Zoom 1.0';
    }

    return (
      <div className="box-container">
        <div className="buttons">
          <div data-tooltip={animTooltip}>
            <button
              type="button"
              className="play"
              onClick={this.togglePlay}
              aria-label="Animation control"
            />
          </div>
          <div data-tooltip={zoomTooltip}>
            <button
              type="button"
              className="screen-normal"
              aria-label="Zoom button"
              onClick={this.toggleScreen}
            />
          </div>
          <div data-tooltip={helpOn ? 'Show a preview of your project' : null}>
            <button
              type="button"
              className="frames"
              aria-label="Active modal"
              onClick={props.callback}
            />
          </div>
        </div>
        <div className="preview-container">
          <Preview
            key="1"
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={normalSize ? 6 : 3}
            duration={props.duration}
            activeFrameIndex={props.activeFrameIndex}
            animate={animate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    frames: frames.get('list'),
    activeFrameIndex,
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    paletteGridData: state.present.getIn(['palette', 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    duration: state.present.get('duration')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const PreviewBox = connect(mapStateToProps, mapDispatchToProps)(PreviewC);
export default PreviewBox;
