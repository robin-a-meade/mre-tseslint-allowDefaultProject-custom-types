// Watch this issue for eventual official type declaration file:
//
//   Missing type declarations · Issue #3776 · jsx-eslint/eslint-plugin-react
//   https://github.com/jsx-eslint/eslint-plugin-react/issues/3776
//
// I started with this shim:
//
//   https://github.com/JstnMcBrd/eslint-config/blob/main/src/%40types/eslint-plugin-react.d.ts
//
// CHANGELOG
// * Sat Aug 3 2024 05:53:53 PM HST  Robin A. Meade <robin.a.meade@gmail.com>
// - added the flat configs that became available in v7.35.0 (Jul 19, 2024)

declare module 'eslint-plugin-react' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: {
    deprecatedRules: ESLint.Plugin['rules'];
    rules: ESLint.Plugin['rules'];
    configs: {
      recommended: ESLint.ConfigData;
      all: ESLint.ConfigData;
      'jsx-runtime': ESLint.ConfigData;
      flat: {
        recommended: Linter.Config<Linter.RulesRecord>;
        all: Linter.Config<Linter.RulesRecord>;
        'jsx-runtime': Linter.Config<Linter.RulesRecord>;
      };
    };
  };
  export default plugin;
}
