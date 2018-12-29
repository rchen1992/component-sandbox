import * as React from 'react';
import styled, { IWithStyles, css } from '../sc-utils';
import { IChangeHandlerWithData } from 'types';

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
                      transform: ${props =>
                          props.checked ? 'rotate(45deg) scaleY(1)' : 'rotate(45deg) scaleY(0)'};
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

const BoxLabel = styled<ICheckboxProps, 'span'>('span')`
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

interface ICheckboxProps extends IWithStyles {
    children?: React.ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    value?: string;
    indeterminate?: boolean;
    onChange?: IChangeHandlerWithData<ICheckboxData>;
}

interface ICheckboxData {
    prevChecked: boolean;
    value?: string;
}

type CheckboxWithRef = React.ForwardRefExoticComponent<ICheckboxProps & React.RefAttributes<any>>;

const Checkbox = React.forwardRef<any, ICheckboxProps>((props, ref) => {
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

/**
|--------------------------------------------------
| Checkbox Group
|--------------------------------------------------
*/

interface ICheckboxGroupProps {
    value?: string[];
    min?: number;
    max?: number;
    onChange?: (value: string[]) => void;
}

const CheckboxWithGroup = Checkbox as CheckboxWithRef & {
    Group: React.FunctionComponent<ICheckboxGroupProps>;
};

CheckboxWithGroup.Group = props => {
    function onChange(e: React.ChangeEvent, data: ICheckboxData) {
        if (!props.onChange) {
            return;
        }

        let newValue = props.value || [];

        // If checkbox doesn't have a value, simply call onChange with old value list.
        if (!data.value) {
            props.onChange(newValue);
            return;
        }

        // Length restrictions for value list
        const max = props.max !== undefined ? props.max : Number.MAX_SAFE_INTEGER;
        const min = props.min !== undefined ? props.min : 0;

        /**
         * Calculate the new value list so we can pass it to the onChange prop.
         *
         * If checkbox is currently checked, we want to uncheck it.
         * As long as we are above the minimum number of checked boxes, remove it from value list.
         */
        if (data.prevChecked && newValue.includes(data.value) && newValue.length > min) {
            newValue = newValue.filter(val => val !== data.value);
        } else if (!data.prevChecked && !newValue.includes[data.value] && newValue.length < max) {
            // Otherwise, if it is currently unchecked, we want to check it.
            // As long as we are under the maximum number of checked boxes, add it to value list.
            newValue = [...newValue, data.value as string];
        }

        props.onChange(newValue);
    }

    const children = React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child) || child.type !== Checkbox) {
            throw new Error(
                'The only valid child to a Checkbox Group element is a Checkbox element.'
            );
        }

        let checkbox = child as React.ReactElement<ICheckboxProps>;
        if (!props.value) {
            return child;
        }

        /**
         * Check for checkbox value. If undefined, default it to the child's index.
         */
        let checkboxValue = checkbox.props.value;
        if (checkboxValue === undefined) {
            console.error(
                'Every child of a checkbox group should have a `value` prop. If not specified, it will default to the index of the child.'
            );
            checkboxValue = index.toString();
        }

        return React.cloneElement(checkbox, {
            value: checkboxValue,
            checked: props.value.includes(checkboxValue),
            onChange,
        });
    });

    return <div>{children}</div>;
};

export default CheckboxWithGroup;
