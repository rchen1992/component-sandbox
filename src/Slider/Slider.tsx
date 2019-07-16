import * as React from 'react';
import styled, { css, IWithStyles } from '../sc-utils';
import {
    convertSliderValueToOffsetPosition,
    convertOffsetPositionToSliderValue,
    getNewPositionWithStep,
} from './util';

interface ISliderProps extends IWithStyles {
    startingValue?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    step?: number;
    onChange?: (value: number) => void;
}

interface IHandleWrapperProps {
    offsetX?: number;
    style?: object;
    dragging?: boolean;
    disabled?: boolean;
}

interface IHandleProps {
    dragging?: boolean;
    disabled?: boolean;
}

interface IBarProps {
    width?: number;
    disabled?: boolean;
    style?: object;
}

interface IRunwayProps {
    disabled?: boolean;
}

const Runway = styled.div<IRunwayProps>`
    width: 100%;
    height: 4px;
    margin: 16px 0;
    background-color: ${({ theme }) => theme.lightBlueGray};
    border-radius: 3px;
    position: relative;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    vertical-align: middle;
`;

const BarStyles = (props: IBarProps) => css`
    height: 4px;
    background-color: ${({ theme }) =>
        props.disabled ? theme.defaultBorderColor : theme.primaryColor};
    position: absolute;
    left: 0%;
    width: 10%;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
`;

const Bar = styled.div.attrs<IBarProps, IBarProps>(props => ({
    style: {
        width: `${props.width}px`,
    },
}))`
    ${props => BarStyles(props)}
`;

const HandleWrapperStyles = (props: IHandleWrapperProps) => css`
    width: 36px;
    height: 36px;
    position: absolute;
    top: -16px;
    z-index: ${({ theme }) => theme.zIndexSliderHandle};
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    cursor: ${() => {
        if (props.disabled) {
            return 'not-allowed';
        }

        return props.dragging ? 'grabbing' : 'grab';
    }};

    :hover > div {
        transform: ${props.disabled ? 'none' : 'scale(1.5)'};
    }
`;

const HandleWrapper = styled.div.attrs<IHandleWrapperProps, IHandleWrapperProps>(props => ({
    style: {
        left: `${props.offsetX}px`,
    },
}))`
    ${props => HandleWrapperStyles(props)}
`;

const Handle = styled.div<IHandleProps>`
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: ${({ disabled, theme }) =>
        disabled ? theme.defaultBorderColor : theme.primaryColor};
    border-radius: 50%;
    transition: transform 200ms;

    transform: ${props => {
        if (props.disabled) {
            return 'none';
        }

        return props.dragging ? 'scale(1.5)' : 'none';
    }};
`;

