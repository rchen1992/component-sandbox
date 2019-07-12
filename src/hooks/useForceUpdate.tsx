import * as React from 'react';

/**
 * Custom hook that implements forceUpdate
 * functionality for functional components.
 *
 * Introduces an arbitrary boolean state variable that toggles
 * when you call forceUpdate.
 */
export default function useForceUpdate() {
    const [value, setValue] = React.useState(true);
    return () => setValue(!value);
}
