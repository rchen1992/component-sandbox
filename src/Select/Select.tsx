import * as React from 'react';
import styled, { IWithStyles, css } from '../sc-utils';
import Input from '../Input';
import { IClickHandlerWithData } from 'types';
import { expandAndShow } from '../keyframes';
import { SELECT_WIDTH, DROPDOWN_ANIMATION_DURATION } from './styleConstants';

interface ISelectOption {
    value: string;
    label: string;
}

interface ISelectProps extends IWithStyles {
    defaultValue?: string;
    open?: boolean;
    disabled?: boolean;
    options?: ISelectOption[];
    children?: React.ReactNode;
    onChange?: (data: ISelectOption) => void;
}

interface IDropdownItemProps {
    value?: string;
    label?: string;
    disabled?: boolean;
    selectedValue?: string;
}

interface ISelectOptionProps extends IDropdownItemProps, IWithStyles {
    onClick?: IClickHandlerWithData<ISelectOption>;
}

const Wrapper = styled<ISelectProps, 'div'>('div')`
    display: inline-block;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    font-family: system-ui;

    input {
        cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
        width: ${SELECT_WIDTH};

        :focus {
            border-color: ${props => props.theme.infoColor};
        }
    }

    /* Rotate icon based on open/close state */
    i {
        transform: ${props => (props.open ? 'rotate(180deg)' : 'initial')};
        transition: transform 200ms;
    }
`;

const Dropdown = styled<ISelectProps, 'div'>('div')`
    min-width: ${SELECT_WIDTH};
    z-index: 10;
    border: 1px solid ${props => props.theme.defaultBorderColor};
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
    margin: 5px 0;
    position: absolute;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;

    ${props =>
        props.open &&
        css`
            animation: ${expandAndShow} ${DROPDOWN_ANIMATION_DURATION}ms linear;
            animation-fill-mode: forwards;
        `}
`;

const DropdownList = styled.ul`
    position: relative;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    font-size: 14px;
`;

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

const Select = React.forwardRef<any, ISelectProps>((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.defaultValue || '');

    /**
     * This effect listens for clicks on the document so that we can close the dropdown
     * when we click outside of the input.
     *
     * By providing empty array [] as second parameter to useEffect,
     * we are telling React that this effect doesn't depend on any
     * values from props or state, which means it will not re-run this effect
     * on every re-render.
     * This means it will behave much like componentDidMount and componentWillUnmount.
     */
    React.useEffect(() => {
        /**
         * The third parameter is `useCapture`, which captures this event and ensures
         * it fires before event listeners on the EventTarget.
         * More details: https://stackoverflow.com/questions/7398290/unable-to-understand-usecapture-parameter-in-addeventlistener
         *
         * We want `useCapture` to be true in case we click somewhere on the document that has an event handler
         * that stops propagation. We don't want to wait until the event bubbles up to the document.
         */
        document.addEventListener('click', closeDropdownOnClickAway, true);

        // Return function to cleanup on unmount.
        return () => {
            document.removeEventListener('click', closeDropdownOnClickAway, true);
        };
    }, []);

    const wrapperRef = React.useRef(null);

    function closeDropdownOnClickAway(e: any) {
        /**
         * If the element we clicked on is NOT our select element nor any
         * child node of it, then we clicked away from the select.
         * This should cause the dropdown to close.
         */
        let wrapperElement = (wrapperRef.current as unknown) as HTMLDivElement;
        if (wrapperElement !== e.target && !wrapperElement.contains(e.target)) {
            setOpen(false);
        }
    }

    function onInputClick() {
        if (!props.disabled) {
            // Toggle dropdown open/close state
            setOpen(prevOpen => !prevOpen);
        }
    }

    function onOptionClick(e: React.MouseEvent, data: ISelectOption) {
        setInputValue(data.label);

        if (props.onChange && data.value !== inputValue) {
            props.onChange(data);
        }

        setOpen(false);
    }

    const children = React.Children.map(props.children, child => {
        if (!React.isValidElement(child) || child.type !== SelectWithOption.Option) {
            throw new Error('The only valid child to a Select element is a Select Option element.');
        }

        let option = child as React.ReactElement<ISelectOptionProps>;

        let newOptionProps: ISelectOptionProps = { selectedValue: inputValue };
        // If option is disabled, don't give it a click handler at all.
        if (!option.props.disabled) {
            newOptionProps.onClick = onOptionClick;
        }

        return React.cloneElement(option, newOptionProps);
    });

    return (
        <Wrapper
            ref={wrapperRef}
            className={props.className}
            style={props.style}
            open={open}
            disabled={props.disabled}
        >
            <Input
                ref={ref}
                readOnly
                placeholder="Select"
                icon="caret-bottom"
                iconSize={12}
                onClick={onInputClick}
                iconClickHandler={onInputClick}
                value={inputValue}
                disabled={props.disabled}
            />
            <Dropdown open={open} data-testid="select-dropdown">
                <DropdownList>{children}</DropdownList>
            </Dropdown>
        </Wrapper>
    );
});

type SelectWithRef = React.ForwardRefExoticComponent<ISelectProps & React.RefAttributes<any>>;
const SelectWithOption = Select as SelectWithRef & {
    Option: React.ForwardRefExoticComponent<ISelectOptionProps & React.RefAttributes<any>>;
};

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
            {props.label}
        </DropdownItem>
    );
});

SelectWithOption.Option = SelectOption;

export default SelectWithOption;
