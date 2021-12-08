import {defineConfig} from 'vite';
import del from 'rollup-plugin-delete';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import viteImagemin from 'vite-plugin-imagemin';
import {copy} from '@web/rollup-plugin-copy';
import summary from 'rollup-plugin-summary';
import html from '@web/rollup-plugin-html';
import {imagetools} from 'vite-imagetools';

export default defineConfig(({mode}) => {
  const isPwa = process.env.buildType === 'pwa';

  isPwa &&
    console.log(
      '\x1b[32m',
      `>> You are running the PWA build process.
       >> Your build will containt a service worker to provide the necessary behavior.`
    );

  const rollupOptions = {
    plugins: [
      del({targets: 'build/*'}),
      replace({
        // change the value to 'development' if you want to log more errors once built.
        'process.env.NODE_ENV': JSON.stringify(mode),
        preventAssignment: true,
      }),
      resolve(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      copy({
        patterns: ['./src/robots.txt'],
      }),
      summary(),
    ],
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

    rollupOptions.plugins.push(
      copy({
        patterns: 'manifest.json',
      })
    );
  }

  rollupOptions.plugins.unshift(html(htmlConfig));

  return {
    plugins: [
      imagetools(),
      viteImagemin({
        exclude: './src/asset/',
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 50,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      ,
    ],
    build: {
      rollupOptions,
      outDir: 'build',
      assetsDir: 'src',
    },
    envPrefix: 'VAR_',
  };
});
