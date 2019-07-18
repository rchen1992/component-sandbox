import * as React from 'react';
import styled, { css, IWithStyles } from '../sc-utils';
import {
    convertSliderValueToOffsetPosition,
    convertOffsetPositionToSliderValue,
    getNewPositionWithStep,
} from './util';
import { getStops } from './Stop';
import useMouseDrag, { onDraggingData } from '../hooks/useMouseDrag';

interface ISliderProps extends IWithStyles {
    startingValue?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    step?: number;
    showStops?: boolean;
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
    z-index: ${({ theme }) => theme.zIndexSliderBar};
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
    user-select: none;

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
        showStops = false,
        disabled = false,
        onChange,
        style,
        className,
    } = props;

    const [handlePositionX, setHandlePositionX] = React.useState(0);
    const { onMouseDown, dragging } = useMouseDrag(onDragging);

    const handleRef = React.useRef(null);
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
    const numStops = React.useRef((max - min) / step);
    React.useEffect(() => {
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
        if (disabled) {
            return;
        }

        onMouseDown(e);
    }

    /**
     * Callback function to call when dragging.
     *
     * Note: we have to use the `dragDeltaX` provided to the callback instead of
     * the one destructured from the `useMouseDrag` hook.
     * This is because this function forms a closure over the destructured
     * `dragDeltaX` variable, and while the dragging is happening, this callback
     * will be always fired with the same `dragDeltaX`.
     * By using the one provided as an argument, we get the accurate up-to-date value.
     */
    function onDragging(e: MouseEvent, { dragDeltaX }: onDraggingData) {
        /**
         * Get new handle position based on mouse delta.
         * Ensure it doesn't exceend min/max constraints.
         */
        const newPosition = Math.min(
            Math.max(0, handlePositionX + dragDeltaX),
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

    function onSliderClick(e: React.MouseEvent) {
        if (disabled) {
            return;
        }

        /**
         * Make sure we clicked any part of the slider other than the handle.
         */
        if (e.target === handleRef.current) {
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
        <Runway
            ref={sliderRef}
            style={style}
            className={className}
            onClick={onSliderClick}
            disabled={disabled}
        >
            <Bar width={handlePositionX} disabled={disabled} />
            <HandleWrapper
                ref={handleRef}
                offsetX={handlePositionX}
                onMouseDown={onHandleDown}
                dragging={dragging}
                disabled={disabled}
            >
                <Handle dragging={dragging} disabled={disabled} />
            </HandleWrapper>
            {showStops && getStops(numStops.current, step, max, min)}
        </Runway>
    );
});

export default Slider;
