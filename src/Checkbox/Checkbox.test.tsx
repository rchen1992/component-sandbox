import * as React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Checkbox from './index';
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

    test('should be to render checkbox with forced checked state', () => {
        const { container } = render(<Checkbox checked />);

        // Check that checkbox is on
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeTruthy();

        // Click checkbox wrapper
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's still on
        expect(input.checked).toBeTruthy();
    });

    test('should be able to render checkbox with label', () => {
        const label = 'hello world';
        const { queryByText } = render(<Checkbox>{label}</Checkbox>);
        expect(queryByText(label)).toBeTruthy();
    });

    test('should toggle checkbox when clicking on label', () => {
        const label = 'hello world';
        const { container, getByLabelText } = render(<Checkbox>{label}</Checkbox>);

        // Check that checkbox is initially off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();

        // Click checkbox label
        const labelNode = getByLabelText(label);
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

    test('should be able to set value on input', () => {
        const value = 'checkboxvalue';
        const { container } = render(<Checkbox value={value} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe(value);
    });

    test('should be able to pass ref to input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref} defaultChecked />);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should be able to attach onChange handler that provides checkbox data', () => {
        let mockData;
        const value = 'myvalue';
        const onChange = jest.fn().mockImplementation((e, data) => {
            mockData = data;
        });
        const { container } = render(<Checkbox value={value} onChange={onChange} />);

        // Click checkbox wrapper
        fireEvent.click(container.firstElementChild as Element);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(mockData).toMatchObject({ prevChecked: false, value });
    });
});
