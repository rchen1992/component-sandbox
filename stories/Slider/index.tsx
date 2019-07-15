import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import MinMax from './MinMax';
import Disabled from './Disabled';

const stories = storiesOf('Components/Slider', module) as any;

Basic(stories);
MinMax(stories);
Disabled(stories);

export default stories;
