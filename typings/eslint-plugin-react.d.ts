// Missing type declarations · Issue #3776 · jsx-eslint/eslint-plugin-react
// https://github.com/jsx-eslint/eslint-plugin-react/issues/3776

// This is only a type-shim and is not meant to be a perfect representation
// https://github.com/JstnMcBrd/eslint-config/blob/main/src/%40types/eslint-plugin-react.d.ts

declare module 'eslint-plugin-react' {
  import type { ESLint, Linter } from 'eslint';
  const plugin: {
    deprecatedRules: ESLint.Plugin['rules'];
    rules: ESLint.Plugin['rules'];
    // Does not use FlatConfig yet
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