const Slider = React.forwardRef<HTMLDivElement, ISliderProps>((props, ref) => {
    const {
        min = 0,
        max = 100,
        startingValue = min,
        step = 1,
        disabled = false,
        onChange,
        style,
        className,
    } = props;

    /**
     * @dragging - am I currently dragging?
     * @handlePositionX - the position of the slider handle.
     *  Represents a px value for the offset from the left.
     * @mouseX - the current clientX position of the mouse
     * @startMouseX - the starting clientX position of the mouse when we started dragging
     */
    const [dragging, setDragging] = React.useState(false);
    const [handlePositionX, setHandlePositionX] = React.useState(0);
    const [mouseX, setMouseX] = React.useState(0);
    const [startMouseX, setStartMouseX] = React.useState(0);

    const barRef = React.useRef(null);
    const ownRef = React.useRef(null);
    const sliderRef: any = ref || ownRef;

    /**
     * Calculate initial position of slider before initial render.
     */
    React.useLayoutEffect(() => {
        setHandlePositionX(
            convertSliderValueToOffsetPosition(
                max,
                min,
                startingValue,
                sliderRef.current.offsetWidth
            )
        );
    }, []);

    /**
     * Keep track of the computed difference between
     * where we first started dragging and where we are
     * currently dragging.
     */
    const dragDeltaX = React.useRef(0);
    React.useEffect(() => {
        dragDeltaX.current = mouseX - startMouseX;
    });

    /**
     * Keep track of the current value of the slider.
     */
    const currentValue = React.useRef(startingValue);
    React.useEffect(() => {
        const newValue = convertOffsetPositionToSliderValue(
            max,
            min,
            handlePositionX,
            sliderRef.current.offsetWidth
        );

        if (currentValue.current !== newValue) {
            currentValue.current = newValue;

            if (onChange) {
                onChange(newValue);
            }
        }
    });

    /**
     * Get the absolute width (in pixels) between every "stop".
     * A stop is each point on the slider defined by the length of the `step`.
     *
     * For example, a slider that goes from 0-200 with a `step` of 10 will have 20 stops,
     * and the width of each of those stops will be the width of the slider divided by 20.
     *
     * This number can end up being a float.
     * We don't do any rounding here so that we can
     * keep the precision as high as possible.
     */
    const stopWidth = React.useRef(1);
    const numStops = React.useRef(1);
    React.useEffect(() => {
        numStops.current = (max - min) / step;
        stopWidth.current = sliderRef.current.offsetWidth / numStops.current;
    }, []);

    /**
     * Log any prop validation errors on mount.
     */
    React.useEffect(() => {
        if (min >= max) {
            console.error(
                `Slider component: \`min\` prop value (${min}) should be less than \`max\` prop value (${max}).`
            );
        } else if (startingValue < min || startingValue > max) {
            console.error(
                `Slider component: \`startingValue\` prop value (${startingValue}) should be between min prop value (${min}) and max prop value (${max}).`
            );
        }

        if (step > max - min) {
            console.error(
                `Slider component: \`step\` prop value (${step}) should not be larger than the difference between max and min.`
            );
        }

        if (step < 0) {
            console.error(
                `Slider component: \`step\` prop value (${step}) should not be negative.`
            );
        }
    }, []);

    function onHandleDown(e: React.MouseEvent) {
        e.preventDefault();

        if (disabled) {
            return;
        }

        onDragStart(e);

        window.addEventListener('mousemove', onDragging);
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('contextmenu', onDragEnd);
    }

    function onDragStart(e: React.MouseEvent) {
        setDragging(true);
        setStartMouseX(e.clientX);
        setMouseX(e.clientX);
    }

    function onDragging(e: MouseEvent) {
        /**
         * As we drag, we update the current X position of the mouse.
         *
         * This causes this component to re-render and re-run effects,
         * which updates our computed `dragDeltaX`.
         */
        setMouseX(e.clientX);

        /**
         * Get new handle position based on mouse delta.
         * Ensure it doesn't exceend min/max constraints.
         *
         * The `handlePositionX` below is static because we add/remove the
         * `mousemove` event listener every time we start/stop dragging.
         * This means we will always call the same version of the `onDragging` function
         * while it is moving (with the same value for `handlePositionX`),
         * even if the component re-renders in the middle of the event.
         */
        const newPosition = Math.min(
            Math.max(0, handlePositionX + dragDeltaX.current),
            sliderRef.current.offsetWidth
        );

        /**
         * In case `step` prop was specified,
         * we calculate the nearest step here in order
         * to get the position based on the nearest step.
         */
        const newPositionWithStep = getNewPositionWithStep(
            newPosition,
            stopWidth.current,
            numStops.current
        );

        setHandlePositionX(newPositionWithStep);
    }

    function onDragEnd(e: MouseEvent) {
        setDragging(false);

        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);
    }

    function onSliderClick(e: React.MouseEvent) {
        if (disabled) {
            return;
        }

        /**
         * Make sure we clicked on either the slider or the bar, not the handle.
         */
        if (e.target !== e.currentTarget && e.target !== barRef.current) {
            return;
        }

        /**
         * - get the slider's offset from the left side of the window
         * - get the current mouse X position
         * - subtract the current mouse position from the slider's left offset
         *  to get the new handle position
         * - make sure that new position conforms with step value
         */
        const sliderOffsetLeft = e.currentTarget.getBoundingClientRect().left;
        const newPosition = getNewPositionWithStep(
            e.clientX - sliderOffsetLeft,
            stopWidth.current,
            numStops.current
        );

        setHandlePositionX(newPosition);
    }

    return (
        <>
            <div>{dragging ? 'dragging' : 'not dragging'}</div>
            <div>slider width: {sliderRef.current ? sliderRef.current.offsetWidth : 0}</div>
            <div>offset: {handlePositionX}</div>
            <div>start drag x: {startMouseX}</div>
            <div>current drag x: {mouseX}</div>
            <div>offset delta x: {dragDeltaX.current}</div>
            <div>starting value: {startingValue}</div>
            <div>internal current value: {currentValue.current}</div>

            <Runway
                ref={sliderRef}
                style={style}
                className={className}
                onClick={onSliderClick}
                disabled={disabled}
            >
                <Bar ref={barRef} width={handlePositionX} disabled={disabled} />
                <HandleWrapper
                    offsetX={handlePositionX}
                    onMouseDown={onHandleDown}
                    dragging={dragging}
                    disabled={disabled}
                >
                    <Handle dragging={dragging} disabled={disabled} />
                </HandleWrapper>
            </Runway>
        </>
    );
});

export default Slider;