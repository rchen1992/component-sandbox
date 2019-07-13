import * as React from 'react';
import { cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { renderHookTester } from '../../tests/testUtils';
import useForceUpdate from './useForceUpdate';

afterEach(cleanup);

describe('useForceUpdate', () => {
    test('should re-render when force update is called', () => {
        const fn = jest.fn();
        renderHookTester(() => {
            const forceUpdate = useForceUpdate();

            // Use function to keep track of renders
            React.useEffect(() => {
                fn();
            });

            /**
             * Forcing an update should cause another
             * render after the initial render.
             */
            React.useEffect(() => {
                forceUpdate();
            });
        });

        // Total number of renders should be 2
        expect(fn).toHaveBeenCalledTimes(2);
    });
});
