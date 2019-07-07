import * as React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Switch from './index';
import { renderWithProvider, testComponentCanHandleStyles } from '../../tests/testUtils';
import 'jest-styled-components';

afterEach(cleanup);

describe('Switch', () => {
    testComponentCanHandleStyles(<Switch />);

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

    test('should be able to set default checked', () => {
        const { container } = render(<Switch defaultChecked={true} />);

        // Check that switch is rendered as on
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeTruthy();
    });

    test('should be able to set forced checked', () => {
        const { container } = render(<Switch checked={true} />);

        // Check that switch starts as on
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeTruthy();

        // Click on switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's still on
        expect(input.checked).toBeTruthy();
    });

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
        /**
         * Render with provider because the disabled state lightens the
         * color of the on/off state, and by default the Switch gets
         * colors from the theme, which is on the provider.
         */
        const { container } = renderWithProvider(<Switch disabled />);

        // Check that switch starts as off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's does nothing
        expect(input.checked).toBeFalsy();
    });

    test('should be able to attach onClick handler and still be able to toggle switch', () => {
        let returnedPayload;
        const onClick = jest.fn().mockImplementation((e, data) => (returnedPayload = data));

        const { container } = render(<Switch onClick={onClick} />);

        // Check that switch is initially off
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.checked).toBeFalsy();

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that it's now on
        expect(input.checked).toBeTruthy();

        // Check that onClick was called
        expect(onClick).toHaveBeenCalledTimes(1);

        // Check that the data returned is accurate
        expect(returnedPayload).toMatchObject({ checked: true, value: 'on' });
    });

    test('should be able to apply textClassName to both text descriptions', () => {
        const textClassName = 'helloworld';
        const { container } = render(
            <Switch offText="hello" onText="world" textClassName={textClassName} />
        );
        const elements = container.getElementsByClassName(textClassName);
        expect(elements).toBeTruthy();
        expect(elements).toHaveLength(2);
    });

    test('should be able to pass ref to access input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Switch ref={ref} />);
        expect(ref.current instanceof HTMLInputElement).toBeTruthy();
    });

    test('should focus on input when switch is clicked and allowFocus is true', () => {
        const { container } = render(<Switch allowFocus />);

        // Check that input is not the focused element
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input).not.toBe(document.activeElement);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that input is now focused
        expect(input).toBe(document.activeElement);
    });

    test('should not focus on input when switch is clicked and allowFocus is false', () => {
        const { container } = render(<Switch />);

        // Check that input is not the focused element
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input).not.toBe(document.activeElement);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that input is still not focused
        expect(input).not.toBe(document.activeElement);
    });

    test('should be able to attach onFocus handler', () => {
        let returnedPayload;
        const onFocus = jest.fn().mockImplementation((e, data) => (returnedPayload = data));

        const { container } = render(<Switch allowFocus onFocus={onFocus} />);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that handler was called
        expect(onFocus).toHaveBeenCalledTimes(1);
        // Check that the data returned is accurate
        expect(returnedPayload).toMatchObject({ checked: false, value: 'off' });
    });

    test('onFocus should return forced data payload when checked prop is provided', () => {
        let returnedPayload;
        const onFocus = jest.fn().mockImplementation((e, data) => (returnedPayload = data));

        // Start with switch ON
        const { container } = render(<Switch allowFocus onFocus={onFocus} checked />);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that handler was called
        expect(onFocus).toHaveBeenCalledTimes(1);
        // Check that the data still returns checked as true
        expect(returnedPayload).toMatchObject({ checked: true, value: 'on' });
    });

    test('should be able to attach onBlur handler', () => {
        let returnedPayload;
        const onBlur = jest.fn().mockImplementation((e, data) => (returnedPayload = data));

        const { container } = render(<Switch allowFocus onBlur={onBlur} />);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Blur input
        const input = container.querySelector('input') as HTMLInputElement;
        input.blur();

        // Check that handler was called
        expect(onBlur).toHaveBeenCalledTimes(1);
        // Check that the data returned is accurate
        expect(returnedPayload).toMatchObject({ checked: true, value: 'on' });
    });

    test('onBlur should return forced data payload when checked prop is provided', () => {
        let returnedPayload;
        const onBlur = jest.fn().mockImplementation((e, data) => (returnedPayload = data));

        // Start with switch ON
        const { container } = render(<Switch allowFocus onBlur={onBlur} checked={false} />);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Blur input
        const input = container.querySelector('input') as HTMLInputElement;
        input.blur();

        // Check that handler was called
        expect(onBlur).toHaveBeenCalledTimes(1);
        // Check that the data still has checked as false
        expect(returnedPayload).toMatchObject({ checked: false, value: 'off' });
    });

    test('should be able to set custom width', () => {
        const { getByTestId } = render(<Switch width={100} />);
        const slider = getByTestId('switch-slider');
        expect(slider).toHaveStyleRule('width', '100px');
    });

    test('providing onValue prop to input when switch is on should return that value', () => {
        const onValue = 'testing on';
        const { container } = render(<Switch defaultChecked onValue={onValue} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe(onValue);
    });

    test('providing onValue prop to input when switch is off should not return that value', () => {
        const onValue = 'testing on';
        const { container } = render(<Switch onValue={onValue} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).not.toBe(onValue);
    });

    test('providing offValue prop to input when switch is off should return that value', () => {
        const offValue = 'testing off';
        const { container } = render(<Switch offValue={offValue} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).toBe(offValue);
    });

    test('providing offValue prop to input when switch is on should not return that value', () => {
        const offValue = 'testing off';
        const { container } = render(<Switch defaultChecked offValue={offValue} />);
        const input = container.querySelector('input') as HTMLInputElement;
        expect(input.value).not.toBe(offValue);
    });
});
