import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';

const Box = styled<ICheckboxProps, 'span'>('span')`
    display: inline-block;
    position: relative;
    background-color: ${props => (props.checked ? props.theme.primaryColor : 'white')};
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.primaryColor};
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 100ms;

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

interface ICheckboxProps extends IWithStyles {
    defaultChecked?: boolean;
    checked?: boolean;
}

const Checkbox = React.forwardRef<any, ICheckboxProps>((props, ref) => {
    const [checked, setChecked] = React.useState(props.defaultChecked);

    return (
        <label>
            <Box checked={checked} onClick={() => setChecked(!checked)} />
            <Input type="checkbox" ref={ref} />
        </label>
    );
});

export default Checkbox;
