// /* eslint-disable @typescript-eslint/triple-slash-reference */
// /// <reference path="typings/eslint-plugin-react.d.ts" />
// Bug? The above reference shouldn't be needed.
// I added the `typings` dir to the `typeRoots` key in `tsconfig.json`; that
// should be sufficient for the linter to pick it up.
// Yet running `pnpm exec eslint .` shows two errors for `react.configs.flat.recommended`
// 1. Unsafe argument of type `any` assigned to a parameter of type `ConfigWithExtends` @typescript-eslint/no-unsafe-argument
// 2. Unsafe member access .recommended on an `error` typed value @typescript-eslint/no-unsafe-member-access
// It seems that files included via projectService.allowDefaultProject don't see my
// custom typings when eslint is run.
// Additional things I tried:
// 1. I tried adding the `typings` dir to the `include` key in `tsconfig.json`.
//    Didn't help.
// 2. I tried moving my custom typings from my `typings` dir to `node_modules/@types`.
//    Worked. My custom type was recognized by eslint.
//    But this is not a good solution.

import react from 'eslint-plugin-react';

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // eslint-plugin-react v7.35.0 (Jul 19, 2024) added support for
  // - support eslint v9
  // - export flat configs from plugin root
  // https://github.com/jsx-eslint/eslint-plugin-react/releases/tag/v7.35.0
  //
  // It doesn't have type declarations yet
  //
  // I created a type declarations file for it here:
  //
  //    typings/eslint-plugin-react.d.ts
  //
  react.configs.flat.recommended,

  // Settings and rule overrides
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'prettier.config.js'],
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prefer-const': 'warn',
    },
  }
);
