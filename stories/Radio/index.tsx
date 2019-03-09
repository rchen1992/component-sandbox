import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import Disabled from './Disabled';
import RadioGroup from './RadioGroup';

const stories = storiesOf('Components/Radio', module) as any;

Basic(stories);
Disabled(stories);
RadioGroup(stories);

export default stories;
