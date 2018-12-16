import * as React from 'react';
import styled from '../sc-utils';

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled<ISwitchProps, 'span'>('span')`
    width: 50px;
    height: 27px;
    display: inline-block;
    border-radius: 20px;
    background-color: ${props =>
        props.value ? props.theme.primaryColor : props.theme.infoColorAccent};
    position: relative;
    transition: background-color 400ms;
    cursor: pointer;

    &::before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        background-color: white;
        position: relative;
        top: 4px;
        left: 4px;
        transform: ${props => (props.value ? 'translateX(22px)' : 'none')};
        transition: transform 400ms;
    }
`;

interface ISwitchProps {
    value?: boolean;
    defaultValue?: boolean;
}

const Switch: React.FunctionComponent<ISwitchProps> = props => {
    const [value, setValue] = React.useState(props.defaultValue);

    return (
        <label>
            <Input type="checkbox" defaultChecked={props.defaultValue} />
            <Slider onClick={() => setValue(!value)} value={value} />
        </label>
    );
};

export default Switch;
