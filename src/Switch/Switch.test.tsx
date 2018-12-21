import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Switch from './index';
// import { expectRenderError, expectConsoleError } from '../../tests/testUtils';
import 'jest-styled-components';

afterEach(cleanup);

describe('Switch', () => {
    test('should be able to toggle switch', () => {
        const { container } = render(<Switch />);
        expect(container.firstElementChild).toBeTruthy();

        // Check that switch is initially off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.checked).toBeFalsy();

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's now on
        expect(input.checked).toBeTruthy();
    });

    test('should be able to set default value', () => {
        const { container } = render(<Switch defaultValue={true} />);

        // Check that switch is rendered as on
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.checked).toBeTruthy();
    });

    // test('should be able to set forced value', () => {
    //     const { container } = render(<Switch value={true} />);

    //     // Check that switch starts as on
    //     const input = container.querySelector('input') as HTMLInputElement;
    //     expect(input).toBeTruthy();
    //     expect(input.checked).toBeTruthy();

    //     // Click switch
    //     fireEvent.click(container.firstElementChild as Element);

    //     // Check that it's still on
    //     expect(input.checked).toBeTruthy();
    // });

    test('should be able to set off-state color and on-state color', () => {
        const offColor = 'red';
        const onColor = 'green';
        const { getByTestId } = render(<Switch offColor={offColor} onColor={onColor} />);

        // Check color when off
        const slider = getByTestId('switch-slider');
        expect(slider).toHaveStyleRule('background-color', offColor);

        // Click switch
        fireEvent.click(slider);

        // Check color when on
        expect(slider).toHaveStyleRule('background-color', onColor);
    });

    test('should be able to set on-state text and off-state text', () => {
        const offText = 'I am off';
        const onText = 'I am on';
        const { queryByText } = render(<Switch offText={offText} onText={onText} />);
        expect(queryByText(offText)).toBeTruthy();
        expect(queryByText(onText)).toBeTruthy();
    });

    test('should be able to set disabled state', () => {
        const { container } = render(<Switch disabled />);

        // Check that switch starts as off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's does nothing
        expect(input.checked).toBeFalsy();
    });
});
