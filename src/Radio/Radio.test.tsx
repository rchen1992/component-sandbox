import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Radio from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles, expectRenderError } from '../../tests/testUtils';

afterEach(cleanup);

describe('Checkbox', () => {
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
        const ref = React.createRef();
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

    describe('Radio group', () => {
        test('should not be able to use elements other than Radios inside Radio Group', () => {
            const element = (
                <Radio.Group>
                    <Radio value="value1">Option 1</Radio>
                    <span>hello world</span>
                </Radio.Group>
            );

            expectRenderError(
                element,
                'The only valid child to a Radio Group element is a Radio element.'
            );
        });

        test('should be able to set initial value and get updated values on clicking', () => {
            let mockValue;
            const onChange = jest.fn().mockImplementation((e, data) => (mockValue = data.value));
            const value = 'option1';

            const { getByText, getByLabelText } = render(
                <Radio.Group value={value} onChange={onChange}>
                    <Radio value="option1">option1</Radio>
                    <Radio value="option2">option2</Radio>
                    <Radio value="option3">option3</Radio>
                </Radio.Group>
            );

            function expectInputCheckedState(textValues: string[], checked: boolean) {
                textValues.forEach(text => {
                    let option = getByText(text);
                    let input = option.nextSibling as HTMLInputElement;
                    expect(input.checked).toBe(checked);
                });
            }

            // Make sure that the correct radio button is selected
            expectInputCheckedState(['option2', 'option3'], false);
            expectInputCheckedState(['option1'], true);

            // Click on a different radio button
            const newValue = 'option2';
            fireEvent.click(getByLabelText(newValue));

            // Check that onChange returns the newly selected radio
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(mockValue).toBe(newValue);
        });
    });
});
