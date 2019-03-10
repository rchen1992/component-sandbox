import { storiesOf } from '@storybook/react';
import Types from './Types';
import Removable from './Removable';

const stories = storiesOf('Components/Tag', module) as any;

Types(stories);
Removable(stories);

export default stories;
