import * as React from 'react';
import Checkbox, { ICheckboxData, ICheckboxProps } from './Checkbox';
import { IWithStyles } from '../sc-utils';

export interface ICheckboxGroupProps extends IWithStyles {
    value?: string[];
    min?: number;
    max?: number;
    onChange?: (value: string[]) => void;
}

const CheckboxGroup: React.FunctionComponent<ICheckboxGroupProps> = props => {
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

    return (
        <div style={props.style} className={props.className}>
            {children}
        </div>
    );
};

export default CheckboxGroup;
