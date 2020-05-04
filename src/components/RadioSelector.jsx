import React from 'react';

const RadioSelector = ({ name, selected, legend, options, change }) => {
  const availableOptions = ops =>
    ops.map(item => (
      <label htmlFor={`${name}-${item.labelFor}`} key={item.id}>
        <input
          type="radio"
          value={item.value}
          name={item.labelFor}
          id={`${name}-${item.labelFor}`}
          onChange={() => {
            change(item.value, name);
          }}
          checked={selected === item.value}
        />
        <span>{item.description}</span>
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
