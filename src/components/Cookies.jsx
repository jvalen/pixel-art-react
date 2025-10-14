import React from 'react';
import { Helmet } from 'react-helmet';

const Cookies = () => (
  <main className="description">
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
      <title>Data and Privacy Info | Pixel Art to CSS</title>
    </Helmet>
    <h1>Data and Privacy Info</h1>
    <div className="art-wrapper">
      <div className="pixelart-cookie" />
    </div>
    <section>
      <h2>Local Storage</h2>
      <p>
        This website uses the browser&apos;s{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
        >
          Local Storage
        </a>{' '}
        to save your drawings and projects, so they remain available even after
        you close the browser.
      </p>
      <p>There is only one Local Storage key used:</p>
      <ul>
        <li>
          <span className="highlighted">pixelart-react-v3-0-0</span>
        </li>
      </ul>
      <p>
        It contains all your saved project data. You can delete it anytime from
        your browser settings.
      </p>
    </section>
    <section>
      <h2>Analytics (GoatCounter)</h2>
      <p>
        This site uses{' '}
        <a target="_blank" rel="noreferrer" href="https://www.goatcounter.com/">
          GoatCounter
        </a>{' '}
        to collect <strong>anonymous</strong> visit statistics.
      </p>
      <ul>
        <li>No cookies are used.</li>
        <li>No personal data is collected.</li>
        <li>
          The goal is only to understand general usage and improve the website.
        </li>
      </ul>
    </section>
  </main>
);

export default Cookies;
