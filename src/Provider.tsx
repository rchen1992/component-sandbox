import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from './sc-utils';
import ElementTheme from './style/themes/ElementTheme';

interface IGlobalStyleProps {
    suppressMultiMountWarning: boolean;
}

/**
 * Element UI icon fonts from: https://elemefe.github.io/element-react/d2f69a92faa6.woff
 */
const GlobalStyle = createGlobalStyle<IGlobalStyleProps>`
    @font-face {
        font-family: element-icons;
        src: url('/element-icons.woff') format('woff');
    }

    body {
        font-family: system-ui;
        font-size: ${({ theme }) => theme && theme.fontSize};
    }

    * {
        box-sizing: border-box;
    }
`;

/**
 * React component that provides theme object and global styles.
 */
const Provider: React.FunctionComponent = props => (
    <ThemeProvider theme={ElementTheme}>
        <div>
            {props.children}
            <GlobalStyle suppressMultiMountWarning />
        </div>
    </ThemeProvider>
);

export default Provider;
