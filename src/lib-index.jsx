import React, { useState, useEffect } from 'react';
import './css/imports.css'; // Import PostCSS files
import configureStore from './store/configureStore';
import { EthContextProvider } from './contexts/ethContext';
import Root from './components/Root';

export default function PixelArt({ mintFn }) {
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    setShowEditor(true);
  }, []);

  if (!showEditor) {
    return <div>Loading...</div>;
  }
  return <PixelArtApp mintFn={mintFn} />;
}

// In case this code is pre-rendered by a server, it's simpler for us to have a
// component that only gets rendered in the browser. Then we don't need to
// worry about if all of the code is Node.js compatible because it can be gated
// behind `useEffect`.
function PixelArtApp({ mintFn }) {
  const devMode = process.env.NODE_ENV === 'development';
  const store = configureStore(devMode);

  return (
    <EthContextProvider mintFn={mintFn}>
      <Root store={store} />
    </EthContextProvider>
  );
}
