import * as React from 'react';

/**
 * Custom hook that calls a custom close function
 * when clicking away from a particular element.
 */
export default function useCloseOnClickAway(targetElement: HTMLElement | null, closeFn: Function) {
    function closeOnClickAway(e: any) {
        /**
         * If we DON'T a target element,
         * any click should call the close function.
         *
         * If we DO have target element and we did not click on target element nor any
         * child node of it, then we have "clicked away".
         * This should cause our close function to run.
         */
        if (!targetElement || (targetElement !== e.target && !targetElement.contains(e.target))) {
            closeFn();
        }
    }

    /**
     * This effect depends on `targetElement`.
     * Usually when a component uses `useRef` to create a ref to a DOM node,
     * it is initially `null` before the first render, so `targetElement` will be `null` initially.
     * That is why it is important to re-run this effect when `targetElement` changes.
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
        document.addEventListener('click', closeOnClickAway, true);

        // Return function to cleanup on unmount.
        return () => {
            document.removeEventListener('click', closeOnClickAway, true);
        };
    }, [targetElement]);
}
