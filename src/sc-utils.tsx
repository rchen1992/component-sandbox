import * as React from 'react';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
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
 * Interface for component that accepts className or style object as props.
 */
export interface IWithStyles {
    className?: string;
    style?: React.CSSProperties;
}

// Re-export theme interface for easier access
export { ITheme };

export default styled;
