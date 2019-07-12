import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import Size from './Size';

const stories = storiesOf('Components/Modal', module) as any;

Basic(stories);
Size(stories);

export default stories;
