import * as React from 'react';
import { render } from 'react-testing-library';
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
