import * as React from 'react';
import { render } from '@testing-library/react';
import GenericErrorBoundary from '../src/GenericErrorBoundary';
import Provider from 'Provider';

/**
 * Helper function that asserts an element will fail rendering with a given error message.
 *
 * It wraps the rendering of an element
 * with an error boundary to catch the error, as well as prevents the
 * default logging of errors for error events.
 *
 * Jest logs errors to the console even when the error is caught,
 * which makes console very noisy when running tests.
 * This helps alleviate that problem.
 * More details here: https://github.com/facebook/react/issues/11098#issuecomment-412682721
 */
export function expectRenderError(element: any, expectedError: string) {
    // Record all errors.
    let topLevelErrors: Error[] = [];
    function handleTopLevelError(event: ErrorEvent) {
        topLevelErrors.push(event.error);
        // Prevent logging
        event.preventDefault();
    }

    window.addEventListener('error', handleTopLevelError);
    try {
        render(
            <GenericErrorBoundary errorMessage="Something went wrong.">
                {element}
            </GenericErrorBoundary>
        );
    } finally {
        window.removeEventListener('error', handleTopLevelError);
    }

    expect(topLevelErrors.length).toBe(1);
    expect(topLevelErrors[0].message).toContain(expectedError);
}

/**
 * Helper function that renders an element and expects a given
 * error message to be logged to console.error.
 * Temporarily mocks console.error and then restores it at the end.
 */
export function expectConsoleError(element: any, errorMessage: string) {
    const originalConsoleError = console.error;
    let errors: string[] = [];
    console.error = jest.fn(error => errors.push(error));

    render(element);

    expect(errors).toContain(errorMessage);

    // Restore console error
    console.error = originalConsoleError;
}

/**
 * Renders any element with our Provider.
 * Use this to allow elements in tests to access the theme.
 */
export function renderWithProvider(element: any) {
    return render(<Provider>{element}</Provider>);
}

/**
 * Runs tests to check if a component can handle applying className and style object.
 *
 * @param element - React element to test
 * @param useDocument - if true, all tests will use document to search
 * for element instead of element container. This is useful for testing
 * elements created from portals.
 */
export function testComponentCanHandleStyles(element: any, useDocument = false) {
    test('should be able to apply className', () => {
        testElementCanAttachClassName(element, useDocument);
    });

    test('should be able to apply style object', () => {
        testElementCanAttachStyleObject(element, useDocument);
    });
}

/**
 * Test case that checks whether an element can apply a className.
 */
export function testElementCanAttachClassName(element: any, useDocument = false) {
    const className = 'testclassname';
    let elementWithClassName = React.cloneElement(element, { className: className });
    const { container } = render(elementWithClassName);

    if (useDocument) {
        expect(document.querySelector(`.${className}`)).toBeTruthy();
    } else {
        expect(container.querySelector(`.${className}`)).toBeTruthy();
    }
}

/**
 * Test case that checks whether an element can apply a style object.
 */
export function testElementCanAttachStyleObject(element: any, useDocument = false) {
    const style = {
        backgroundColor: 'orange',
    };
    let elementWithStyle = React.cloneElement(element, { style: style });
    const { container } = render(elementWithStyle);

    if (useDocument) {
        expect(document.body.innerHTML).toMatch('background-color: orange');
    } else {
        expect(container.innerHTML).toMatch('background-color: orange');
    }
}

/**
 * Helper component used to test custom React hooks.
 * Provide a `useHook` prop that will run arbitrary hooks code.
 *
 * This component will provide any forwarded `ref` to the
 * `useHook` prop, in case you need access to it.
 */
export const HookTester = React.forwardRef((props: any, ref: any) => {
    const forwardProps = props.useHook(ref) || {};

    return (
        <div ref={ref} {...forwardProps} data-testid="hook-tester">
            {props.children}
        </div>
    );
});

/**
 * Helper function that renders the `HookTester` component to test
 * custom React hooks.
 *
 * Returns the the default object from rendering a component
 * with `react-testing-library`, along with a `ref` for the component.
 *
 * @param hook - hook function you want to run
 * @param children - optional React children to render in test component
 */
export function renderHookTester(hook: Function, children?: React.ReactNode) {
    const ref = React.createRef();
    return {
        ...render(
            <HookTester ref={ref} useHook={hook}>
                {children}
            </HookTester>
        ),
        ref,
    };
}
