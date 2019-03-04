import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Checkbox from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles, expectRenderError } from '../../tests/testUtils';

afterEach(cleanup);

describe('Checkbox Group', () => {
    testComponentCanHandleStyles(<Checkbox.Group />);

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
