import React from 'react';

const Picker = ({ type, value, action }) => {
  const pickerType = `picker__${type}`;
  return (
    <div className="picker">
      <label className={pickerType} htmlFor={pickerType}>
        <div className="picker__container" id={pickerType}>
          <div className="picker__value">{value}</div>
          <div className="picker__buttons">
            <button
              type="button"
              onClick={() => {
                action(type, 1);
              }}
              className="button-add"
              id={`picker__add-${type}`}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                action(type, -1);
              }}
              className="button-remove"
              id={`picker__remove-${type}`}
            >
              -
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Picker;
