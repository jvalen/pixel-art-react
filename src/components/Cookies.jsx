import React from 'react';

const Cookies = () => (
  <div className="cookies-disclaimer">
    <div className="art-wrapper">
      <div className="pixelart-cookie" />
    </div>
    <h2>Local Storage and Cookies info</h2>
    <p>
      {' '}
      <span>This website uses both</span>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
      >
        {' '}
        Local Storage
      </a>
      <span> and</span>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.allaboutcookies.org/cookies/"
      >
        {' '}
        Cookies.
      </a>
    </p>
    <h3>Local Storage</h3>
    <p>
      Local storage allows to keep save your work even if you close the browser.
    </p>
    <p>
      There is only one local storage key entry, which contains all your saved
      projects information:
    </p>
    <ul>
      <li>
        <span className="highlight">pixelart-react-v3-0-0</span>
      </li>
    </ul>
    <h3>Cookies</h3>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#overview"
        >
          Google Analytics:
        </a>
        <span className="highlight">_ga, _gid, _gat</span>
      </li>
    </ul>
  </div>
);

export default Cookies;
