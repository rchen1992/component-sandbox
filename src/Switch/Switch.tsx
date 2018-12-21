import * as React from 'react';
import styled from '../sc-utils';

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

interface ISliderProps extends ISwitchProps {
    // Alias for the onColor prop, since using onColor emits a React warning.
    aliasForOnColor?: string;
}

const Slider = styled<ISliderProps, 'span'>('span')`
    width: 50px;
    height: 26px;
    display: inline-block;
    border-radius: 20px;
    background-color: ${props =>
        props.value
            ? props.aliasForOnColor || props.theme.primaryColor
            : props.offColor || props.theme.infoColorAccent};
    position: relative;
    transition: background-color 400ms;
    cursor: pointer;

    &::before {
        content: '';
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: inline-block;
        background-color: white;
        position: relative;
        top: 4px;
        left: 4px;
        transform: ${props => (props.value ? 'translateX(24px)' : 'none')};
        transition: transform 400ms;
    }
`;

const Text = styled<ISwitchProps, 'span'>('span')`
    font-weight: 500;
    font-family: system-ui;
    transition: color 400ms;
`;

const OnText = styled(Text)`
    margin-left: 6px;
    color:  ${props => props.value ? props.theme.linkColor : 'black'};
`;

const OffText = styled(Text)`
    margin-right: 6px;
    color:  ${props => !props.value ? props.theme.linkColor : 'black'};
`;

interface ISwitchProps {
    value?: boolean;
    defaultValue?: boolean;
    onColor?: string;
    offColor?: string;
    onText?: string;
    offText?: string;
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
            {props.offText && <OffText value={finalValue}>{props.offText}</OffText>}
            <Slider onClick={toggleValue} value={finalValue} aliasForOnColor={props.onColor} offColor={props.offColor} />
            {props.onText && <OnText value={finalValue}>{props.onText}</OnText>}
        </label>
    );
};

export default Switch;
