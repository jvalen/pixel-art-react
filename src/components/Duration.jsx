import React from 'react';

export const Duration = (props) => {
  const handleChange = (event) => {
    props.setDuration(event.target.value);
  };
  return (
    <div className="duration">
      <label htmlFor="duration__input">
        Duration
      </label>
      <input
        type="text"
        value={props.duration}
        onChange={(event) => { handleChange(event); }}
        id="duration__input"
      />
    </div>
  );
};

export default Duration;
