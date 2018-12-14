import * as React from 'react';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule, ThemedCssFunction } from 'styled-components';
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
 * Screen sizes.
 */
export const screenSizes = {
    xs: 0,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1920,
};

/**
 * Iterate through the screenSizes and create a media template
 */
export const media = Object.keys(screenSizes).reduce(
    (queries, breakpoint) => {
        queries[breakpoint] = (
            strings: TemplateStringsArray,
            ...interpolations: styledComponents.SimpleInterpolation[]
        ) => css`
            @media (min-width: ${screenSizes[breakpoint]}px) {
                ${css(strings, ...interpolations)}
            }
        `;
        return queries;
    },
    {} as { [key: string]: ThemedCssFunction<ITheme> }
);

/**
 * Interface for component that accepts className or style object as props.
 */
export interface IWithStyles {
    className?: string;
    style?: React.CSSProperties;
}

// Re-export theme interface for easier access
export { ITheme };

export default styled;
