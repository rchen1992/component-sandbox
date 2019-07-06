import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Radio from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Radio', () => {
    testComponentCanHandleStyles(<Radio />);

    test('should be able to render a radio button with checked input', () => {
        const { container } = render(<Radio checked={true}>Option</Radio>);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeTruthy();
    });

    test('should be able to render radio button without checked input', () => {
        const { container } = render(<Radio checked={false}>Option</Radio>);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();
    });

    test('should be able to pass value to radio input', () => {
        const value = 'option';
        const { container } = render(<Radio value={value}>Option</Radio>);

        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe(value);
    });

    test('should be able to attach onChange handler that provides input value', () => {
        let mockValue;
        const value = 'option';
        const onChange = jest.fn().mockImplementation((e, data) => (mockValue = data.value));
        const { container } = render(
            <Radio value={value} onChange={onChange}>
                Option
            </Radio>
        );

        fireEvent.click(container.firstElementChild as Element);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(mockValue).toBe(value);
    });

    test('should be able to pass ref to input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Radio ref={ref}>Option</Radio>);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should be able to set disabled state', () => {
        const onChange = jest.fn();
        const { container } = render(
            <Radio disabled onChange={onChange}>
                Option
            </Radio>
        );

        fireEvent.click(container.firstElementChild as Element);

        expect(onChange).not.toHaveBeenCalled();
    });
});
