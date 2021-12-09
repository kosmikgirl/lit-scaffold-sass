import {defineConfig} from 'vite';
import del from 'rollup-plugin-delete';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import {copy} from '@web/rollup-plugin-copy';
import summary from 'rollup-plugin-summary';
import viteImagemin from 'vite-plugin-imagemin';
import {imagetools} from 'vite-imagetools';
import {ViteFaviconsPlugin} from 'vite-plugin-favicon2';
import {minifyHtml} from 'vite-plugin-html';

export default defineConfig(({command, mode}) => {
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
      copy({
        patterns: ['./robots.txt'],
      }),
      summary(),
    ],
  };

  if (command === 'build') {
    return {
      plugins: [
        ViteFaviconsPlugin({
          logo: './src/favicon.svg',
          outputPath: 'metadata',
          favicons: {
            appName: 'media-monks-lit-scaffold',
            appDescription: 'Media.Monks Lit Scaffold',
            developerName: 'Media.Monks',
            background: '#333',
            theme_color: '#333',
            start_url: '/index.html',
            scope: './',
            display: 'standalone',
            icons: {
              coast: false,
              yandex: false,
            },
          },
        }),
        imagetools(),
        viteImagemin({
          exclude: ['./src/asset/'],
          gifsicle: {
            optimizationLevel: 7,
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 5,
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
        minifyHtml(),
      ],
      build: {
        rollupOptions,
        outDir: 'build',
        assetsDir: 'asset',
        minify: 'terser',
        TerserOptions: {
          ecma: 2020,
          module: true,
          warnings: true,
        },
      },
      envPrefix: 'VAR_',
    };
  } else if (command === 'serve') {
    return {
      plugins: [imagetools()],
      envPrefix: 'VAR_',
    };
  }
});
