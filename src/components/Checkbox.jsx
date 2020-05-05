import React from 'react';

const Checkbox = ({ name, labelFor, checked, description, onChange }) => (
  <div className="checkbox">
    <label htmlFor={`${name}-${labelFor}`}>
      <input
        type="checkbox"
        checked={checked}
        name={labelFor}
        id={`${name}-${labelFor}`}
        onChange={onChange}
      />
      <span>{`[${checked ? 'X' : ' '}] ${description}`}</span>
    </label>
  </div>
);

export default Checkbox;
