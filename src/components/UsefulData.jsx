import React, { useState } from 'react';
import RadioSelector from './RadioSelector';
import generateFramesOutput from '../utils/outputParse';

const UsefulData = props => {
  const [colorFormatId, setColorFormat] = useState(0);
  const { frames, columns } = props;
  const colorFormatOptions = [
    { value: 0, description: '#000000', labelFor: 'c-format-hcss', id: 0 },
    { value: 1, description: '0x000000', labelFor: 'c-format-hx', id: 1 },
    { value: 2, description: 'rgba(0,0,0,1)', labelFor: 'c-format-rgba', id: 2 }
  ];
  const changeColorFormat = value => {
    setColorFormat(value);
  };
  const generateUsefulDataOutput = formatId =>
    generateFramesOutput({
      frames,
      columns,
      options: {
        colorFormat: formatId,
        invertOdd: false,
        invertEven: false
      }
    });
  return (
    <div className="load-drawing">
      <h2>Get additional data from your project</h2>
      <h5>1. Each frame hexadecimal values</h5>
      <p>
        Here you have each pixel grid by frame in hex values. This could be
        handy for your C/Arduino projects.
      </p>
      <h5>Pixel color format</h5>
      <RadioSelector
        name="pixel-format"
        selected={colorFormatId}
        change={changeColorFormat}
        options={colorFormatOptions}
      />
      <pre className="load-drawing__export">
        {`\n${generateUsefulDataOutput(colorFormatId)}\n\n`}
      </pre>
    </div>
  );
};
export default UsefulData;
