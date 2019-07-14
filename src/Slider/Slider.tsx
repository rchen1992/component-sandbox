import * as React from 'react';
import styled, { css } from '../sc-utils';
import { convertSliderValueToOffsetPosition, convertOffsetPositionToSliderValue } from './util';

interface ISliderProps {
    startingValue?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

interface IHandleWrapperProps {
    offsetX?: number;
    style?: object;
    dragging?: boolean;
}

interface IBarProps {
    width?: number;
    style?: object;
}

const Runway = styled.div`
    width: 100%;
    height: 4px;
    margin: 16px 0;
    background-color: ${({ theme }) => theme.defaultBorderColor};
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
`;

const BarStyles = (props: IBarProps) => css`
    height: 4px;
    background-color: ${({ theme }) => theme.primaryColor};
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
    border: 1px solid black;
    text-align: center;
    cursor: ${props.dragging ? 'grabbing' : 'grab'};
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const HandleWrapper = styled.div.attrs<IHandleWrapperProps, IHandleWrapperProps>(props => ({
    style: {
        left: `${props.offsetX}px`,
    },
}))`
    ${props => HandleWrapperStyles(props)}
`;

const Handle = styled.div`
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 50%;
`;

const Slider = React.forwardRef<HTMLDivElement, ISliderProps>((props, ref) => {
    const { min = 0, max = 100, startingValue = min, onChange } = props;

    if (min >= max) {
        console.error(
            `Slider component: \`min\` prop value (${min}) should be less than \`max\` prop value (${max}).`
        );
    } else if (startingValue < min || startingValue > max) {
        console.error(
            `Slider component: \`startingValue\` prop value (${startingValue}) should be between min prop value (${min}) and max prop value (${max}).`
        );
    }

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
        currentValue.current = convertOffsetPositionToSliderValue(
            max,
            min,
            handlePositionX,
            sliderRef.current.offsetWidth
        );
    });

    function onHandleDown(e: React.MouseEvent) {
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
         * We then adjust the handle position based on that delta.
         *
         * Note: we don't use a callback here to access the previous
         * `handlePositionX` because if we used the value from
         * the previous render, every pixel we drag would change the
         * position by the current delta.
         *
         * The `handlePositionX` below is static because we add/remove the
         * `mousemove` event listener every time we start/stop dragging.
         * This means we will always call the same version of the `onDragging` function
         * while it is moving (with the same value for `handlePositionX`),
         * even if the component re-renders in the middle of the event.
         */
        setHandlePositionX(
            Math.min(
                Math.max(0, handlePositionX + dragDeltaX.current),
                sliderRef.current.offsetWidth
            )
        );
    }

    function onDragEnd(e: MouseEvent) {
        setDragging(false);

        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);

        if (onChange) {
            onChange(currentValue.current);
        }
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
            <div>current value: {currentValue.current}</div>
            <Runway ref={sliderRef}>
                <Bar width={handlePositionX} />
                <HandleWrapper
                    offsetX={handlePositionX}
                    onMouseDown={onHandleDown}
                    dragging={dragging}
                >
                    <Handle />
                </HandleWrapper>
            </Runway>
        </>
    );
});

export default Slider;
