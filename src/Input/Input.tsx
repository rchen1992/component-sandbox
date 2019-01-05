// import * as React from 'react';
import styled from '../sc-utils';

interface IInputProps {
    disabled?: boolean;
}

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
    height: 36px;
    padding: 3px 10px;
    outline: none;
    line-height: 1;
    font-size: 14px;
    width: 180px;
    color: ${props => props.theme.defaultTextColor};
    transition: border-color 200ms;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'initial')};

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
