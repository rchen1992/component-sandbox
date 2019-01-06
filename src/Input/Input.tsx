import * as React from 'react';
import styled, { css } from '../sc-utils';
import { inputFontSize, inputHeight } from './inputSize';

const borderRadius = '4px';

export interface IInputProps {
    disabled?: boolean;
    inputSize?: string;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
}

const Input = styled<IInputProps, 'input'>('input')`
    /* Remove native input css */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-color: ${props => (props.disabled ? props.theme.disabledColor : 'white')};
    border: 1px solid
        ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.defaultBorderColor)};
    border-radius: ${borderRadius};
    box-sizing: border-box;
    padding: 3px 10px;
    height: ${props => inputHeight(props)};
    font-size: ${props => inputFontSize(props)};
    outline: none;
    line-height: 1;
    width: 180px;
    color: ${props => props.theme.defaultTextColor};
    transition: border-color 200ms;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'initial')};

    /* If we have a prepended element, we need to reset the border corners of the left border. */
    ${props =>
        props.prepend &&
        css`
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        `}

    /* If we have an appended element, we need to reset the border corners of the right border. */
    ${props =>
        props.append &&
        css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        `}

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

const Wrapper = styled.div`
    display: inline-table;
`;

const Extension = styled<IInputProps, 'div'>('div')`
    background-color: hsl(210, 100%, 99%);
    border: 1px solid ${props => props.theme.defaultBorderColor};
    display: table-cell;
    border-radius: ${borderRadius};
    padding: 0 10px;
    color: ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.infoColor)};
    font-family: system-ui;
    font-size: ${props => inputFontSize(props)};
    vertical-align: middle;
`;

const Prepend = styled(Extension)`
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

const Append = styled(Extension)`
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

type InputWrapperProps = IInputProps &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>;

const InputWrapper = React.forwardRef<any, InputWrapperProps>((props, ref) => {
    const inputRef = ref as any;

    return (
        <Wrapper>
            {props.prepend && (
                <Prepend inputSize={props.inputSize} disabled={props.disabled}>
                    {props.prepend}
                </Prepend>
            )}
            <Input ref={inputRef} {...props} />
            {props.append && (
                <Append inputSize={props.inputSize} disabled={props.disabled}>
                    {props.append}
                </Append>
            )}
        </Wrapper>
    );
});

export default InputWrapper;
