import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import { IClickHandlerWithData } from 'types';
import { optionIsSelected } from './util';

export interface ISelectOption {
    value: string;
    label: string;
}

interface IDropdownItemProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selectedValues?: string[];
}

export interface ISelectOptionProps extends IDropdownItemProps, IWithStyles {
    onClick?: IClickHandlerWithData<ISelectOption>;
    children?: React.ReactNode;
}

const DropdownItem = styled.li<IDropdownItemProps>`
    height: 36px;
    line-height: 1.5;
    padding: 8px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: ${props =>
        optionIsSelected(props.selectedValues, props.value) ? props.theme.primaryColor : 'white'};
    color: ${props => {
        if (props.disabled) {
            return props.theme.infoColorAccent;
        }

        return optionIsSelected(props.selectedValues, props.value)
            ? 'white'
            : props.theme.defaultTextColor;
    }};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

    :hover {
        background-color: ${props =>
            optionIsSelected(props.selectedValues, props.value)
                ? props.theme.primaryColor
                : props.theme.lightBlueGray};
    }
`;

const SelectOption = React.forwardRef<HTMLLIElement, ISelectOptionProps>((props, ref) => {
    function onClick(e: React.MouseEvent) {
        if (props.onClick && !props.disabled) {
            props.onClick(e, {
                value: props.value || '',
                label: props.label || '',
            });
        }
    }

    return (
        <DropdownItem
            ref={ref}
            className={props.className}
            style={props.style}
            selectedValues={props.selectedValues}
            value={props.value}
            onClick={onClick}
            disabled={props.disabled}
        >
            {props.children || props.label}
        </DropdownItem>
    );
});

export default SelectOption;
