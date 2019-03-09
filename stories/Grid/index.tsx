import { storiesOf } from '@storybook/react';
import ColumnSpan from './ColumnSpan';
import ColumnOffset from './ColumnOffset';
import Gutters from './Gutters';
import CustomTag from './CustomTag';
import ResponsiveSpan from './ResponsiveSpan';
import ResponsiveOffset from './ResponsiveOffset';

const stories = storiesOf('Components/Grid', module) as any;

ColumnSpan(stories);
ColumnOffset(stories);
Gutters(stories);
CustomTag(stories);
ResponsiveSpan(stories);
ResponsiveOffset(stories);

export default stories;
