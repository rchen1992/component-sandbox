import React from 'react';

import { storiesOf } from '@storybook/react';
import { wInfo } from './utils';

storiesOf('Welcome', module).add(
    'About this project',
    () => <div />,
    wInfo(`
    ### Component Sandbox

    This project is an ongoing **learning exercise**. It is NOT meant to be an official library.

    I am recreating certain Element UI components to learn more about the following technologies:

    - React
    - TypeScript
    - Styled Components
    - Storybook
    - Jest

    Github: https://github.com/rchen1992/component-sandbox

    The official Element UI library is here: https://elemefe.github.io/element-react/#/en-US/quick-start
  `)
);
