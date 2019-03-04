import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import { IClickHandlerWithData } from 'types';

export interface ISelectOption {
    value: string;
    label: string;
}

interface IDropdownItemProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selectedValue?: string;
}

export interface ISelectOptionProps extends IDropdownItemProps, IWithStyles {
    onClick?: IClickHandlerWithData<ISelectOption>;
}

const DropdownItem = styled<IDropdownItemProps, 'li'>('li')`
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    padding: 8px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: ${props =>
        props.selectedValue === props.value ? props.theme.primaryColor : 'white'};
    color: ${props => {
        if (props.disabled) {
            return props.theme.infoColorAccent;
        }

        return props.selectedValue === props.value ? 'white' : props.theme.defaultTextColor;
    }};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

    :hover {
        background-color: ${props =>
            props.selectedValue === props.value
                ? props.theme.primaryColor
                : props.theme.disabledColor};
    }
`;

const SelectOption = React.forwardRef<any, ISelectOptionProps>((props, ref) => {
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
            selectedValue={props.selectedValue}
            value={props.value}
            onClick={onClick}
            disabled={props.disabled}
        >
            {props.children || props.label}
        </DropdownItem>
    );
});

export default SelectOption;
