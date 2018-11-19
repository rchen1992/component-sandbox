import * as React from 'react';
import { render } from 'react-testing-library';
import GenericErrorBoundary from '../src/GenericErrorBoundary';

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
export default function expectRenderError(element: any, expectedError: string) {
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
