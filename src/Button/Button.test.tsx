import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import Button from './Button';

afterEach(cleanup);

describe('Button', () => {
    test('should render', () => {
        const { queryByText } = render(<Button label="hello" onClick={() => {}} />);
        expect(queryByText('hello')).toBeTruthy();
    });
});
