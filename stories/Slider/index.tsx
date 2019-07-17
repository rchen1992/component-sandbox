import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import MinMax from './MinMax';
import Disabled from './Disabled';
import Step from './Step';

const stories = storiesOf('Components/Slider', module) as any;

Basic(stories);
MinMax(stories);
Disabled(stories);
Step(stories);

export default stories;
