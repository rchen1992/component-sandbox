import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Tag from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Tag', () => {
    testComponentCanHandleStyles(<Tag>Hello World</Tag>);

    test('should be able to pass ref', () => {
        const ref = React.createRef();
        render(<Tag ref={ref}>Hello World</Tag>);
        expect(ref.current instanceof HTMLSpanElement).toBeTruthy();
    });

    test('should be able to render text as children', () => {
        const text = 'Hello World';
        const { getByText } = render(<Tag>{text}</Tag>);
        expect(getByText(text)).toBeTruthy();
    });
});
