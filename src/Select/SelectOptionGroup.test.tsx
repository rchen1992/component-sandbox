import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import Select from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles, expectRenderError } from '../../tests/testUtils';
import { mockOptions } from './mockData';

afterEach(cleanup);

describe('Select Option Group', () => {
    testComponentCanHandleStyles(<Select.OptionGroup />);

    test('should throw error when rendering children that are not options', () => {
        expectRenderError(
            <Select.OptionGroup>
                <div>hello</div>
            </Select.OptionGroup>,
            'The only valid child to a Select Option Group element is a Select Option element.'
        );
    });

    test('should be able to pass ref to select option group', () => {
        const ref = React.createRef<HTMLUListElement>();
        render(<Select.OptionGroup ref={ref} />);
        expect(ref.current instanceof HTMLUListElement).toBeTruthy();
    });

    test('should be able to render list of options', () => {
        const { getByText } = render(
            <Select.OptionGroup>
                {mockOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} label={option.label} />
                ))}
            </Select.OptionGroup>
        );

        mockOptions.forEach(option => {
            const renderedOption = getByText(option.label);
            expect(renderedOption).toBeTruthy();
        });
    });
});
