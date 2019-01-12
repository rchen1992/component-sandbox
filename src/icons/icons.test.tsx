import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import getIcon from './index';
import 'jest-styled-components';

afterEach(cleanup);

describe('Icons', () => {
    test('should be able to get icon', () => {
        const Icon = getIcon('caret-bottom');
        expect(Icon).toBeTruthy();
        const { container } = render(<div>{Icon}</div>);
        expect(container.querySelector('i')).toBeTruthy();
    });
});
