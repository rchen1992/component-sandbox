import styled, { css, ITheme } from '../sc-utils';
import getBasicButtonTypeCss from './basicButtonTypes';
import getPlainButtonTypeCss from './plainButtonTypes';
import ButtonSizeCss, { ButtonSize } from './buttonSizes';
import { FlattenSimpleInterpolation } from 'styled-components';
import { ButtonType } from './buttonTypes';

export interface IButtonProps {
    round?: boolean;
    plain?: boolean;
    disabled?: boolean;
    buttonType?: keyof typeof ButtonType;
    buttonSize?: keyof typeof ButtonSize;
}

export interface IButtonPropsAndTheme extends IButtonProps {
    theme: ITheme;
}

/**
 * A function that takes button props and returns a CSS function.
 */
export type ButtonCssFunction = (
    props: IButtonPropsAndTheme
) => FlattenSimpleInterpolation | undefined;

export default styled.button<IButtonProps>`
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
        `}

    ${ButtonSizeCss}

    /**
     * Round buttons.
     */
    ${props =>
        props.round &&
        css`
            border-radius: 20px;
        `}

    /**
     * Button types (primary, success, danger, etc)
     */
    ${props => props.buttonType && getBasicButtonTypeCss(props.buttonType)}

    /**
     * Default plain button.
     */
    ${props =>
        props.plain &&
        props.theme &&
        css`
            &:hover {
                background-color: white;
                border-color: ${props.theme.primaryColor};
            }
        `}

    /**
     * Plain buttons types.
     */
    ${props => props.plain && props.buttonType && getPlainButtonTypeCss(props.buttonType)}

    /**
     * Disabled buttons.
     */
    ${props =>
        props.disabled &&
        css`
            opacity: 0.6;
            pointer-events: none;
        `}
`;
