import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Select from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Select Option Group', () => {
    testComponentCanHandleStyles(<Select.OptionGroup />);

    test('should be able to pass ref to select options', () => {
        const ref = React.createRef();
        render(<Select.OptionGroup ref={ref} />);
        expect(ref.current instanceof HTMLUListElement).toBeTruthy();
    });
});
