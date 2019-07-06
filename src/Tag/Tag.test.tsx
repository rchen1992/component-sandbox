import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Tag from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Tag', () => {
    testComponentCanHandleStyles(<Tag>Hello World</Tag>);

    test('should be able to pass ref', () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(<Tag ref={ref}>Hello World</Tag>);
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });

    test('should be able to render text as children', () => {
        const text = 'Hello World';
        const { getByText } = render(<Tag>{text}</Tag>);
        expect(getByText(text)).toBeTruthy();
    });

    test('should render close icon when closable prop is true', () => {
        const { container } = render(<Tag closable>Hello World</Tag>);
        const closeIcon = container.querySelector('i');
        expect(closeIcon).toBeTruthy();
    });

    test('should not render close icon when closable prop is false', () => {
        const { container } = render(<Tag>Hello World</Tag>);
        const closeIcon = container.querySelector('i');
        expect(closeIcon).toBeFalsy();
    });

    test('should fire onClose when close icon is clicked', () => {
        const onClose = jest.fn();
        const { container } = render(
            <Tag closable onClose={onClose}>
                Hello World
            </Tag>
        );
        const closeIcon = container.querySelector('i') as HTMLElement;
        fireEvent.click(closeIcon);
        expect(onClose).toHaveBeenCalled();
    });
});
