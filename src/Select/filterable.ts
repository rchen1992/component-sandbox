import * as React from 'react';
import SelectWithCompoundComponents from './Select';
import { ISelectOptionProps } from './SelectOption';

/**
 * Filter function for an array of React children.
 * If the `filterable` prop is set on the Select component,
 * this function will filter out all Select Options whose label
 * doesn't contain the current input value.
 */
const filterByLabel = (filterable: boolean | undefined, inputValue: string) => (
    child: React.ReactChild
) => {
    if (!React.isValidElement(child)) {
        throw new Error('Provided an invalid element as a child to Select.');
    }

    if (filterable && child.type === SelectWithCompoundComponents.Option) {
        let option = child as React.ReactElement<ISelectOptionProps>;
        if (
            option.props.label &&
            !option.props.label.toLowerCase().includes(inputValue.toLowerCase())
        ) {
            return false;
        }
    }

    return true;
};

export default filterByLabel;
