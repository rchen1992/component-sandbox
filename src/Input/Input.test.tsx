import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Input from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Input', () => {
    testComponentCanHandleStyles(<Input />);

    test('should be able to pass ref to input', () => {
        const ref = React.createRef();
        render(<Input ref={ref} />);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should be able to pass native props through input wrapper', () => {
        const placeholder = 'placeholder';
        const { container } = render(<Input placeholder={placeholder} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.placeholder).toBe(placeholder);
    });
});
