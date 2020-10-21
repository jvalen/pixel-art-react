import React from 'react';
import style from 'styled-components';

const Title = style.h2`
    font-size: 1.6em;
    margin-top: 1em;
    top: 0;
    `;

const Category = style.h3`
    margin-top: 1.6em;
    font-size: 1.2em;
    border-bottom: 1px solid;
    `;

const Wrapper = style.div`
    padding: 2em;
    margin: 0 auto;
    width: 50%;
    @media only screen and (max-width: 1000px) {
      width: 100%
    }
    @media only screen and (max-width: 600px) {
      padding: 1em 0;
      font-size: 0.8em;
    }
    `;

const ShortcutList = style.div`
    &:before, &:after {
      display: table;
      content: " ";
      clear: both;
    }
    &:after {    
      clear: both;
    }
    padding: 0;
    `;

const ShortcutOption = style.div`    
    padding: 1.4em 0;
    `;

const KeyContainer = style.span`
    padding: 0.1em 0.5em;
    background-color: #4b4949;
    border: 3px solid #313131;
    color: #e0e0e0;
    @media only screen and (max-width: 600px) {      
      font-size: 0.8em;
    }
`;

const Shortcut = ({ label, keyList }) => {
  const combination = keys => {
    const keyCount = keys.length;
    return keys.map((key, index) => (
      <span key={key}>
        <KeyContainer>{key}</KeyContainer>
        {`${index < keyCount - 1 ? ' + ' : ''}`}
      </span>
    ));
  };

  return (
    <ShortcutOption>
      <div className="col-1-2">
        <b>{label}</b>
      </div>
      <div className="col-1-2">{combination(keyList)}</div>
    </ShortcutOption>
  );
};

const KeyBindingsLegend = () => (
  <Wrapper>
    <Title>Keyboard Shortcuts</Title>
    <Category>History</Category>
    <ShortcutList>
      <Shortcut label="Undo" keyList={['CTRL', 'Z']} />
      <Shortcut label="Redo" keyList={['CTRL', 'Y']} />
    </ShortcutList>
    <Category>Switch Tool</Category>
    <ShortcutList>
      <Shortcut label="Bucket" keyList={['B']} />
      <Shortcut label="Eraser" keyList={['E']} />
      <Shortcut label="Eyedropper" keyList={['O']} />
      <Shortcut label="Move" keyList={['M']} />
      <Shortcut label="Color picker" keyList={['P']} />
    </ShortcutList>
    <Category>Canvas Dimension</Category>
    <ShortcutList>
      <Shortcut label="Add column" keyList={['CTRL', 'RIGHT']} />
      <Shortcut label="Remove column" keyList={['CTRL', 'LEFT']} />
      <Shortcut label="Add row" keyList={['CTRL', 'DOWN']} />
      <Shortcut label="Remove row" keyList={['CTRL', 'UP']} />
    </ShortcutList>
  </Wrapper>
);

export default KeyBindingsLegend;
