import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import DisabledOption from './DisabledOption';
import DisabledSelect from './DisabledSelect';
import Clearable from './Clearable';
import CustomTemplate from './CustomTemplate';
import OptionGroup from './OptionGroup';
import Filterable from './Filterable';
import MultiSelect from './MultiSelect';

const stories = storiesOf('Components/Select', module) as any;

Basic(stories);
DisabledOption(stories);
DisabledSelect(stories);
Clearable(stories);
CustomTemplate(stories);
OptionGroup(stories);
Filterable(stories);
MultiSelect(stories);

export default stories;
