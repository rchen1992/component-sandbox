import * as React from 'react';
import styled, { IWithStyles, css } from '../sc-utils';
import { IChangeHandlerWithData } from '../types';
import CheckboxGroup, { ICheckboxGroupProps } from './CheckboxGroup';

export interface ICheckboxProps extends IWithStyles {
    children?: React.ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    value?: string;
    indeterminate?: boolean;
    onChange?: IChangeHandlerWithData<ICheckboxData>;
}

export interface ICheckboxData {
    prevChecked: boolean;
    value?: string;
}

type CheckboxWithRef = React.ForwardRefExoticComponent<
    ICheckboxProps & React.RefAttributes<HTMLInputElement>
>;

const Label = styled.label<ICheckboxProps>`
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    white-space: nowrap;
    position: relative;
    display: inline-block;
`;

const Box = styled.span<ICheckboxProps>`
    display: inline-block;
    position: relative;
    background-color: ${props => {
        if (props.checked || props.indeterminate) {
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
            if (props.checked || props.indeterminate) {
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

    ${props =>
        props.indeterminate
            ? css`
                  &::before {
                      content: '';
                      display: block;
                      position: absolute;
                      border: 1px solid white;
                      top: 50%;
                      left: 3px;
                      right: 3px;
                      margin-top: -1px;
                  }
              `
            : css`
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
                      transform: ${props.checked
                          ? 'rotate(45deg) scaleY(1)'
                          : 'rotate(45deg) scaleY(0)'};
                      transform-origin: center;
                      box-sizing: content-box;
                      transition: transform 200ms ease-out;
                  }
              `}
`;

const Input = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
`;

const BoxLabel = styled.span<ICheckboxProps>`
    font-size: 14px;
    font-family: system-ui;
    padding-left: 5px;
    position: relative;
    top: 1px;
    color: ${props => (props.disabled ? props.theme.infoColorAccent : 'black')};
`;

/**
|--------------------------------------------------
| Checkbox
|--------------------------------------------------
*/

const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const [checked, setChecked] = React.useState(!!props.defaultChecked);

    const finalChecked = props.checked === undefined ? checked : !!props.checked;

    function onClick(e: React.MouseEvent) {
        if (!props.disabled) {
            setChecked(prevChecked => !prevChecked);
        }
    }

    function onChange(e: React.ChangeEvent) {
        if (props.onChange) {
            props.onChange(e, {
                prevChecked: props.checked === undefined ? checked : !!props.checked,
                value: props.value,
            });
        }
    }

    return (
        <Label disabled={props.disabled} className={props.className} style={props.style}>
            <Box
                checked={finalChecked}
                disabled={props.disabled}
                indeterminate={props.indeterminate}
            />
            <BoxLabel disabled={props.disabled}>{props.children}</BoxLabel>
            <Input
                type="checkbox"
                checked={finalChecked}
                ref={ref}
                value={props.value}
                onChange={onChange}
                onClick={onClick} // clicks on the parent label will trigger this onClick
            />
        </Label>
    );
});

const CheckboxWithGroup = Checkbox as CheckboxWithRef & {
    Group: React.FunctionComponent<ICheckboxGroupProps>;
};

CheckboxWithGroup.Group = CheckboxGroup;

export default CheckboxWithGroup;
