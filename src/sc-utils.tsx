import * as React from 'react';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule, ThemedStyledFunction } from 'styled-components';
import { IElementTheme } from './style/themes/ElementTheme';

/**
 * Add our theme interface type to styled component functions,
 * and then re-export them.
 *
 * This allows the theme variable in styled component functions
 * to be aware of the theme type.
 */
export const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IElementTheme>;

/**
 * Create a temporary StyledFunction type that includes our theme type.
 * We use this in our helper function below to include the theme type
 * in our styled components.
 */
type StyledFunction<T> = ThemedStyledFunction<T, IElementTheme>;

/**
 * Wraps a styled-components function with prop types, including theme.
 */
export function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(
    styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
    return styledFunction;
}

export default styled;
