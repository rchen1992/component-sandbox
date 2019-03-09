import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import DisabledOption from './DisabledOption';
import DisabledSelect from './DisabledSelect';
import Clearable from './Clearable';
import CustomTemplate from './CustomTemplate';
import OptionGroup from './OptionGroup';
import Filterable from './Filterable';

const stories = storiesOf('Components/Select', module) as any;

Basic(stories);
DisabledOption(stories);
DisabledSelect(stories);
Clearable(stories);
CustomTemplate(stories);
OptionGroup(stories);
Filterable(stories);

export default stories;
