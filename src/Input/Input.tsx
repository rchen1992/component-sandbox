import * as React from 'react';
import styled, { css } from '../sc-utils';
import { inputFontSize, inputHeight } from './inputSize';
import getIcon from '../icons';

const borderRadius = '4px';

interface ITextareaAutosize {
    minRows: number;
    maxRows: number;
}

export interface IInputProps {
    disabled?: boolean;
    inputSize?: string;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    type?: string;
    autosize?: boolean | ITextareaAutosize;
    icon?: string;
    iconSize?: number;
    onChange?: (e: React.ChangeEvent) => void;
}

type InputType = IInputProps | (IInputProps & HTMLTextAreaElement);
const Input = styled<InputType, 'input'>('input')`
    /* Remove native input css */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    display: table-cell;
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

    /* If input has an icon, need to pad the right side so the text doesn't overlap the icon. */
    ${props =>
        !!props.icon &&
        css`
            padding-right: 35px;
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

    ${props =>
        props.type === 'textarea' &&
        css`
            padding: 5px 7px;
            line-height: 1.5;
            width: 414px;
            height: initial;
            resize: vertical;
        `};
`;

const Wrapper = styled<IInputProps, 'div'>('div')`
    display: inline-table;
    position: relative;

    /* Input icon styles */
    i {
        position: absolute;
        width: 35px;
        height: 100%;
        right: 0;
        top: 0;
        text-align: center;
        color: #bfcbd9;
        font-size: ${props => (!!props.iconSize ? `${props.iconSize}px` : inputFontSize(props))};

        &::after {
            content: '';
            height: 100%;
            width: 0;
            display: inline-block;
            vertical-align: middle;
        }
    }
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
    React.InputHTMLAttributes<HTMLInputElement> &
    React.ClassAttributes<HTMLTextAreaElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Returns number of newlines in a string.
 */
function countNewlines(s: string) {
    let count = 0;
    for (let char of s) {
        if (char === '\n') {
            count++;
        }
    }
    return count;
}

const InputWrapper = React.forwardRef<any, InputWrapperProps>((props, ref) => {
    const [rows, setRows] = React.useState(
        typeof props.autosize === 'object' ? Math.max(props.autosize.minRows, 1) : 1
    );
    const inputRef = ref as any;

    const Icon =
        props.icon && props.type !== 'textarea' && !props.append ? getIcon(props.icon) : null;

    function onChange(e: React.ChangeEvent) {
        /**
         * If this input is a textarea and autosize prop is specified,
         * calculate the number of rows based on the number of newlines in
         * the textarea value.
         */
        if (props.type === 'textarea' && !!props.autosize) {
            const textarea = e.currentTarget as HTMLTextAreaElement;
            const newRows = countNewlines(textarea.value) + 1;
            if (
                typeof props.autosize === 'boolean' ||
                (props.autosize.minRows < newRows && props.autosize.maxRows >= newRows)
            ) {
                setRows(newRows);
            }
        }

        if (props.onChange) {
            props.onChange(e);
        }
    }

    const { className, style, ...remainingProps } = props;
    return (
        <Wrapper
            inputSize={props.inputSize}
            iconSize={props.iconSize}
            className={className}
            style={style}
        >
            {props.prepend && (
                <Prepend inputSize={props.inputSize} disabled={props.disabled}>
                    {props.prepend}
                </Prepend>
            )}

            <Input
                {...remainingProps}
                ref={inputRef}
                as={props.type === 'textarea' ? 'textarea' : 'input'}
                type={props.type}
                rows={props.type === 'textarea' && !!props.autosize ? rows : props.rows || null}
                onChange={onChange}
            />

            {Icon && <Icon />}

            {props.append && (
                <Append inputSize={props.inputSize} disabled={props.disabled}>
                    {props.append}
                </Append>
            )}
        </Wrapper>
    );
});

export default InputWrapper;
