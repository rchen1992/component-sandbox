import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from './sc-utils';
import ElementTheme from './style/themes/ElementTheme';

interface IGlobalStyleProps {
    suppressMultiMountWarning: boolean;
}

const GlobalStyle = createGlobalStyle<IGlobalStyleProps>`
    body {
        font-family: Roboto;
        font-size: ${({ theme }) => theme && theme.fontSize};
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
