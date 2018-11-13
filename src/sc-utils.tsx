import * as React from 'react';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule, ThemedStyledFunction } from 'styled-components';
import { ITheme } from './style/themes/theme-types';

/**
 * Add our theme interface type to styled component functions,
 * and then re-export them.
 *
 * This allows the theme variable in styled component functions
 * to be aware of the theme type.
 *
 * In general, usage of styled-components in this project should
 * reference these exports instead of the original styled-comopnents.
 */
export const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

/**
 * Create a temporary StyledFunction type that includes our theme type.
 * We use this in our helper function below to include the theme type
 * in our styled components.
 *
 * Note: this is not necessary if we always use the above exports when
 * dealing with styled components. However, if you happen to pass in a
 * styled component function from the original package, it will be missing the theme type.
 * This makes extra sure that the theme will be always be available.
 */
type StyledFunction<T> = ThemedStyledFunction<T, ITheme>;

/**
 * Wraps a styled-components function with prop types, including theme.
 */
export function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(
    styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
    return styledFunction;
}

export default styled;
