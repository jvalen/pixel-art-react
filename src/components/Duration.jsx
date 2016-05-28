import React from 'react';

export const Duration = (props) => {
  const handleChange = (event) => {
    props.setDuration(event.target.value);
  };
  return (
    <div className="duration">
      <label>Duration</label>
      <input
        type="text"
        value={props.duration}
        onChange={(event) => { handleChange(event); }}
      />
    </div>
  );
};

export default Duration;
