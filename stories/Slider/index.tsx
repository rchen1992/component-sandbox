import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import MinMax from './MinMax';

const stories = storiesOf('Components/Slider', module) as any;

Basic(stories);
MinMax(stories);

export default stories;
