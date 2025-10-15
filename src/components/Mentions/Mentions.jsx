import React from 'react';
import { Helmet } from 'react-helmet';

const Mentions = () => (
  <main className="description">
    <Helmet>
      <title>Links & Mentions | Pixel Art to CSS</title>
    </Helmet>
    <h1>
      Links <span className="highlighted">&</span> Mentions
    </h1>

    <section>
      <p>
        <span className="highlighted">PixelArtCSS</span> has been featured or
        mentioned across various sites and communities. Here&apos;s a list of
        where it&apos;s been shared or discussed:
      </p>
    </section>

    <section>
      <h2>🧩 Resources Compilation</h2>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/collections/pixel-art-tools"
          >
            GitHub collection
          </a>
          : Pixel Art Tools
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://web.archive.org/web/20201220103823/https://speckyboy.com/free-time-saving-tools-web-designers/"
          >
            Speckyboy Magazine
          </a>
          : Web-Based CSS Tools
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://blog.spacehey.com/entry?id=813699"
          >
            SpaceHey post by @zyozi
          </a>
          : Graphic Generators
        </li>
      </ul>
    </section>
    <section>
      <h2>📰 Articles</h2>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://css-tricks.com/fun-times-css-pixel-art/"
          >
            CSS-Tricks
          </a>
          : Fun Times With CSS Pixel Art
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://pocketmags.com/it/net-magazine/october-2016"
          >
            Net Magazine (Issue 285, print edition)
          </a>
          : Gallery, Inspirational Sites
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://educacionplasticayvisual.com/comunicacion-audiovisual/pixel-art-to-css-animacion-en-pixeles/"
          >
            educacionplasticayvisual.com
          </a>
          : Animación en píxeles
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="http://www.softandapps.info/2016/06/24/pixel-art-to-css-web-crear-pixel-art-exportar-css/"
          >
            softandapps.info
          </a>
          : Web para crear Pixel Art y exportar como CSS
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="https://pokecoder.hashnode.dev/making-pixel-art-with-pure-css"
          >
            pokecoder.hashnode.dev
          </a>
          : Making pixel-art with pure CSS
        </li>
      </ul>
    </section>
    <section>
      <h2>🗞️ Newsletters</h2>
      <ul>
        <li>
          <a
            target="_blank"
            rel="noopener"
            href="http://us3.campaign-archive2.com/?u=4ad274b490aa6da8c2d29b775&amp;id=080a77ecde&amp;e=193b154650"
          >
            Gamedev.js (Issue 129)
          </a>
          : Tools
        </li>
      </ul>
    </section>
  </main>
);

export default Mentions;
