import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';

const Label = styled<ICheckboxProps, 'label'>('label')`
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    white-space: nowrap;
    position: relative;
    display: inline-block;
`;

const Box = styled<ICheckboxProps, 'span'>('span')`
    display: inline-block;
    position: relative;
    background-color: ${props => {
        if (props.checked) {
            return props.disabled ? props.theme.infoColorAccent : props.theme.primaryColor;
        } else {
            return props.disabled ? props.theme.infoColorLight : 'white';
        }
    }};
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid
        ${props => {
            if (props.checked) {
                return props.disabled ? props.theme.infoColorAccent : props.theme.primaryColor;
            } else {
                return props.disabled
                    ? props.theme.infoColorAccent
                    : props.theme.defaultBorderColor;
            }
        }};
    box-sizing: border-box;
    transition: background-color 100ms;
    line-height: 1;
    vertical-align: middle;

    &::after {
        content: '';
        width: 4px;
        height: 8px;
        border: 2px solid white;
        border-left: none;
        border-top: none;
        position: absolute;
        top: 1px;
        left: 5px;
        z-index: 1;
        transform: ${props =>
            props.checked ? 'rotate(45deg) scaleY(1)' : 'rotate(45deg) scaleY(0)'};
        transform-origin: center;
        box-sizing: content-box;
        transition: transform 200ms ease-out;
    }
`;

const Input = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
`;

const BoxLabel = styled<ICheckboxProps, 'span'>('span')`
    font-size: 14px;
    font-family: system-ui;
    padding-left: 5px;
    position: relative;
    top: 1px;
    color: ${props => (props.disabled ? props.theme.infoColorAccent : 'black')};
`;

interface ICheckboxProps extends IWithStyles {
    children?: React.ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    value?: string | number;
}

const Checkbox = React.forwardRef<any, ICheckboxProps>((props, ref) => {
    const [checked, setChecked] = React.useState(!!props.defaultChecked);

    function onClick(e: React.MouseEvent) {
        /**
         * Prevent default click.
         * Since this handler is attached to `label`,
         * clicks will also click on the `input`, which will trigger 2 click events.
         */
        e.preventDefault();

        if (!props.disabled) {
            setChecked(prevChecked => !prevChecked);
        }
    }

    return (
        <Label
            disabled={props.disabled}
            className={props.className}
            style={props.style}
            onClick={onClick}
        >
            <Box checked={checked} disabled={props.disabled} />
            <BoxLabel disabled={props.disabled}>{props.children}</BoxLabel>
            <Input
                type="checkbox"
                checked={checked}
                ref={ref}
                value={props.value}
                onChange={() => {}}
            />
        </Label>
    );
});

export default Checkbox;
