import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Input from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Input', () => {
    testComponentCanHandleStyles(<Input />);

    test('should be able to pass ref to input', () => {
        const ref = React.createRef();
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
    });
});
