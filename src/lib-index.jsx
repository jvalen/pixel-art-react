import React, { useState, useEffect } from 'react';
import './css/imports.css'; // Import PostCSS files
import configureStore from './store/configureStore';
import Root from './components/Root';

export default function PixelArt() {
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    setShowEditor(true);
  }, []);

  if (!showEditor) {
    return <div>Loading...</div>;
  }
  return <PixelArtApp />;
}

// In case this code is pre-rendered by a server, it's simpler for us to have a
// component that only gets rendered in the browser. Then we don't need to
// worry about if all of the code is Node.js compatible because it can be gated
// behind `useEffect`.
function PixelArtApp() {
  const devMode = process.env.NODE_ENV === 'development';
  const store = configureStore(devMode);

  return <Root store={store} />;
}
