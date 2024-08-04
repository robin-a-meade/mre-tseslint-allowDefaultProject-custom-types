# mre-tseslint-allowDefaultProject-custom-types

This is a minimal reproduceable example (mre) showing that custom types are not picked up by files specified in `projectService.allowDefaultProject`.

## Intro

I wanted to enable typed linting for `eslint.config.js`.

I therefore added `eslint.config.js` to `projectService.allowDefaultProject`:

```js
// eslint.config.js
[...]
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'prettier.config.js'],
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
[...]
```

✔️ Works!

## Add `eslint-react-plugin`

I then added `eslint-react-plugin` to my `eslint.config.js`.

Type declarations are not available yet for `eslint-react-plugin`, so I created a shim at `typings/eslint-react-plugin.d.ts` and I added the `typings` directory to the `typeRoots` key in `tsconfig.json`.

But VSCode and linting do not find my custom type declaration.

VSCode reports this problem:

![Screenshot showing that my custom type declaration is not found](screenshot-eslint-does-not-find-type.png 'VSCode does not find my custom type declaration')

And running `pnpm exec eslint .` reports two linting errors:

```
  45:3   error  Unsafe argument of type `any` assigned to a parameter of type `ConfigWithExtends` @typescript-eslint/no-unsafe-argument

  45:22  error  Unsafe member access .recommended on an `error` typed value @typescript-eslint/no-unsafe-member-access
```

## Workaround #1: Move my custom type declaration into `node_modules/@types`

If I move `eslint-plugin-react.d.ts` to `node_modules/@types`, both VSCode and ESLint are happy.

VSCode no longer complains that it can't find the declaration file.

ESLint no longer reports errors.

## Workaround #2: Add a `<reference ... />` tag to top of `eslint.config.js`

I add `<reference path="typings/eslint-plugin-react.d.ts" />` to top of `eslint.config.js`:

```ts
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="typings/eslint-plugin-react.d.ts" />
```

I'm currently using this second workaround in this repo.

## Expected behavior

I expect linting to find my custom type declarations when I lint files specified in `projectService.allowDefaultProject`.
