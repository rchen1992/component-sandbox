import { storiesOf } from '@storybook/react';
import Default from './Default';
import ButtonTypes from './ButtonTypes';
import ButtonSizes from './ButtonSizes';
import Plain from './Plain';
import Round from './Round';
import Disabled from './Disabled';

const stories = storiesOf('Components/Button', module) as any;

Default(stories);
ButtonTypes(stories);
ButtonSizes(stories);
Plain(stories);
Round(stories);
Disabled(stories);

export default stories;
