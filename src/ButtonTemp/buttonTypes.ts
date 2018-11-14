import { ButtonCssFunction } from './Button';

/**
 * Button types
 */
export enum ButtonType {
    PRIMARY = 'primary',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
    TEXT = 'text',
}

/**
 * A mapping between valid button types and their corresponding CSS function.
 */
export type IButtonTypeCssMapping = { [K in ButtonType]: ButtonCssFunction };

/**
 * Takes a mapping between button types and their CSS functions and
 * returns another function that resolves a given type with the mapping.
 */
export const getButtonTypeCssFromMapping = (mapping: IButtonTypeCssMapping) => (
    type: string
): ButtonCssFunction | undefined => {
    if (!mapping.hasOwnProperty(type)) {
        console.error(`Button type '${type}' is not a valid button type`);
        return undefined;
    }

    return mapping[type];
};
