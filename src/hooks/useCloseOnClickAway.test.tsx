import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import useCloseOnClickAway from './useCloseOnClickAway';
import 'jest-styled-components';
import { renderHookTester } from '../../tests/testUtils';
import useForceUpdate from './useForceUpdate';

afterEach(cleanup);

/**
 * Setup hook for our test component.
 */
function useSetup() {
    /**
     * We have to run a force update after initial re-render
     * because during the initial render, the passed in `ref`
     * has no value. This `ref` then gets passed to `useCloseOnClickAway`
     * which will not run the close function because `targetElement` is null.
     *
     * Therefore, once we force re-render, the ref then gets attached to the
     * our test DOM element, and the `useCloseOnClickAway` effect re-runs.
     */
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        forceUpdate();
    }, []);
}

describe('useCloseOnClickAway', () => {
    test('should call onClose when clicking away from element', () => {
        const onClose = jest.fn();

        renderHookTester((ref: any) => {
            useSetup();
            useCloseOnClickAway(ref.current as any, true, onClose);
        });

        fireEvent.click(document.body);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('should not call onClose when clicking on element itself', () => {
        const onClose = jest.fn();

        const { ref } = renderHookTester((ref: any) => {
            useSetup();
            useCloseOnClickAway(ref.current as any, true, onClose);
        });

        fireEvent.click(ref.current as HTMLDivElement);
        expect(onClose).not.toHaveBeenCalled();
    });

    test('should not call onClose when clicking on child of element', () => {
        const onClose = jest.fn();

        const { getByText } = renderHookTester((ref: any) => {
            useSetup();
            useCloseOnClickAway(ref.current as any, true, onClose);
        }, <div>Hello World</div>);

        fireEvent.click(getByText('Hello World'));
        expect(onClose).not.toHaveBeenCalled();
    });

    test('should not call onClose when element is not open', () => {
        const onClose = jest.fn();

        renderHookTester((ref: any) => {
            useSetup();
            useCloseOnClickAway(ref.current as any, false, onClose);
        });

        fireEvent.click(document.body);
        expect(onClose).not.toHaveBeenCalled();
    });
});
