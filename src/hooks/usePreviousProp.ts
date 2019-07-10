import * as React from 'react';

/**
 * Saves a previous value into a ref.
 * Useful for saving a prop's old value to compare
 * with the current value.
 */
export default function usePreviousProp(value: any) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
