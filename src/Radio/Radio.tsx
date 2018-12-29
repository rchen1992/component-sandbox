import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import { IChangeHandlerWithData } from 'types';

const Label = styled<IRadioProps, 'label'>('label')`
    display: inline-block;
    cursor: pointer;
    position: relative;
`;

const Circle = styled<IRadioProps, 'span'>('span')`
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid
        ${props => (props.checked ? props.theme.primaryColor : props.theme.defaultBorderColor)};
    background-color: ${props => (props.checked ? props.theme.primaryColor : 'white')};
    box-sizing: border-box;
    vertical-align: middle;
    line-height: 1;

    &:hover {
        ${props => !props.checked && `border-color: ${props.theme.primaryColor}`}
    }

    &::after {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: ${props =>
            props.checked ? 'translate(-50%, -50%) scaleY(1)' : 'translate(-50%, -50%) scaleY(0)'};
        transition: transform 150ms ease-in;
    }
`;

const Input = styled<IRadioProps, 'input'>('input')`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
`;

const CircleLabel = styled<IRadioProps, 'span'>('span')`
    font-size: 14px;
    padding-left: 5px;
    font-family: system-ui;
    position: relative;
    top: 1px;
`;

interface IRadioData {
    value?: string;
}

interface IRadioProps extends IWithStyles {
    checked?: boolean;
    value?: string;
    onChange?: IChangeHandlerWithData<IRadioData>;
}

const Radio = React.forwardRef<any, IRadioProps>((props, ref) => {
    function onChange(e: React.ChangeEvent) {
        if (props.onChange) {
            props.onChange(e, {
                value: props.value,
            });
        }
    }

    return (
        <Label style={props.style} className={props.className}>
            <Circle checked={props.checked} />
            <Input
                type="radio"
                checked={props.checked}
                ref={ref}
                value={props.value}
                onChange={onChange}
            />
            <CircleLabel>{props.children}</CircleLabel>
        </Label>
    );
});

export default Radio;
