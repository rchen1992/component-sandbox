/**
 * Returns true if option is current "selected".
 * Does so by checking if option's value exists in the array of selected values.
 */
export const optionIsSelected = (
    selectedValues: string[] | undefined,
    value: string | undefined
) => {
    return selectedValues && value ? selectedValues.includes(value) : false;
};
