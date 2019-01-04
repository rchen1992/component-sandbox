import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Checkbox from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles, expectRenderError } from '../../tests/testUtils';

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
        const ref = React.createRef();
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

    describe('Checkbox Group', () => {
        test('should throw error when trying to render a child element that is not a checkbox', () => {
            const element = (
                <Checkbox.Group>
                    <Checkbox>Option 1</Checkbox>
                    <span>hello world</span>
                </Checkbox.Group>
            );

            expectRenderError(
                element,
                'The only valid child to a Checkbox Group element is a Checkbox element.'
            );
        });

        test('should render child checkboxes as checked when their values are in the value array of the checkbox group', () => {
            const checkedBoxes = ['option2', 'option5'];
            const uncheckedBoxes = ['option1', 'option3', 'option4'];

            const { getByText } = render(
                <Checkbox.Group value={checkedBoxes}>
                    <Checkbox value="option1">option1</Checkbox>
                    <Checkbox value="option2">option2</Checkbox>
                    <Checkbox value="option3">option3</Checkbox>
                    <Checkbox value="option4">option4</Checkbox>
                    <Checkbox value="option5">option5</Checkbox>
                </Checkbox.Group>
            );

            uncheckedBoxes.forEach(value => {
                let option = getByText(value);
                let input = option.nextSibling as HTMLInputElement;
                expect(input.checked).toBe(false);
            });

            checkedBoxes.forEach(value => {
                let option = getByText(value);
                let input = option.nextSibling as HTMLInputElement;
                expect(input.checked).toBe(true);
            });
        });

        test('should be able to attach onChange handler that provides updated value list', () => {
            let mockValue;
            const onChange = jest.fn().mockImplementation(value => {
                mockValue = value;
            });
            const checkedBoxes = ['option2', 'option5'];

            const { getByLabelText } = render(
                <Checkbox.Group value={checkedBoxes} onChange={onChange}>
                    <Checkbox value="option1">option1</Checkbox>
                    <Checkbox value="option2">option2</Checkbox>
                    <Checkbox value="option3">option3</Checkbox>
                    <Checkbox value="option4">option4</Checkbox>
                    <Checkbox value="option5">option5</Checkbox>
                </Checkbox.Group>
            );

            // Click on the first checkbox
            let option1 = getByLabelText('option1');
            fireEvent.click(option1);

            // onChange handler should fire with updated value list
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(mockValue).toEqual([...checkedBoxes, 'option1']);
        });

        test('should be able to use min prop to enforce minimum number of checked boxes', () => {
            let mockValue;
            const onChange = jest.fn().mockImplementation(value => {
                mockValue = value;
            });
            const checkedBoxes = ['option2', 'option5'];

            const { getByLabelText } = render(
                <Checkbox.Group min={2} value={checkedBoxes} onChange={onChange}>
                    <Checkbox value="option1">option1</Checkbox>
                    <Checkbox value="option2">option2</Checkbox>
                    <Checkbox value="option3">option3</Checkbox>
                    <Checkbox value="option4">option4</Checkbox>
                    <Checkbox value="option5">option5</Checkbox>
                </Checkbox.Group>
            );

            // Try to uncheck one of the checked boxes
            let option = getByLabelText('option2');
            fireEvent.click(option);

            // onChange handler should fire with value list that is unchanged
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(mockValue).toEqual(checkedBoxes);
        });

        test('should be able to use max prop to enforce maximum number of checked boxes', () => {
            let mockValue;
            const onChange = jest.fn().mockImplementation(value => {
                mockValue = value;
            });
            const checkedBoxes = ['option2', 'option5'];

            const { getByLabelText } = render(
                <Checkbox.Group max={2} value={checkedBoxes} onChange={onChange}>
                    <Checkbox value="option1">option1</Checkbox>
                    <Checkbox value="option2">option2</Checkbox>
                    <Checkbox value="option3">option3</Checkbox>
                    <Checkbox value="option4">option4</Checkbox>
                    <Checkbox value="option5">option5</Checkbox>
                </Checkbox.Group>
            );

            // Try to check one of the unchecked boxes
            let option = getByLabelText('option1');
            fireEvent.click(option);

            // onChange handler should fire with value list that is unchanged
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(mockValue).toEqual(checkedBoxes);
        });
    });
});
