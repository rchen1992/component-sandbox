import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import Disabled from './Disabled';
import Sizes from './Sizes';
import Icon from './Icon';
import PrependAppend from './PrependAppend';
import Textarea from './Textarea';

const stories = storiesOf('Components/Input', module) as any;

Basic(stories);
Disabled(stories);
Sizes(stories);
Icon(stories);
PrependAppend(stories);
Textarea(stories);

export default stories;
