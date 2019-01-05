// import * as React from 'react';
import styled, { css, ITheme } from '../sc-utils';
import { InterpolationValue } from 'styled-components';

interface IInputProps {
    disabled?: boolean;
    inputSize?: string;
}

export enum InputSize {
    large = 'large',
    small = 'small',
    mini = 'mini',
}

const InputSizeCss = (props: IInputProps & { theme: ITheme }): InterpolationValue[] | undefined => {
    if (props.theme && props.inputSize) {
        switch (props.inputSize) {
            case InputSize.large:
                return css`
                    height: 42px;
                    font-size: 16px;
                `;
            case InputSize.small:
                return css`
                    height: 30px;
                    font-size: 13px;
                `;
            case InputSize.mini:
                return css`
                    height: 22px;
                    font-size: 12px;
                `;
            default:
                console.error(`Input size \`${props.inputSize}\` is not a valid input size.`);
                return undefined;
        }
    }

    return css`
        height: 36px;
        font-size: 14px;
    `;
};

export default styled<IInputProps, 'input'>('input')`
    /* Remove native input css */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-color: ${props => (props.disabled ? props.theme.disabledColor : 'white')};
    border: 1px solid
        ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.defaultBorderColor)};
    border-radius: 4px;
    box-sizing: border-box;
    padding: 3px 10px;
    outline: none;
    line-height: 1;
    width: 180px;
    color: ${props => props.theme.defaultTextColor};
    transition: border-color 200ms;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'initial')};

    /* Resolve input size */
    ${InputSizeCss}

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.infoColor)};
        opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.infoColor)};
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.infoColor)};
    }

    :hover {
        border-color: ${props => !props.disabled && props.theme.infoColor};
    }

    :focus {
        border-color: ${props => !props.disabled && props.theme.primaryColor};
    }
`;
