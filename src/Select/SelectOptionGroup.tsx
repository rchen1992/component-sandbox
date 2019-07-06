import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import SelectOption, { ISelectOptionProps, ISelectOption } from './SelectOption';
import { IClickHandlerWithData } from 'types';
import filterByLabel from './filterable';

export interface ISelectOptionGroupProps extends IWithStyles {
    label?: string;
    inputValue?: string;
    selectedValues?: string[];
    filterable?: boolean;
    children?: React.ReactNode;
    onOptionClick?: IClickHandlerWithData<ISelectOption>;
}

const Group = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    /* First child is the title of the group, so we want to ignore that. */
    li:not(:first-child) {
        padding-left: 20px;
    }
`;

const Title = styled.li`
    padding-left: 10px;
    font-size: 12px;
    color: ${props => props.theme.infoColor};
    height: 30px;
    line-height: 30px;
`;

const SelectOptionGroup = React.forwardRef<HTMLUListElement, ISelectOptionGroupProps>(
    (props, ref) => {
        const children = React.Children.toArray(props.children)
            .filter(filterByLabel(props.filterable, props.inputValue || ''))
            .map(child => {
                if (!React.isValidElement(child) || child.type !== SelectOption) {
                    throw new Error(
                        'The only valid child to a Select Option Group element is a Select Option element.'
                    );
                }

                let option = child as React.ReactElement<ISelectOptionProps>;

                let newOptionProps: ISelectOptionProps = { selectedValues: props.selectedValues };
                // If option is disabled, don't give it a click handler at all.
                if (!option.props.disabled) {
                    newOptionProps.onClick = props.onOptionClick;
                }

                return React.cloneElement(option, newOptionProps);
            });

        return (
            <Group ref={ref} className={props.className} style={props.style}>
                <Title>{props.label}</Title>
                {children}
            </Group>
        );
    }
);

export default SelectOptionGroup;
