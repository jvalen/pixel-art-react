import React, { useState } from 'react';
import RadioSelector from './RadioSelector';
import Checkbox from './Checkbox';
import generateFramesOutput from '../utils/outputParse';

const UsefulData = props => {
  const [colorFormatId, setColorFormat] = useState(0);
  const [checkboxOddState, setCheckboxOdd] = useState(false);
  const [checkboxEvenState, setCheckboxEven] = useState(false);
  const { frames, columns } = props;
  const colorFormatOptions = [
    { value: 0, description: '#000000', labelFor: 'c-format-hcss', id: 0 },
    { value: 1, description: '0x000000', labelFor: 'c-format-hx', id: 1 },
    { value: 2, description: 'rgba(0,0,0,1)', labelFor: 'c-format-rgba', id: 2 }
  ];
  const changeColorFormat = value => {
    setColorFormat(value);
  };
  const generateUsefulDataOutput = (
    formatId,
    reverseOddRows,
    reverseEvenRows
  ) =>
    generateFramesOutput({
      frames,
      columns,
      options: {
        colorFormat: formatId,
        reverseOdd: reverseOddRows,
        reverseEven: reverseEvenRows
      }
    });
  return (
    <div className="load-drawing useful-data">
      <h2>Get additional data from your project</h2>
      <p>
        Here you will find every pixel color values grouped by frame. You can
        modify the output with the following options:
      </p>
      <fieldset className="useful-data__rows">
        <h5>Pixel color format</h5>
        <RadioSelector
          name="pixel-format"
          selected={colorFormatId}
          change={changeColorFormat}
          options={colorFormatOptions}
        />
        <h5>Change the order of the rows</h5>

        <Checkbox
          name="oddRows"
          labelFor="oddRows"
          description="Reverse Odd Rows"
          checked={checkboxOddState}
          onChange={() => {
            setCheckboxOdd(!checkboxOddState);
          }}
        />
        <Checkbox
          name="evenRows"
          labelFor="evenRows"
          description="Reverse Even Rows"
          checked={checkboxEvenState}
          onChange={() => {
            setCheckboxEven(!checkboxEvenState);
          }}
        />
      </fieldset>

      <pre className="useful-data__export">
        {`\n${generateUsefulDataOutput(
          colorFormatId,
          checkboxOddState,
          checkboxEvenState
        )}\n\n`}
      </pre>
    </div>
  );
};
export default UsefulData;
