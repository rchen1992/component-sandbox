import * as React from 'react';

export interface onDraggingData {
    dragDeltaX: number;
    mouseX: number;
    startMouseX: number;
}

export type OnDraggingCallback = (e: MouseEvent, data: onDraggingData) => void;

/**
 * Custom hook that calculates mouse positioning during drag.
 * Currently only handles horizontal X values, but can be easily
 * expanded to handle Y values.
 */
export default function useMouseDrag(onDraggingCallback?: OnDraggingCallback) {
    /**
     * @dragging - am I currently dragging?
     * @mouseX - the current clientX position of the mouse
     * @startMouseX - the starting clientX position of the mouse when we started dragging
     */
    const [dragging, setDragging] = React.useState(false);
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

    function onMouseDown(e: React.MouseEvent) {
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
         * Call provided callback.
         * Here can use the mouse position data to do anything we want.
         */
        if (onDraggingCallback) {
            onDraggingCallback(e, { dragDeltaX: dragDeltaX.current, mouseX, startMouseX });
        }
    }

    function onDragEnd(e: MouseEvent) {
        setDragging(false);

        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('contextmenu', onDragEnd);
    }

    return {
        dragging,
        mouseX,
        startMouseX,
        dragDeltaX: dragDeltaX.current,
        onMouseDown,
    };
}
