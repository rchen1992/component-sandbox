import { css, ITheme } from '../sc-utils';
import { ITagProps } from './Tag';

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

export default function getTypeStyles(props: ITagPropsWithTheme) {
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
