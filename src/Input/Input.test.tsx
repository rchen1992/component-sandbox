import * as React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Input from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Input', () => {
    testComponentCanHandleStyles(<Input />);

    test('should be able to pass ref to input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} />);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should be able to pass native props through input wrapper', () => {
        const placeholder = 'placeholder';
        const { container } = render(<Input placeholder={placeholder} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.placeholder).toBe(placeholder);
    });

    test('should be able to prepend text to input', () => {
        const text = 'hello world';
        const { getByText } = render(<Input prepend={text} />);
        expect(getByText(text)).toBeTruthy();
    });

    test('should be able to append text to input', () => {
        const text = 'hello world';
        const { getByText } = render(<Input append={text} />);
        expect(getByText(text)).toBeTruthy();
    });

    test('should be able to pass value with onChange handler to control input', () => {
        let onChangeValue;
        const value = 'hello';
        const { container } = render(
            <Input
                value={value}
                onChange={(e: React.ChangeEvent) => {
                    const input = e.currentTarget as HTMLInputElement;
                    onChangeValue = input.value;
                }}
            />
        );

        /**
         * Change input and expect that onChange handler returns same value.
         */
        const newValue = `${value}world`;
        const input = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: newValue } });
        expect(newValue).toBe(onChangeValue);
    });

    test('should be able to render icon', () => {
        const { container } = render(<Input icon="edit" />);
        expect(container.querySelector('i')).toBeTruthy();
    });

    test('should not render icon when append is used', () => {
        const { container } = render(<Input append="hello" icon="edit" />);
        expect(container.querySelector('i')).toBeFalsy();
    });

    test('should be able to attach onIconClick handler', () => {
        const iconClickHandler = jest.fn();
        const { container } = render(<Input icon="edit" iconClickHandler={iconClickHandler} />);
        const icon = container.querySelector('i') as HTMLElement;
        fireEvent.click(icon);
        expect(iconClickHandler).toHaveBeenCalledTimes(1);
    });

    test('should be able to pass ref to icon', () => {
        const ref = React.createRef();
        render(<Input icon="edit" iconRef={ref} />);
        const icon = ref.current as HTMLElement;
        expect(icon.tagName).toBe('I');
    });

    describe('Textarea type', () => {
        test('should be able to render input as textarea', () => {
            const { container } = render(<Input type="textarea" />);
            const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
            expect(textarea).toBeTruthy();
        });

        test('should be able to set autosize prop as boolean to dynamically change number of rows based on newline count', () => {
            const { container } = render(<Input type="textarea" autosize />);
            const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

            // Textarea should start with 1 row
            expect(textarea.rows).toBe(1);
            expect(textarea.value).toBe('');

            // Change textarea value with multiline input.
            const value = `hello world
            this is my textarea
            with 3 rows`;
            fireEvent.change(textarea, { target: { value } });

            // Number of rows should now reflect new value.
            expect(textarea.rows).toBe(3);
        });

        test('should be able to set autosize prop as object to dynamically constrain number of rows', () => {
            const minRows = 2;
            const maxRows = 4;
            const { container } = render(<Input type="textarea" autosize={{ minRows, maxRows }} />);
            const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

            // Textarea should start with minRows
            expect(textarea.rows).toBe(minRows);
            expect(textarea.value).toBe('');

            // Change textarea value with multiline input same as maxRows.
            const value = `hello world
            this is my textarea
            with
            max rows`;
            fireEvent.change(textarea, { target: { value } });

            // Number of rows should now be at the max.
            expect(textarea.rows).toBe(maxRows);

            // Change textarea value with multiline input greater than maxRows.
            const overMaxRows = `hello world
            this is my textarea
            with
            over
            max rows`;
            fireEvent.change(textarea, { target: { overMaxRows } });

            // Number of rows should still be at the max.
            expect(textarea.rows).toBe(maxRows);
        });

        test('should be able to set native rows prop and have it overriden by autosize', () => {
            const minRows = 2;
            const maxRows = 4;
            const { container } = render(
                <Input type="textarea" autosize={{ minRows, maxRows }} rows={3} />
            );
            const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

            // Textarea should use minRows from autosize instead of rows attribute.
            expect(textarea.rows).toBe(minRows);
        });

        test('should be able to set native rows prop whenever autosize is not specified', () => {
            const rows = 3;
            const { container } = render(<Input type="textarea" rows={rows} />);
            const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
            expect(textarea.rows).toBe(rows);
        });

        test('should not be able to render icons with textarea', () => {
            const { container } = render(<Input type="textarea" icon="edit" />);
            expect(container.querySelector('i')).toBeFalsy();
        });
    });
});
