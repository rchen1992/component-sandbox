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
    position: relative;
    transition: background-color 400ms;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    background-color: ${props => {
        if (props.value) {
            return props.aliasForOnColor || props.theme.primaryColor;
        }

        if (props.disabled) {
            return props.theme.infoColorLightAccent;
        }

        return props.offColor || props.theme.infoColorAccent;
    }};

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
    cursor: pointer;
`;

const OnText = styled(Text)`
    margin-left: 6px;
    color: ${props => (props.value ? props.theme.linkColor : 'black')};
`;

const OffText = styled(Text)`
    margin-right: 6px;
    color: ${props => (!props.value ? props.theme.linkColor : 'black')};
`;

interface ISwitchProps {
    value?: boolean;
    defaultValue?: boolean;
    onColor?: string;
    offColor?: string;
    onText?: string;
    offText?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler;
}

const Switch: React.FunctionComponent<ISwitchProps> = props => {
    const [value, setValue] = React.useState(!!props.defaultValue);

    // The switch's value will be forced if we provide a `value` prop.
    const finalValue = props.value !== undefined ? !!props.value : value;

    function toggleValue() {
        // Don't toggle if we are forcing the value.
        if (!props.disabled && !props.value) {
            setValue(!value);
        }
    }

    function onClick(e: React.MouseEvent) {
        /**
         * Prevent default click.
         * Since this handler is attached to `label`,
         * clicks will also click on the `input`, which will trigger 2 click events.
         */
        e.preventDefault();

        // If we were provided a click handler from a parent component, call it now.
        if (props.onClick) {
            props.onClick(e);
        }

        toggleValue();
    }

    return (
        <label onClick={onClick}>
            <Input
                type="checkbox"
                checked={finalValue}
                disabled={!!props.disabled}
                onChange={() => {}} // to silence warning; not needed because input is hidden and onChange will never fire
            />
            {props.offText && <OffText value={finalValue}>{props.offText}</OffText>}
            <Slider
                value={finalValue}
                aliasForOnColor={props.onColor}
                offColor={props.offColor}
                disabled={props.disabled}
                data-testid="switch-slider"
            />
            {props.onText && <OnText value={finalValue}>{props.onText}</OnText>}
        </label>
    );
};

export default Switch;
