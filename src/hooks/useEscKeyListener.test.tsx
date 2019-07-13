import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { renderHookTester } from '../../tests/testUtils';
import useEscKeyListener from './useEscKeyListener';

afterEach(cleanup);

describe('useEscKeyListener', () => {
    test('should run callback when esc key is pressed', () => {
        const callback = jest.fn();
        const { container } = renderHookTester(() => {
            useEscKeyListener(callback);
        });
        fireEvent.keyDown(container, { key: 'Escape' });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should not run callback when a key other than esc is pressed', () => {
        const callback = jest.fn();
        const { container } = renderHookTester(() => {
            useEscKeyListener(callback);
        });
        fireEvent.keyDown(container, { key: 'Enter' });
        expect(callback).not.toHaveBeenCalled();
    });
});
