import * as React from 'react';
import { cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { renderHookTester } from '../../tests/testUtils';
import usePreviousProp from './usePreviousProp';

afterEach(cleanup);

describe('usePreviousProp', () => {
    test('should save previous value of prop between renders', () => {
        let prev;
        let curr;

        renderHookTester(() => {
            const [val, setVal] = React.useState(1);
            const prevVal = usePreviousProp(val);

            /**
             * After initial render, update state value.
             * On the next render, the current value should
             * be saved into previous value.
             */
            React.useEffect(() => {
                setVal(n => n + 1);
            }, []);

            /**
             * Expose variables so we can assert on them.
             */
            React.useEffect(() => {
                prev = prevVal;
                curr = val;
            });
        });

        expect(prev).toBe(1);
        expect(curr).toBe(2);
    });
});
