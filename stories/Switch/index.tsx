import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import Colors from './Colors';
import Values from './Values';
import Width from './Width';
import Text from './Text';
import Disabled from './Disabled';
import Events from './Events';

const stories = storiesOf('Components/Switch', module) as any;

Basic(stories);
Colors(stories);
Values(stories);
Width(stories);
Text(stories);
Disabled(stories);
Events(stories);

export default stories;
