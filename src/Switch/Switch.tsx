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

    // The switch's value will be forced if we provide a `value` prop.
    const finalValue = props.value || value;

    function toggleValue() {
        // Don't toggle if we are forcing the value.
        if (!props.value) {
            setValue(!value);
        }
    }

    return (
        <label>
            <Input type="checkbox" defaultChecked={finalValue} />
            <Slider onClick={toggleValue} value={finalValue} />
        </label>
    );
};

export default Switch;
