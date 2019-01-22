import BaseIcon from './BaseIcon';
import { styled } from '../sc-utils';

/**
 * Cache for icon components.
 */
const iconComponentCache = {};

/**
 * Mapping between icon name and it's pseudo-element content.
 */
const ICON_MAP = {
    'caret-bottom': '\\E604',
    search: '\\E61D',
    edit: '\\E614',
    date: '\\E611',
    more: '\\E61A',
    close: '\\E60C',
    time: '\\E622',
    'circle-close': '\\E60A',
};

export const getIconContent = (iconName: string) => {
    return ICON_MAP[iconName];
};

/**
 * Returns the corresponding Icon based on icon name.
 */
const getIcon = (iconName: string) => {
    // If icon is in cache, simply return it.
    if (!!iconComponentCache[iconName]) {
        return iconComponentCache[iconName];
    }

    /**
     * Otherwise, dynamically create icon component
     * and store it in cache before returning it.
     */
    const iconContent = getIconContent(iconName);
    const iconComponent = styled(BaseIcon)`
        &::before {
            content: '${iconContent}';
        }
    `;

    iconComponentCache[iconName] = iconComponent;

    return iconComponent;
};

export default getIcon;
