import React, { useState } from 'react';
import RadioSelector from './RadioSelector';
import Checkbox from './Checkbox';
import Output from './Output';
import generateFramesOutput from '../utils/outputParse';

const UsefulData = props => {
  const [colorFormatId, setColorFormat] = useState(0);
  const [checkboxOddState, setCheckboxOdd] = useState(false);
  const [checkboxEvenState, setCheckboxEven] = useState(false);
  const { frames, columns } = props;
  const colorFormatOptions = [
    {
      value: 0,
      description: '#000000',
      labelFor: 'c-format-hcss',
      id: 0
    },
    { value: 1, description: '0x000000', labelFor: 'c-format-hx', id: 1 },
    {
      value: 2,
      description: 'rgba(0,0,0,1)',
      labelFor: 'c-format-rgba',
      id: 2
    }
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
      <div className="useful-data__options">
        <fieldset className="useful-data__rows">
          <div className="useful-data__pixel-format">
            <h5>Pixel color format</h5>
            <RadioSelector
              name="pixel-format"
              selected={colorFormatId}
              change={changeColorFormat}
              options={colorFormatOptions}
            />
          </div>
          <div className="useful-data__reverse-rows">
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
          </div>
        </fieldset>
        <div className="useful-data__output">
          <Output
            copyClipboardData={{
              showButton: true,
              textButton: 'Copy',
              successMessage: 'Copied!'
            }}
            preFormatted="true"
            outputText={`${generateUsefulDataOutput(
              colorFormatId,
              checkboxOddState,
              checkboxEvenState
            )}\n\n`}
          />
        </div>
      </div>
    </div>
  );
};
export default UsefulData;
