import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Radio from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles, expectRenderError } from '../../tests/testUtils';

afterEach(cleanup);

describe('Radio group', () => {
    testComponentCanHandleStyles(<Radio.Group />);

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
