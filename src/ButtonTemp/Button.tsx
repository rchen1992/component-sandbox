import sc, { css, styledComponentWithProps, ITheme } from '../sc-utils';
import getBasicButtonTypeCss from './basicButtonTypes';
import getPlainButtonTypeCss from './plainButtonTypes';
import ButtonSizeCss, { ButtonSize } from './buttonSizes';
import { InterpolationValue } from 'styled-components';
import { ButtonType } from './buttonTypes';

export interface IButtonProps {
    round?: boolean;
    plain?: boolean;
    disabled?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
}

export interface IButtonPropsAndTheme extends IButtonProps {
    theme: ITheme;
}

/**
 * A function that takes button props and returns a CSS function.
 */
export type ButtonCssFunction = (props: IButtonPropsAndTheme) => InterpolationValue[] | undefined;

const styled = {
    button: styledComponentWithProps<IButtonProps, HTMLButtonElement>(sc.button),
};

export default styled.button`
    /**
     * Default styling
     */
    border-radius: 5px;
    outline: none;
    font-size: inherit;

    ${({ theme }) =>
        theme &&
        css`
            padding: ${theme.defaultButtonVerticalPadding} ${theme.defaultButtonHorizontalPadding};
            color: ${theme.secondaryTextColor};
            border: 1px solid ${theme.defaultBorderColor};

            &:hover {
                cursor: pointer;
                color: ${theme.primaryColor};
                border-color: ${theme.primaryColorAccent};
                background-color: ${theme.primaryColorLight};
            }

            &:active {
                border-color: ${theme.primaryColorDark};
                color: ${theme.primaryColorDark};
            }
        `};

    ${ButtonSizeCss};

    /**
     * Round buttons.
     */
    ${props =>
        props.round &&
        css`
            border-radius: 20px;
        `};

    /**
     * Button types (primary, success, danger, etc)
     */
    ${props => props.type && getBasicButtonTypeCss(props.type)};

    /**
     * Plain buttons.
     */
    ${props =>
        props.plain &&
        props.theme &&
        css`
            &:hover {
                background-color: white;
                border-color: ${props.theme.primaryColor};
            }
        `};

    ${props => props.plain && props.type && getPlainButtonTypeCss(props.type)};

    /**
     * Disabled buttons.
     */
    ${props =>
        props.disabled &&
        css`
            opacity: 0.6;
            pointer-events: none;
        `};
`;
