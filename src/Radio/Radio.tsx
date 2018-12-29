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

    /* Inner circle */
    &::after {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: white;
        /* 
            The absolute positioning puts the top left corner of this inner circle
            at the center of the parent circle. Thus, it does NOT center the inner circle itself.

            In order to center the inner circle, we need to have the middle of this inner circle in
            the same place as the middle of the parent, rather than the top left of the inner circle
            at the middle of the parent.
            To accomplish this, we need to shift it by it's radius, up and to the left.
            
            This is what the translate(-50%,-50%) does. When you use translate with a percentage,
            the percentage actually refers to the element itself, rather than the parent. 
            This means 50% is half of the circle, or the radius.
        */
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
