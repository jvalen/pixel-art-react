import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => (
  <main className="description">
    <Helmet>
      <title>About | Pixel Art to CSS</title>
    </Helmet>
    <h1>
      About
      <span className="highlighted">Pixel Art to CSS</span>
    </h1>
    <div className="about-image">
      <img width="150" src="tree-pixelartcss.png" alt="pixelartcss.com" />
    </div>

    <section id="what-is-it">
      <h2>What is this site?</h2>
      <p>
        <span className="highlighted">pixelartcss.com</span> is a{' '}
        <strong>free, open-source, and online tool</strong> that converts your
        pixel art designs directly into <strong>pure CSS code</strong>. Instead
        of relying on traditional image files (.png or .jpg), it uses CSS
        properties, primarily the <code>box-shadow</code> property, to render
        the artwork entirely within the browser.
      </p>
      <div>
        <p>
          This means your art is created entirely by the browser, resulting in:
        </p>
        <ul>
          <li>
            <strong>Lightning Fast Loading:</strong> Zero HTTP requests for the
            image file, speeding up your page load time.
          </li>
          <li>
            <strong>Scalability:</strong> The CSS art can be scaled crisply
            without the blur or distortion of traditional bitmap images.
          </li>
          <li>
            <strong>Minimal File Size:</strong> The code is lightweight and
            efficient for small graphics.
          </li>
        </ul>
      </div>
    </section>

    <hr />

    <section id="features">
      <h2>Core Features & Flexibility</h2>

      <h3>Animation Support (Frame-Based)</h3>
      <p>
        Beyond static images, this tool is a powerful{' '}
        <strong>animation creator</strong>. You can use the built-in{' '}
        <strong>frame editor</strong> to easily design movement or looping
        effects. The tool generates optimized CSS keyframes to bring your pixel
        art to life!
      </p>
      <div className="pixel-animation">
        <div className="pixelcat-animation" />
      </div>

      <h3>Input and Output Options</h3>
      <div>
        <p>
          While the main purpose is to generate CSS,{' '}
          <span className="highlighted">pixelartcss.com</span> offers maximum
          flexibility:
        </p>
        <ul>
          <li>
            <strong>Import Images:</strong> You can{' '}
            <strong>kickstart your project</strong> by importing a small image
            file, which the editor automatically translates into an editable
            pixel grid.
          </li>
          <li>
            <strong>Export as PNG:</strong> Download your finished static pixel
            art as a traditional <strong>.png file</strong>.
          </li>
          <li>
            <strong>Export as GIF:</strong> Download your frame-based animations
            as an animated <strong>.gif file</strong>.
          </li>
        </ul>
      </div>
    </section>

    <hr />

    <section id="how-it-works">
      <h2>How Does it Work?</h2>
      <p>
        The core magic lies in the <code>box-shadow</code> property. A pixel art
        grid is mapped, and <strong>each colored square</strong> is treated as a
        distinct <strong>box-shadow layer</strong>.
      </p>
      <p>
        The tool generates a comma-separated list of shadows. Each entry in the
        list defines a single colored &quot;pixel&quot; by specifying its
        horizontal offset, vertical offset, and color, effectively painting the
        entire design using one CSS property.
      </p>
    </section>

    <hr />

    <section id="comparison">
      <h2>Efficiency Trade-Offs: When to Use CSS vs an Image</h2>
      <p>
        While the CSS method is innovative, there&quot;s a trade-off between{' '}
        <strong>Network Cost</strong> and <strong>Rendering Cost</strong>.
      </p>
      <dl>
        <dt>
          <div className="pixel-icon">
            <div className="green-tick" />
          </div>
          <strong>
            CSS Image (box-shadow){' '}
            <span className="highlighted">Advantages</span>
          </strong>
        </dt>
        <dd>
          <strong>Zero Network Requests:</strong> The code is already loaded,
          eliminating the need for the browser to fetch a separate image file
          from the server. This is a massive speed win for small icons and
          assets.
        </dd>
        <dt>
          <div className="pixel-icon">
            <div className="alert-icon" />
          </div>
          <strong>
            CSS Image (box-shadow){' '}
            <span className="highlighted">Disadvantages</span>
          </strong>
        </dt>
        <dd>
          <strong>High Rendering Cost:</strong> The browser&quot;s CPU/GPU must
          calculate and draw thousands of individual box-shadow layers. For{' '}
          <strong>large</strong> pixel art, this computational load can cause
          significant rendering lag and is less efficient than loading one
          optimized image file.
        </dd>
        <dt>
          <div className="pixel-icon">
            <div className="image-icon" />
          </div>
          <strong>
            Actual Image (PNG/WebP){' '}
            <span className="highlighted">Efficiency</span>
          </strong>
        </dt>
        <dd>
          Actual image files have a <strong>network cost</strong> (they must be
          downloaded), but their <strong>rendering cost</strong> is low. Once
          downloaded, the browser can quickly draw a pre-calculated image
          bitmap. Therefore, for <strong>large or complex</strong> pixel art, an
          optimized image file is usually faster to display than generating it
          with complex CSS.
        </dd>
      </dl>
      <p>
        <strong>In short:</strong> Use CSS for <strong>small icons</strong> and
        images for <strong>large assets</strong>. This tool enables you to
        create both types of output, giving you all the possibilities.
      </p>
    </section>

    <hr />

    <section id="who-is-it-for">
      <h2>Who is this for?</h2>
      <ul>
        <li>
          <strong>Web Developers</strong>: Quickly add{' '}
          <strong>retro, 8-bit style icons</strong>, loading spinners, or small
          artistic flourishes.
        </li>
        <li>
          <strong>Pixel Artists</strong>: Easily prototype and translate your
          creations into a <strong>web-friendly, non-image format</strong> for
          online portfolios, or quickly generate GIF animations.
        </li>
        <li>
          <strong>Students & Hobbyists</strong>: A fun way to explore the
          capabilities of <strong>pure CSS</strong> and the power of the{' '}
          <code>box-shadow</code> property or just have fun unleashing their
          creativity.
        </li>
      </ul>
    </section>

    <hr />

    <section>
      <h2>More Info</h2>
      <ul>
        <li>
          <strong>Author</strong>:{' '}
          <a target="_blank" rel="noopener" href="https://jvalen.com">
            jvalen
          </a>
        </li>
        <li>
          <strong>Contributors</strong>: Amazing contributions have been
          provided along the time. You can check the full contributors list{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/jvalen/pixel-art-react/graphs/contributors"
          >
            here
          </a>
          .
        </li>
        <li>
          <strong>Source Code</strong>:{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/jvalen/pixel-art-react"
          >
            GitHub
          </a>
        </li>
        <li>
          <strong>Data and Privacy Info</strong>: This site uses LocalStorage
          and GoatCounter,{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://pixelartcss.com/privacy-and-data"
          >
            check this out
          </a>{' '}
          to know more about it.
        </li>
      </ul>
    </section>
  </main>
);

export default About;
