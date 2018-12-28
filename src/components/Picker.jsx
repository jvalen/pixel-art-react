import React from 'react';

const Picker = ({ type, value, action }) => (
  <div className="picker">
    <label className={`picker__${type}`} htmlFor={`picker__${type}`}>
      <div className="picker__container" id={`picker__${type}`}>
        <div className="picker__value">{value}</div>
        <div className="picker__buttons">
          <button
            onClick={() => {
              action(type, 1);
            }}
            className="button-add"
            id={`picker__add-${type}`}
          >
            +
          </button>
          <button
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

export default Picker;
