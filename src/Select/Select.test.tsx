import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Select from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

function expectDropdownHidden(dropdown: HTMLElement) {
    expect(dropdown).toHaveStyleRule('opacity', '0');
    expect(dropdown).toHaveStyleRule('transform', 'scaleY(0)');
}

function expectDropdownVisible(dropdown: HTMLElement) {
    expect(dropdown).toHaveStyleRule('opacity', '1');
    expect(dropdown).toHaveStyleRule('transform', 'scaleY(1)');
}

// Mock options
const mockOptions = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
];

afterEach(cleanup);

describe('Select', () => {
    testComponentCanHandleStyles(<Select />);

    test('should be able to pass ref to input', () => {
        const ref = React.createRef();
        render(<Select ref={ref} />);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should be able to, open and close dropdown on input click', () => {
        const { container, getByTestId } = render(<Select />);
        const input = container.querySelector('input') as HTMLInputElement;
        const dropdown = getByTestId('select-dropdown');

        expectDropdownHidden(dropdown);
        fireEvent.click(input);
        expectDropdownVisible(dropdown);
    });

    test('should be able to open and close dropdown on input icon click', () => {
        const { container, getByTestId } = render(<Select />);
        const icon = container.querySelector('i') as HTMLInputElement;
        const dropdown = getByTestId('select-dropdown');

        expectDropdownHidden(dropdown);
        fireEvent.click(icon);
        expectDropdownVisible(dropdown);
    });

    test('should be able to open dropdown and then close it by clicking another element', () => {
        const { container, getByTestId, getByText } = render(
            <>
                <Select />
                <div>Another Element</div>
            </>
        );
        const input = container.querySelector('input') as HTMLInputElement;
        const dropdown = getByTestId('select-dropdown');

        expectDropdownHidden(dropdown);
        fireEvent.click(input);
        expectDropdownVisible(dropdown);
        fireEvent.click(getByText('Another Element'));
        expectDropdownHidden(dropdown);
    });

    test('should be able to render list of options in dropdown', () => {
        const { getByText } = render(
            <Select>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        );

        mockOptions.forEach(option => {
            const renderedOption = getByText(option.label);
            expect(renderedOption).toBeTruthy();
        });
    });

    test('should be able to select option in dropdown to set input value as option label', () => {
        const { container, getByText } = render(
            <Select>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        );

        // Open dropdown
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.click(input);

        // Click first option
        const option = mockOptions[0];
        const optionElement = getByText(option.label);
        fireEvent.click(optionElement);

        // Input value should now be the option's label
        expect(input.value).toBe(option.value);
    });

    test('should be able to attach onChange handler to get data whenever new option is selected', () => {
        const onChange = jest.fn();
        const { container, getByText } = render(
            <Select onChange={onChange}>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        );

        // Open dropdown
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.click(input);

        // Click first option
        const option = mockOptions[0];
        const optionElement = getByText(option.label);
        fireEvent.click(optionElement);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(option);
    });
});
