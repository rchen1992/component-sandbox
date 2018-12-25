import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';

const Label = styled.label`
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    display: inline-block;
`;

const Box = styled<ICheckboxProps, 'span'>('span')`
    display: inline-block;
    position: relative;
    background-color: ${props => (props.checked ? props.theme.primaryColor : 'white')};
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.primaryColor};
    box-sizing: border-box;
    transition: background-color 100ms;
    line-height: 1;
    vertical-align: middle;

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
`;

const Input = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
`;

const BoxLabel = styled.span`
    font-size: 14px;
    font-family: system-ui;
    padding-left: 5px;
    position: relative;
    top: 1px;
`;

interface ICheckboxProps extends IWithStyles {
    children?: React.ReactNode;
    defaultChecked?: boolean;
    checked?: boolean;
}

const Checkbox = React.forwardRef<any, ICheckboxProps>((props, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked);

    function onClick() {
        setChecked(!checked);
    }

    return (
        <Label>
            <Box checked={checked} onClick={onClick} />
            <BoxLabel onClick={onClick}>{props.children}</BoxLabel>
            <Input type="checkbox" ref={ref} />
        </Label>
    );
});

export default Checkbox;
