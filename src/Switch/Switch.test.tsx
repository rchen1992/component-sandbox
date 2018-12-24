import * as React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import Switch from './index';
import { renderWithProvider } from '../../tests/testUtils';
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
        const onClick = jest.fn();

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
    });

    test('should be able to apply className to slider', () => {
        const className = 'helloworld';
        const { container } = render(<Switch className={className} />);
        expect(container.querySelector(`.${className}`)).toBeTruthy();
    });

    test('should be able to apply style object to slider', () => {
        const style = {
            backgroundColor: 'orange',
        };
        const { getByTestId } = render(<Switch style={style} />);
        expect(getByTestId('switch-slider').style.backgroundColor).toEqual(style.backgroundColor);
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
        const ref = React.createRef<any>();
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
        const onFocus = jest.fn();

        const { container } = render(<Switch allowFocus onFocus={onFocus} />);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Check that handler was called
        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    test('should be able to attach onBlur handler', () => {
        const onBlur = jest.fn();

        const { container } = render(<Switch allowFocus onBlur={onBlur} />);

        // Click switch
        fireEvent.click(container.firstElementChild as Element);

        // Blur input
        const input = container.querySelector('input') as HTMLInputElement;
        input.blur();

        // Check that handler was called
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    test('should be able to set custom width', () => {
        const { getByTestId } = render(<Switch width={100} />);
        const slider = getByTestId('switch-slider');
        expect(slider).toHaveStyleRule('width', '100px');
    });
});
