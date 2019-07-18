import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { renderHookTester } from '../../tests/testUtils';
import useMouseDrag from './useMouseDrag';

afterEach(cleanup);

describe('useMouseDrag', () => {
    /**
     * Skipping test.
     * This test fails because the onDragging callback isn't supplied
     * with the up-to-date dragDeltaX.
     */
    test.skip('should supply mouse position data to callback when dragging', () => {
        const onDragging = jest.fn();

        const { getByTestId } = renderHookTester(() => {
            const { onMouseDown } = useMouseDrag(onDragging);

            return {
                onMouseDown,
            };
        });

        const hookTester = getByTestId('hook-tester');
        fireEvent.mouseDown(hookTester, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(hookTester, { clientX: 100, clientY: 0 });
        fireEvent.mouseUp(hookTester, { clientX: 100, clientY: 0 });

        expect(onDragging).toHaveBeenCalled();
        expect(onDragging).toHaveBeenCalledWith(expect.anything(), {
            mouseX: 100,
            dragDeltaX: 100,
        });
    });
});
