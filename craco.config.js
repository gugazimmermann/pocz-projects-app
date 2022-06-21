/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.paths.json');

module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api/index.ts'),
      '@components': path.resolve(__dirname, 'src/components/index.ts'),
      '@icons': path.resolve(__dirname, 'src/icons/index.ts'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces/index.ts'),
      '@lang': path.resolve(__dirname, 'src/lang/index.ts'),
      '@libs': path.resolve(__dirname, 'src/libs/index.ts'),
      '@routes': path.resolve(__dirname, 'src/routes/index.ts'),
      '@services': path.resolve(__dirname, 'src/services/index.ts'),
      '@settings': path.resolve(__dirname, 'src/settings/index.ts'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
