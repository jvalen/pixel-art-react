import React from 'react';

const RadioSelector = ({ name, selected, legend, options, change }) => {
  const availableOptions = ops =>
    ops.map(item => (
      <label htmlFor={`${name}-${item.label}`} key={item.id}>
        <input
          type="radio"
          value={item.value}
          name={item.label}
          id={`${name}-${item.label}`}
          onChange={() => {
            change(item.value, name);
          }}
          checked={selected === item.value}
        />
        <span>{item.label}</span>
      </label>
    ));

  return (
    <fieldset className="radio-selector">
      {legend ? <legend>{legend}</legend> : null}
      {availableOptions(options)}
    </fieldset>
  );
};

export default RadioSelector;
