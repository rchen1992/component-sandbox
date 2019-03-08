import * as React from 'react';
import styled, { css, ITheme, IWithStyles } from '../sc-utils';
import getIcon from '../icons';

interface ITagProps {
    type?: keyof typeof TagType;
    closable?: boolean;
}

interface ITagWrapperProps extends ITagProps, IWithStyles {
    children: React.ReactNode;
    onClose?: () => void;
}

interface ITagPropsWithTheme extends ITagProps {
    theme: ITheme;
}

export enum TagType {
    gray = 'gray',
    primary = 'primary',
    success = 'success',
    warning = 'warning',
    danger = 'danger',
}

function getTypeStyles(props: ITagPropsWithTheme) {
    switch (props.type) {
        case TagType.gray:
            return css`
                background-color: hsl(222, 32%, 92%);
                color: ${props.theme.secondaryTextColor};

                i:hover {
                    background-color: ${props => props.theme.secondaryTextColor};
                }
            `;
        case TagType.primary:
            return css`
                background-color: ${props.theme.primaryColorLight};
                color: ${props.theme.primaryColor};
                border-color: ${props.theme.primaryColorAccent};

                i:hover {
                    background-color: ${props => props.theme.primaryColor};
                }
            `;
        case TagType.success:
            return css`
                background-color: ${props.theme.successColorLight};
                color: ${props.theme.successColor};
                border-color: ${props.theme.successColorAccent};

                i:hover {
                    background-color: ${props => props.theme.successColor};
                }
            `;
        case TagType.warning:
            return css`
                background-color: ${props.theme.warningColorLight};
                color: ${props.theme.warningColor};
                border-color: ${props.theme.warningColorAccent};

                i:hover {
                    background-color: ${props => props.theme.warningColor};
                }
            `;
        case TagType.danger:
            return css`
                background-color: ${props.theme.dangerColorLight};
                color: ${props.theme.dangerColor};
                border-color: ${props.theme.dangerColorAccent};

                i:hover {
                    background-color: ${props => props.theme.dangerColor};
                }
            `;
        default:
            return css`
                background-color: ${props.theme.infoColorDark};

                i:hover {
                    background-color: white;
                    color: ${props.theme.infoColorDark};
                }
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

    i {
        display: inline-block;
        cursor: pointer;
        border-radius: 50%;
        transform: scale(0.75, 0.75);
        height: 18px;
        width: 18px;
        line-height: 18px;
        position: relative;
        right: -2px;
        text-align: center;

        :hover {
            color: white;
        }
    }

    ${props => getTypeStyles(props)};
`;

const TagWrapper = React.forwardRef<any, ITagWrapperProps>((props, ref) => {
    const Icon = !!props.closable ? getIcon('close') : null;
    return (
        <Tag ref={ref} style={props.style} className={props.className} type={props.type}>
            {props.children}
            {Icon && <Icon onClick={props.onClose} />}
        </Tag>
    );
});

export default TagWrapper;
