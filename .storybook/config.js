import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

addDecorator(withKnobs);
addDecorator(withInfo);

// automatically import all files ending in *.stories.js
// const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
    require('./welcomeStory');
    require('../stories');
    // req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
