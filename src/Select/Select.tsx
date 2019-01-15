import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import Input from '../Input';

const selectWidth = '240px';

interface ISelectProps extends IWithStyles {
    open?: boolean;
}

const Wrapper = styled<ISelectProps, 'div'>('div')`
    display: inline-block;
    cursor: pointer;
    font-family: system-ui;

    input {
        cursor: pointer;
        width: ${selectWidth};
    }

    i {
        transform: ${props => (props.open ? 'rotate(180deg)' : 'initial')};
        transition: transform 200ms;
    }
`;

const Dropdown = styled<ISelectProps, 'div'>('div')`
    min-width: ${selectWidth};
    z-index: 10;
    border: 1px solid ${props => props.theme.defaultBorderColor};
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
    margin: 5px 0;
    position: absolute;
    opacity: ${props => (props.open ? 1 : 0)};
    transform: ${props => (props.open ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: center top;
    transition: transform 200ms, opacity 200ms;
    /* top: 36px;
    left: 0px;
    will-change: top, left; */
`;

const DropdownList = styled.ul`
    position: relative;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    font-size: 14px;
    color: ${props => props.theme.defaultTextColor};
`;

const DropdownItem = styled.li`
    height: 36px;
    line-height: 1.5;
    box-sizing: border-box;
    padding: 8px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    :hover {
        background-color: ${props => props.theme.disabledColor};
    }
`;

const mock = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
];

const Select = React.forwardRef<any, ISelectProps>((props, ref) => {
    const [open, setOpen] = React.useState(false);

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

    const ownInputRef = React.useRef(null);
    const iconRef = React.useRef(null);
    const inputRef = (ref || ownInputRef) as React.RefObject<HTMLInputElement>;

    function closeDropdownOnClickAway(e: any) {
        /**
         * If the element we clicked on is our input or the input's icon,
         * we don't want to close the dropdown because the
         * input click handler will re-open it.
         */
        if (e.target !== inputRef.current && e.target !== iconRef.current) {
            setOpen(false);
        }
    }

    function onInputClick() {
        setOpen(prevOpen => !prevOpen);
    }

    return (
        <Wrapper className={props.className} style={props.style} open={open}>
            <Input
                ref={inputRef}
                readOnly
                placeholder="Select"
                icon="caret-bottom"
                iconSize={12}
                onClick={onInputClick}
                iconClickHandler={onInputClick}
                iconRef={iconRef}
            />
            <Dropdown open={open}>
                <DropdownList>
                    {mock.map(option => (
                        <DropdownItem key={option.value}>{option.label}</DropdownItem>
                    ))}
                </DropdownList>
            </Dropdown>
        </Wrapper>
    );
});

export default Select;
