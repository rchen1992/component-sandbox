import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import Disabled from './Disabled';
import Indeterminate from './Indeterminate';
import OnChange from './OnChange';
import CheckboxGroup from './CheckboxGroup';
import MinMax from './MinMax';
import CheckAll from './CheckAll';

const stories = storiesOf('Components/Checkbox', module) as any;

Basic(stories);
Disabled(stories);
Indeterminate(stories);
OnChange(stories);
CheckboxGroup(stories);
MinMax(stories);
CheckAll(stories);

export default stories;
