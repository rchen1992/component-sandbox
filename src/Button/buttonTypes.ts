import { ButtonCssFunction } from './Button';

/**
 * Button types
 */
export enum ButtonType {
    primary = 'primary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    text = 'text',
}

/**
 * A mapping between valid button types and their corresponding CSS function.
 */
export type IButtonTypeCssMapping = { [Type in ButtonType]: (ButtonCssFunction) };

/**
 * Takes a mapping between button types and their CSS functions and
 * returns another function that resolves a given type with the mapping.
 */
export const getButtonTypeCssFromMapping = (mapping: IButtonTypeCssMapping) => (
    type?: string
): ButtonCssFunction | undefined => {
    if (!type || !mapping.hasOwnProperty(type)) {
        console.error(`Button type '${type}' is not a valid button type`);
        return undefined;
    }

    return mapping[type];
};
