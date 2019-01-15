import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Select from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Select', () => {
    testComponentCanHandleStyles(<Select />);

    test('should be able to pass ref to input', () => {
        const ref = React.createRef();
        render(<Select ref={ref} />);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should be able to open and close dropdown on input click', () => {});

    test('should be able to open and close dropdown on input icon click', () => {});

    test('should be able to open dropdown and then close it on document click', () => {});

    test('should be able to render list of options in dropdown', () => {});

    test('should be able to select option in dropdown to set input value', () => {});
});
