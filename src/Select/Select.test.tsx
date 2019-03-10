import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Select from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles, expectRenderError } from '../../tests/testUtils';
import { DROPDOWN_ANIMATION_DURATION } from './styleConstants';
import { mockOptions, mockOptionGroups } from './mockData';

function expectDropdownHidden(dropdown: HTMLElement) {
    expect(dropdown).toHaveStyleRule('opacity', '0');
    expect(dropdown).toHaveStyleRule('transform', 'scaleY(0)');
}

function expectDropdownVisible(dropdown: HTMLElement) {
    expect(dropdown).toHaveStyleRule('opacity', '1');
    expect(dropdown).toHaveStyleRule('transform', 'scaleY(1)');
}

// Runs a function after dropdown animation finishes.
function waitForDropdownAnimation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, DROPDOWN_ANIMATION_DURATION + 1);
    });
}

afterEach(cleanup);

describe('Select', () => {
    testComponentCanHandleStyles(<Select />);

    test('should throw error when rendering children that are not options or option groups', () => {
        expectRenderError(
            <Select>
                <div>hello</div>
            </Select>,
            'The only valid child to a Select element is either a Select Option element or Select Option Group element.'
        );
    });

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

        waitForDropdownAnimation().then(() => {
            expectDropdownVisible(dropdown);
        });
    });

    test('should be able to open and close dropdown on input icon click', () => {
        const { container, getByTestId } = render(<Select />);
        const icon = container.querySelector('i') as HTMLInputElement;
        const dropdown = getByTestId('select-dropdown');

        expectDropdownHidden(dropdown);
        fireEvent.click(icon);

        waitForDropdownAnimation().then(() => {
            expectDropdownVisible(dropdown);
        });
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

        waitForDropdownAnimation().then(() => {
            expectDropdownVisible(dropdown);
            fireEvent.click(getByText('Another Element'));
            expectDropdownHidden(dropdown);
        });
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

        // Click first option
        const option = mockOptions[0];
        const optionElement = getByText(option.label);
        fireEvent.click(optionElement);

        // Input value should now be the option's label
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe(option.value);
    });

    test('should be able to attach onChange handler to get data whenever new option is selected', () => {
        const onChange = jest.fn();
        const { getByText } = render(
            <Select onChange={onChange}>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        );

        // Click first option
        const option = mockOptions[0];
        const optionElement = getByText(option.label);
        fireEvent.click(optionElement);

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(option);
    });

    test('should not close dropdown or update input when disabled option is clicked', () => {
        const mockOptionsWithDisabled = [
            {
                value: 'Option1',
                label: 'Option1',
                disabled: true,
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
        ];
        const { container, getByText, getByTestId } = render(
            <Select>
                {mockOptionsWithDisabled.map(option => (
                    <Select.Option
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        disabled={option.disabled}
                    />
                ))}
            </Select>
        );

        const dropdown = getByTestId('select-dropdown');

        // Open dropdown
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.click(input);

        waitForDropdownAnimation().then(() => {
            // Click disabled option
            const option = mockOptions[0];
            const optionElement = getByText(option.label);
            fireEvent.click(optionElement);

            // Input value should still be empty.
            expect(input.value).toBe('');
            // Dropdown should not have closed.
            expectDropdownVisible(dropdown);
        });
    });

    test('should not open dropdown if select is disabled', () => {
        const { container, getByTestId } = render(<Select disabled />);
        const input = container.querySelector('input') as HTMLInputElement;
        const dropdown = getByTestId('select-dropdown');

        expectDropdownHidden(dropdown);
        fireEvent.click(input);

        waitForDropdownAnimation().then(() => {
            expectDropdownHidden(dropdown);
        });
    });

    test('should be able to clear select with clearable prop', () => {
        const { container, getByText } = render(
            <Select clearable>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        );

        // Click first option
        const option = mockOptions[0];
        const optionElement = getByText(option.label);
        fireEvent.click(optionElement);

        // Input value should now be the option's label
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe(option.value);

        // Click clear icon
        const icon = container.querySelector('i') as HTMLInputElement;
        fireEvent.click(icon);
        expect(input.value).toBe('');
    });

    test('should be able to render list of option groups', () => {
        const { getByText } = render(
            <Select>
                {mockOptionGroups.map(group => {
                    return (
                        <Select.OptionGroup key={group.label} label={group.label}>
                            {group.options.map(option => {
                                return (
                                    <Select.Option
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                );
                            })}
                        </Select.OptionGroup>
                    );
                })}
            </Select>
        );

        // Should render every group's label and all options within each group.
        mockOptionGroups.forEach(group => {
            const groupLabel = getByText(group.label);
            expect(groupLabel).toBeTruthy();

            group.options.forEach(option => {
                const renderedOption = getByText(option.label);
                expect(renderedOption).toBeTruthy();
            });
        });
    });

    test('should not close dropdown when clicking on option group label', () => {
        const { container, getByTestId, getByText } = render(
            <Select>
                {mockOptionGroups.map(group => {
                    return (
                        <Select.OptionGroup key={group.label} label={group.label}>
                            {group.options.map(option => {
                                return (
                                    <Select.Option
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                );
                            })}
                        </Select.OptionGroup>
                    );
                })}
            </Select>
        );
        const input = container.querySelector('input') as HTMLInputElement;
        const dropdown = getByTestId('select-dropdown');

        // Open dropdown
        fireEvent.click(input);

        waitForDropdownAnimation().then(() => {
            expectDropdownVisible(dropdown);

            // Click on first option group label
            fireEvent.click(getByText(mockOptionGroups[0].label));

            waitForDropdownAnimation().then(() => {
                expectDropdownVisible(dropdown);
            });
        });
    });

    test('should be able to filter options when filterable prop is set', () => {
        const { container, getByText, queryByText } = render(
            <Select filterable>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select>
        );

        // Type '3' into input
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '3' } });

        // 'Option3' should be the only option remaining
        expect(getByText('Option3')).toBeTruthy();

        const restOfOptions = ['Option1', 'Option2', 'Option4', 'Option5'];
        restOfOptions.forEach(option => {
            const renderedOption = queryByText(option);
            expect(renderedOption).toBeFalsy();
        });
    });

    test('should be able to filter options inside of option groups when filterable prop is set', () => {
        const { container, getByText, queryByText } = render(
            <Select filterable>
                {mockOptionGroups.map(group => {
                    return (
                        <Select.OptionGroup key={group.label} label={group.label}>
                            {group.options.map(option => {
                                return (
                                    <Select.Option
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                );
                            })}
                        </Select.OptionGroup>
                    );
                })}
            </Select>
        );

        // Type '3' into input
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: '3' } });

        // 'Option3' should be the only option remaining
        expect(getByText('Option3')).toBeTruthy();

        const restOfOptions = ['Option1', 'Option2', 'Option4', 'Option5', 'Option6'];
        restOfOptions.forEach(option => {
            const renderedOption = queryByText(option);
            expect(renderedOption).toBeFalsy();
        });
    });
});
