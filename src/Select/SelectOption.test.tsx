import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Select from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Select Option', () => {
    testComponentCanHandleStyles(<Select.Option />);

    test('should be able to pass ref to select options', () => {
        const ref = React.createRef<HTMLLIElement>();
        render(<Select.Option ref={ref} />);
        expect(ref.current instanceof HTMLLIElement).toBeTruthy();
    });

    test('should be able to pass onClick handler', () => {
        const onClick = jest.fn();
        const value = 'option';
        const { container } = render(
            <Select.Option onClick={onClick} label={value} value={value} />
        );
        fireEvent.click(container.firstElementChild as HTMLLIElement);
        expect(onClick).toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledWith(expect.anything(), { label: value, value });
    });

    test('should be able to provide custom template to options via children', () => {
        const value = 'myvalue';
        const { container } = render(
            <Select.Option label={value} value={value} data-testid="option">
                <span>hello</span>
                <span>world</span>
            </Select.Option>
        );

        const option = container.firstElementChild as HTMLDivElement;

        // Should have rendered children content
        expect(option.textContent).toMatch('hello');
        expect(option.textContent).toMatch('world');

        // Should not have rendered label text
        expect(option.textContent).not.toMatch(value);
    });
});
