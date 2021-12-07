import {defineConfig} from 'vite';
import del from 'rollup-plugin-delete';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import imagemin from 'rollup-plugin-imagemin';
import imageminWebp from 'imagemin-webp';
import {copy} from '@web/rollup-plugin-copy';
import summary from 'rollup-plugin-summary';
import html from '@web/rollup-plugin-html';

export default defineConfig(({mode}) => {
  const isPwa = process.env.buildType === 'pwa';

  isPwa &&
  console.log(
    '\x1b[32m',
    `>> You are running the PWA build process.
       >> Your build will containt a service worker to provide the necessary behavior.`
  );

  const config = {
    plugins: [
      del({targets: 'build/*'}),
      replace({
        // change the value to 'development' if you want to log more errors once built.
        'process.env.NODE_ENV': JSON.stringify(mode),
        preventAssignment: true,
      }),
      json(),
      typescript(),
      resolve(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      imagemin({
        preserveTree: true,
        imageminWebp: {
          quality: 50,
        },
        plugins: {
          imageminWebp,
        },
      }),
      copy({
        patterns: ['./static/**/*', './src/robots.txt'],
      }),
      copy({
        patterns: '**/*.js',
        rootDir: './src/data/i18n/locale',
      }),
      summary(),
    ],
    preserveEntrySignatures: 'strict',
    input: './src/main.ts',
    output: {
      dir: 'build',
    },
  };

  let htmlConfig = {
    input: 'index.html',
    minify: true,
    extractAssets: false,
    transformHtml: [
      // Fix build process references.
      html => html.replaceAll('href="/src', 'href="'),
      // Fix 404 when localization is on and there's a trailing slash in the URL.
      html => html.replace('src="./main.js"', 'src="/main.js"'),
    ],
  };

  if (isPwa) {
    htmlConfig = {
      ...htmlConfig,
      transformHtml: [
        ...htmlConfig.transformHtml,
        html =>
          html.replace(
            '<head>',
            '<head><link rel="manifest" crossorigin="use-credentials" href="manifest.json">'
          ),
      ],
    };

    config.plugins.push(
      copy({
        patterns: 'manifest.json',
      })
    );
  }

  config.plugins.unshift(html(htmlConfig));

  return {
    build: {
      rollupOptions: {
        external: /^lit/,
        ...config,
      },
    },
    envPrefix: 'VITE_', // TODO: figure out what a nice prefix is
  };
});
