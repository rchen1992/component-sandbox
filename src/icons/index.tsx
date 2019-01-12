import * as React from 'react';
import BaseIcon from './BaseIcon';

/**
|--------------------------------------------------
| Icon List
|--------------------------------------------------
*/
const CaretBottom = <BaseIcon content={'\\E604'} />;

// Mapping of icon name to React element.
const ICON_MAP = {
    'caret-bottom': CaretBottom,
};

/**
 * Returns the corresponding Icon based on icon name.
 */
export default (iconName: string) => {
    return ICON_MAP[iconName];
};
