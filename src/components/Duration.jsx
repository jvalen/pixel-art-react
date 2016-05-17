import React from 'react';

export const Duration = (props) => {
  const handleChange = (event) => {
    props.setDuration(event.target.value);
  };

  const styles = {
    wrapper: {
      textAlign: 'center',
    },
    label: {
      textAlign: 'center',
      marginBottom: '0.3em',
      color: '#BBBBBB',
      position: 'relative'
    }
  };

  return (
    <div style={styles.wrapper}>
      <label className="duration-label" style={styles.label}>Duration</label>
      <input
        type="text"
        value={props.duration}
        onChange={(event) => { handleChange(event); }}
      />
    </div>
  );
};

export default Duration;
