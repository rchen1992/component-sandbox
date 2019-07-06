# Demo

https://componentsandbox.netlify.com

# About

This project is an ongoing **learning exercise**. It is NOT meant to be an official library.

I am recreating certain Element UI components to learn more about the following technologies:

-   React
-   TypeScript
-   Storybook
-   Styled Components
-   Jest

The official Element UI library is here: https://elemefe.github.io/element-react/#/en-US/quick-start

# Usage

Setup

```bash
npm install
npm run storybook
```

Build design system for publishing to private npm or github instance:

```bash
npm run build
```

Build storybook for static file hosting:

```bash
npm run build-storybook
```

Run tests

```bash
npm test
```

# Gotchas

1. After `npm install` (If using npm instead of yarn), run `yarn autoclean --force`.

-   Reason: There is currently an unaddressed [issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311) with styled-components versions above `4.1.8` where react-native types are being exported along with react types. This causes errors upon building. My current workaround is adding react-native types to `.yarnclean` and then removing them from `node_modules` with the above command.
