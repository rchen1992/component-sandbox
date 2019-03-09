import * as React from 'react';
import styled, { IWithStyles, css } from '../sc-utils';
import Input from '../Input';
import { expandAndShow } from '../keyframes';
import { SELECT_WIDTH, DROPDOWN_ANIMATION_DURATION } from './styleConstants';
import { getIconContent } from '../icons';
import SelectOption, { ISelectOption, ISelectOptionProps } from './SelectOption';
import SelectOptionGroup, { ISelectOptionGroupProps } from './SelectOptionGroup';
import filterByLabel from './filterable';

interface ISelectProps extends IWithStyles {
    defaultValue?: string;
    open?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    filterable?: boolean;
    options?: ISelectOption[];
    children?: React.ReactNode;
    onChange?: (data: ISelectOption) => void;
}

type SelectWithRef = React.ForwardRefExoticComponent<ISelectProps & React.RefAttributes<any>>;

const Wrapper = styled<ISelectProps, 'div'>('div')`
    display: inline-block;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    font-family: system-ui;
    position: relative;

    input {
        cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
        width: ${SELECT_WIDTH};

        :focus {
            border-color: ${props => props.theme.infoColor};
        }

        :hover + i::before {
            content: ${props =>
                props.clearable
                    ? `'${getIconContent('circle-close')}'`
                    : `'${getIconContent('caret-bottom')}'`};
        }
    }

    /* Rotate icon based on open/close state */
    i {
        transform: ${props => (props.open ? 'rotate(180deg)' : 'initial')};
        transition: transform 200ms;

        :hover {
            ::before {
                content: ${props =>
                    props.clearable
                        ? `'${getIconContent('circle-close')}'`
                        : `'${getIconContent('caret-bottom')}'`};
            }

            color: ${props =>
                props.clearable ? props.theme.infoColor : props.theme.infoColorAccent};
        }
    }
`;

// const TagWrapper = styled.div`
//     z-index: 1;
//     max-width: 208px;
//     position: absolute;
//     top: 50%;
//     /* Translate with percentage moves it a percentage of this elements own height, not the parent. */
//     transform: translateY(-50%);
// `;

const Dropdown = styled<ISelectProps, 'div'>('div')`
    min-width: ${SELECT_WIDTH};
    max-height: 274px;
    overflow: scroll;
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

const Select = React.forwardRef<any, ISelectProps>((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.defaultValue || '');
    const clearable = props.clearable && !!inputValue;
    const wrapperRef = React.useRef(null);

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

    function onIconClick() {
        if (clearable && !props.disabled) {
            setInputValue('');
            setOpen(false);
        } else {
            onInputClick();
        }
    }

    function onInputChange(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setInputValue(target.value);
    }

    function onOptionClick(e: React.MouseEvent, data: ISelectOption) {
        setInputValue(data.label);

        if (props.onChange && data.value !== inputValue) {
            props.onChange(data);
        }

        setOpen(false);
    }

    const children = React.Children.toArray(props.children)
        .filter(filterByLabel(props.filterable, inputValue))
        .map((child: React.ReactElement<{}>) => {
            if (child.type === SelectWithCompoundComponents.Option) {
                let option = child as React.ReactElement<ISelectOptionProps>;

                let newOptionProps: ISelectOptionProps = { selectedValue: inputValue };
                // If option is disabled, don't give it a click handler at all.
                if (!option.props.disabled) {
                    newOptionProps.onClick = onOptionClick;
                }

                return React.cloneElement(option, newOptionProps);
            } else if (child.type === SelectWithCompoundComponents.OptionGroup) {
                let group = child as React.ReactElement<ISelectOptionGroupProps>;

                return React.cloneElement(group, {
                    onOptionClick,
                    inputValue,
                    filterable: props.filterable,
                });
            } else {
                throw new Error(
                    'The only valid child to a Select element is either a Select Option element or Select Option Group element.'
                );
            }
        });

    return (
        <Wrapper
            ref={wrapperRef}
            className={props.className}
            style={props.style}
            open={open}
            disabled={props.disabled}
            clearable={clearable}
        >
            {/* <TagWrapper /> */}
            <Input
                ref={ref}
                readOnly={!props.filterable}
                placeholder="Select"
                icon="caret-bottom"
                iconSize={12}
                onClick={onInputClick}
                iconClickHandler={onIconClick}
                value={inputValue}
                disabled={props.disabled}
                onChange={props.filterable ? onInputChange : undefined}
            />
            <Dropdown open={open} data-testid="select-dropdown">
                <DropdownList>{children}</DropdownList>
            </Dropdown>
        </Wrapper>
    );
});

const SelectWithCompoundComponents = Select as SelectWithRef & {
    Option: React.ForwardRefExoticComponent<ISelectOptionProps & React.RefAttributes<any>>;
    OptionGroup: React.ForwardRefExoticComponent<
        ISelectOptionGroupProps & React.RefAttributes<any>
    >;
};

SelectWithCompoundComponents.Option = SelectOption;
SelectWithCompoundComponents.OptionGroup = SelectOptionGroup;

export default SelectWithCompoundComponents;
