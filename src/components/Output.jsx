import React, { useRef, useState } from 'react';

const Output = ({ copyClipboardData = {}, readOnly = true, outputText }) => {
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
        <div>
          <button
            className="copy-to-clipboard"
            type="button"
            onClick={copyToClipboard}
          >
            {textButton || 'Copy'}
          </button>
          <span className="output__successMessage">{copySuccess}</span>
        </div>
      )}
      <textarea
        className="output__text"
        ref={textAreaRef}
        readOnly={readOnly}
        value={outputText}
      />
    </div>
  );
};
export default Output;
