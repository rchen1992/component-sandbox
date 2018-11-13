import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from './sc-utils';
import ElementTheme from './style/themes/ElementTheme';

const GlobalStyle = createGlobalStyle`
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
            <GlobalStyle />
        </div>
    </ThemeProvider>
);

export default Provider;
