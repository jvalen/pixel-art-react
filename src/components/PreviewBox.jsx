import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Preview from './Preview';

const PreviewBox = props => {
  const [animate, setAnimate] = useState(false);
  const [normalSize, setNormalSize] = useState(true);
  const frames = useSelector(state => state.present.get('frames'));
  const duration = useSelector(state => state.present.get('duration'));
  const frameList = frames.get('list');
  const activeFrameIndex = frames.get('activeIndex');
  const columns = frames.get('columns');
  const rows = frames.get('rows');
  const { helpOn, callback } = props;
  const animMessage = `${animate ? 'Pause' : 'Play'} the animation`;
  const zoomMessage = `Zoom ${normalSize ? '0.5' : '1.5'}`;
  const animTooltip = helpOn ? animMessage : null;
  const zoomTooltip = helpOn ? zoomMessage : null;

  const toggleScreen = e => {
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
    setNormalSize(!normalSize);
  };

  return (
    <div className="box-container">
      <div className="buttons">
        <div data-tooltip={animTooltip}>
          <button
            type="button"
            className={animate ? 'pause' : 'play'}
            onClick={() => setAnimate(!animate)}
            aria-label="Animation control"
          />
        </div>
        <div data-tooltip={zoomTooltip}>
          <button
            type="button"
            className="screen-normal"
            aria-label="Zoom button"
            onClick={toggleScreen}
          />
        </div>
        <div data-tooltip={helpOn ? 'Show a preview of your project' : null}>
          <button
            type="button"
            className="frames"
            aria-label="Active modal"
            onClick={callback}
          />
        </div>
      </div>
      <div className="preview-container">
        <Preview
          frames={frameList}
          columns={columns}
          rows={rows}
          cellSize={normalSize ? 6 : 3}
          duration={duration}
          activeFrameIndex={activeFrameIndex}
          animate={animate}
        />
      </div>
    </div>
  );
};

export default PreviewBox;
