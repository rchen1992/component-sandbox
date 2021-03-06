import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import { lighten, stripUnit } from 'polished';
import { IFocusHandlerWithData, IClickHandlerWithData } from 'types';

interface ILabelProps {
    onClick?: React.MouseEventHandler;
}

interface IInputProps {
    value?: string | number;
    allowFocus?: boolean;
}

interface ISliderProps extends ISwitchProps {
    // Alias for the onColor prop, since using onColor emits a React warning.
    aliasForOnColor?: string;
}

interface ISwitchData {
    checked: boolean;
    value: string | number;
}

interface ISwitchProps extends IWithStyles {
    checked?: boolean;
    defaultChecked?: boolean;
    onColor?: string;
    offColor?: string;
    onText?: string;
    offText?: string;
    disabled?: boolean;
    textClassName?: string;
    allowFocus?: boolean;
    width?: number;
    onValue?: string | number;
    offValue?: string | number;
    onFocus?: IFocusHandlerWithData<ISwitchData>;
    onBlur?: IFocusHandlerWithData<ISwitchData>;
    onClick?: IClickHandlerWithData<ISwitchData>;
}

const Label = styled.label<ILabelProps>`
    position: relative;
`;

const Input = styled.input<IInputProps>`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;

    /* The input must be on the page for it to be focused. */
    display: ${props => (props.allowFocus ? 'initial' : 'none')};

    /* When input is focused, put a focus ring around the slider */
    &:focus + span {
        box-shadow: 0 0 2px ${props => props.theme.linkColor};
    }
`;

const Slider = styled.span<ISliderProps>`
    width: ${props => (props.width ? `${props.width}px` : props.theme.defaultSwitchWidth)};
    height: 26px;
    display: inline-block;
    border-radius: 20px;
    position: relative;
    transition: background-color 400ms;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    background-color: ${props => {
        let color = props.offColor || props.theme.infoColorAccent;
        if (props.checked) {
            color = props.aliasForOnColor || props.theme.primaryColor;
        }

        if (props.disabled) {
            color = lighten(0.1, color);
        }

        return color;
    }};

    &::before {
        content: '';
        width: ${props => props.theme.defaultSwitchCoreLength};
        height: ${props => props.theme.defaultSwitchCoreLength};
        border-radius: 50%;
        display: inline-block;
        background-color: white;
        position: relative;
        top: ${props => props.theme.defaultSwitchCorePadding};
        left: ${props => props.theme.defaultSwitchCorePadding};
        transform: ${props => {
            if (!props.checked) {
                return 'none';
            }

            const width = props.width || (stripUnit(props.theme.defaultSwitchWidth) as number);
            const length = stripUnit(props.theme.defaultSwitchCoreLength) as number;
            const padding = stripUnit(props.theme.defaultSwitchCorePadding) as number;

            return `translateX(${width - (2 * padding + length)}px)`;
        }};
        transition: transform 400ms;
    }
`;

const Text = styled.span<ISwitchProps>`
    font-weight: 500;
    transition: color 400ms;
    cursor: pointer;
`;

const OnText = styled(Text)`
    margin-left: 6px;
    color: ${props => (props.checked ? props.theme.linkColor : 'black')};
`;

const OffText = styled(Text)`
    margin-right: 6px;
    color: ${props => (!props.checked ? props.theme.linkColor : 'black')};
`;

const Switch = React.forwardRef<HTMLInputElement, ISwitchProps>((props, ref) => {
    const [checked, setChecked] = React.useState(!!props.defaultChecked);
    const ownRef = React.useRef(null);

    // The switch's checked state will be forced if we provide a `checked` prop.
    const finalChecked = props.checked !== undefined ? !!props.checked : checked;

    // Use passed in ref or our own ref.
    const inputRef = ref || ownRef;

    /**
     * Helper function to get the svalue of the input.
     * Defaults to 'on' and 'off';
     */
    function getValue(checked: boolean) {
        return checked ? props.onValue || 'on' : props.offValue || 'off';
    }

    function onClick(e: React.MouseEvent) {
        /**
         * Prevent default click.
         * Since this handler is attached to `label`,
         * clicks will also click on the `input`, which will trigger 2 click events.
         */
        e.preventDefault();

        // Don't toggle if we are forcing the checked state.
        if (!props.disabled && !props.checked) {
            setChecked(prevChecked => !prevChecked);
        }

        /**
         * If we are allowing focus, focus on the input now.
         */
        if (props.allowFocus) {
            let clickedRef = inputRef as any;
            clickedRef.current.focus();
        }

        // If we were provided a click handler from a parent component, call it now.
        if (props.onClick) {
            /**
             * Note: the setChecked above is async, so the `checked` we reference here is
             * not updated yet. Therefore, we have to flip the `checked` flag manually.
             */
            const newChecked = props.checked !== undefined ? props.checked : !checked;
            props.onClick(e, {
                checked: newChecked,
                value: getValue(newChecked),
            });
        }
    }

    function onFocus(e: React.FocusEvent) {
        if (props.onFocus) {
            /**
             * TODO: investigate this issue.
             *
             * We are returning the current state of checked in the payload
             * because the act of focusing may not flip the flag.
             *
             * If an onClick occurs and toggles the checked state, this onFocus will not reflect the new checked state.
             */
            const finalChecked = props.checked !== undefined ? !!props.checked : checked;
            props.onFocus(e, {
                checked: finalChecked,
                value: getValue(finalChecked),
            });
        }
    }

    function onBlur(e: React.FocusEvent) {
        if (props.onBlur) {
            const finalChecked = props.checked !== undefined ? !!props.checked : checked;
            props.onBlur(e, {
                checked: finalChecked,
                value: getValue(finalChecked),
            });
        }
    }

    return (
        <Label onClick={onClick}>
            {props.offText && (
                <OffText className={props.textClassName} checked={finalChecked}>
                    {props.offText}
                </OffText>
            )}

            <Input
                ref={inputRef}
                type="checkbox"
                value={getValue(finalChecked)}
                checked={finalChecked}
                disabled={!!props.disabled}
                allowFocus={props.allowFocus}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={() => {}} // to silence warning; not needed because input is hidden and onChange will never fire
            />

            <Slider
                className={props.className}
                style={props.style}
                checked={finalChecked}
                aliasForOnColor={props.onColor}
                offColor={props.offColor}
                disabled={props.disabled}
                width={props.width}
                data-testid="switch-slider"
            />

            {props.onText && (
                <OnText className={props.textClassName} checked={finalChecked}>
                    {props.onText}
                </OnText>
            )}
        </Label>
    );
});

export default Switch;
