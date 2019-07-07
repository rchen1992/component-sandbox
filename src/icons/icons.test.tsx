import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import getIcon from './index';
import 'jest-styled-components';

afterEach(cleanup);

describe('Icons', () => {
    test('should be able to get icon', () => {
        const Icon = getIcon('caret-bottom');
        const { container } = render(<Icon />);
        expect(container.querySelector('i')).toBeTruthy();
    });

    test('should be caching icon components', () => {
        // Expect that calling getIcon twice with the same icon will return the same reference.
        const Icon = getIcon('caret-bottom');
        const Icon2 = getIcon('caret-bottom');
        expect(Icon).toBe(Icon2);
    });
});
