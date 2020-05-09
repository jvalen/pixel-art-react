import React, { useRef, useState } from 'react';

const Output = ({
  copyClipboardData = {},
  readOnly = true,
  outputText,
  preFormatted = false
}) => {
  const { showButton, textButton, successMessage } = copyClipboardData;
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const copyToClipboard = e => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(successMessage || 'Copied!');
  };
  return (
    <div className="output">
      {showButton && document.queryCommandSupported('copy') && (
        <div className="copy-to-clipboard__container">
          <button
            className="copy-to-clipboard"
            type="button"
            onClick={copyToClipboard}
          >
            {textButton || 'Copy'}
          </button>
          <span className={copySuccess ? 'show' : ''}>{copySuccess}</span>
        </div>
      )}
      <textarea
        className={`output__text ${preFormatted ? 'output__pre' : ''}`}
        ref={textAreaRef}
        readOnly={readOnly}
        value={outputText}
      />
    </div>
  );
};
export default Output;
