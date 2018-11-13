import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from '../src/sc-utils';
import ElementTheme from '../src/style/themes/ElementTheme';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto;
        font-size: ${({ theme }) => theme && theme.fontSize};
    }
`;

/**
 * React component that provides theme object and global styles.
 */
const Provider: React.SFC<{}> = props => (
    <ThemeProvider theme={ElementTheme}>
        <div>
            {props.children}
            <GlobalStyle />
        </div>
    </ThemeProvider>
);

export default Provider;
