import * as React from 'react';
import styled, { css } from '../sc-utils';
import { inputFontSize, inputHeight } from './inputSize';
import getIcon from '../icons';
import { countNewlines } from '../utils';
import { BORDER_RADIUS } from './styleConstants';

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
    iconRef?: React.RefObject<{}>;
    onChange?: (e: React.ChangeEvent) => void;
    iconClickHandler?: (e: React.MouseEvent) => void;
}

type InputType = IInputProps | (IInputProps & HTMLTextAreaElement);
const Input = styled.input<InputType>`
    /* Remove native input css */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    display: table-cell;
    background-color: ${props => (props.disabled ? props.theme.disabledColor : 'white')};
    border: 1px solid
        ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.defaultBorderColor)};
    border-radius: ${BORDER_RADIUS};
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

const Wrapper = styled.div<IInputProps>`
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
        color: ${props => props.theme.infoColorAccent};
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

const Extension = styled.div<IInputProps>`
    background-color: hsl(210, 100%, 99%);
    border: 1px solid ${props => props.theme.defaultBorderColor};
    display: table-cell;
    border-radius: ${BORDER_RADIUS};
    padding: 0 10px;
    color: ${props => (props.disabled ? props.theme.infoColorAccent : props.theme.infoColor)};
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

// type InputWrapperProps = IInputProps &
//     React.ClassAttributes<HTMLInputElement> &
//     React.InputHTMLAttributes<HTMLInputElement> &
//     React.ClassAttributes<HTMLTextAreaElement> &
//     React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * TODO: Figure out how to properly add type to the props.
 * The currently problem is that this can be an input element OR a textarea element.
 */
const InputWrapper = React.forwardRef<any, any>((props, ref) => {
    const [rows, setRows] = React.useState(
        typeof props.autosize === 'object' ? Math.max(props.autosize.minRows, 1) : 1
    );

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
                ref={ref}
                as={props.type === 'textarea' ? 'textarea' : 'input'}
                type={props.type}
                rows={props.type === 'textarea' && !!props.autosize ? rows : props.rows || null}
                onChange={onChange}
            />

            {Icon && <Icon onClick={props.iconClickHandler} ref={props.iconRef} />}

            {props.append && (
                <Append inputSize={props.inputSize} disabled={props.disabled}>
                    {props.append}
                </Append>
            )}
        </Wrapper>
    );
});

export default InputWrapper;
