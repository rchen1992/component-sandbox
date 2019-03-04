import * as React from 'react';
import styled, { css, ITheme } from '../sc-utils';

interface ITagProps {
    children: React.ReactNode;
    type?: keyof typeof TagType;
}

enum TagType {
    gray = 'gray',
    primary = 'primary',
    success = 'success',
    warning = 'warning',
    danger = 'danger',
}

interface ITagPropsWithTheme extends ITagProps {
    theme: ITheme;
}

function getTypeStyles(props: ITagPropsWithTheme) {
    switch (props.type) {
        case TagType.gray:
            return css`
                background-color: hsl(222, 32%, 92%);
                color: ${props.theme.secondaryTextColor};
            `;
        case TagType.primary:
            return css`
                background-color: ${props.theme.primaryColorLight};
                color: ${props.theme.primaryColor};
                border-color: ${props.theme.primaryColorAccent};
            `;
        case TagType.success:
            return css`
                background-color: ${props.theme.successColorLight};
                color: ${props.theme.successColor};
                border-color: ${props.theme.successColorAccent};
            `;
        case TagType.warning:
            return css`
                background-color: ${props.theme.warningColorLight};
                color: ${props.theme.warningColor};
                border-color: ${props.theme.warningColorAccent};
            `;
        case TagType.danger:
            return css`
                background-color: ${props.theme.dangerColorLight};
                color: ${props.theme.dangerColor};
                border-color: ${props.theme.dangerColorAccent};
            `;
        default:
            return css`
                background-color: ${props.theme.infoColorDark};
            `;
    }
}

const Tag = styled<ITagProps, 'span'>('span')`
    display: inline-block;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    font-family: system-ui;

    ${props => getTypeStyles(props)};
`;

// const Tag = React.forwardRef<any, ITagProps>((props, ref) => {
//     return <span ref={ref}>{props.children}</span>;
// });

export default Tag;
