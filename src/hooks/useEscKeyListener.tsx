import * as React from 'react';

/**
 * Custom hook that listens for presses of the 'Esc' key
 * and runs an arbitrary callback.
 */
export default function useEscKeyListener(callback: Function) {
    function onKeyDown(e: any) {
        if (e.key === 'Escape') {
            callback();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    });
}
