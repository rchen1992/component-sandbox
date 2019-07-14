import * as React from 'react';
import styled, { css } from '../sc-utils';

interface ISliderProps {}

interface IHandleWrapperProps {
    offsetX?: number;
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

const Bar = styled.div``;

const HandleWrapperStyles = (props: IHandleWrapperProps) => css`
    width: 36px;
    height: 36px;
    position: absolute;
    top: -16px;
    z-index: ${({ theme }) => theme.zIndexSliderHandle};
    transform: translateX(-50%);
    border: 1px solid black;
    text-align: center;
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
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

    /**
     * Keep track of the computed difference between
     * where we first started dragging and where we are
     * currently dragging.
     */
    const dragDeltaX = React.useRef(0);
    React.useEffect(() => {
        dragDeltaX.current = mouseX - startMouseX;
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
        setHandlePositionX(Math.max(0, handlePositionX + dragDeltaX.current));
    }

    function onDragEnd(e: MouseEvent) {
        setDragging(false);

        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);
    }

    return (
        <>
            <div>{dragging ? 'dragging' : 'not dragging'}</div>
            <div>offset: {handlePositionX}</div>
            <div>start drag x: {startMouseX}</div>
            <div>current drag x: {mouseX}</div>
            <div>offset delta x: {dragDeltaX.current}</div>
            <Runway>
                <Bar />
                <HandleWrapper offsetX={handlePositionX} onMouseDown={onHandleDown}>
                    <Handle />
                </HandleWrapper>
            </Runway>
        </>
    );
});

export default Slider;
