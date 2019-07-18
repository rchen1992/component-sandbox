import * as React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Slider from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Slider', () => {
    testComponentCanHandleStyles(<Slider />);

    test('should fire onChange when slider is clicked', () => {
        const onChange = jest.fn();
        const { container } = render(<Slider onChange={onChange} />);

        fireEvent.click(container);

        expect(onChange).toHaveBeenCalled();
    });
});
