import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Checkbox from './index';
// import { renderWithProvider } from '../../tests/testUtils';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Checkbox', () => {
    testComponentCanHandleStyles(<Checkbox />);

    test('should be able to toggle checkbox', () => {
        const { container } = render(<Checkbox />);
        expect(container.firstElementChild).toBeTruthy();

        // Check that checkbox is initially off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.checked).toBeFalsy();

        // Click checkbox wrapper
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's now on
        expect(input.checked).toBeTruthy();
    });

    test('should be able to render checkbox with label', () => {
        const label = 'hello world';
        const { queryByText } = render(<Checkbox>{label}</Checkbox>);
        expect(queryByText(label)).toBeTruthy();
    });

    test('should toggle checkbox when clicking on label', () => {
        const label = 'hello world';
        const { container, getByText } = render(<Checkbox>{label}</Checkbox>);

        // Check that checkbox is initially off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();

        // Click checkbox label
        const labelNode = getByText(label);
        fireEvent.click(labelNode);

        // Check that checkbox is now on
        expect(input.checked).toBeTruthy();
    });

    test('should be able to set disabled state and prevent toggling', () => {
        const { container } = render(<Checkbox disabled />);

        // Check that checkbox is initially off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();

        // Click checkbox wrapper
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's still off
        expect(input.checked).toBeFalsy();
    });
});
