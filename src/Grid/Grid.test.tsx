import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Row, Col } from './index';
import {
    expectRenderError,
    expectConsoleError,
    testComponentCanHandleStyles,
} from '../../tests/testUtils';
import { GRID_COLUMN_MAX, addColSpan } from './util';
import { css, media } from '../sc-utils';
import 'jest-styled-components';

// Store clone of media object for restoring later.
const originalMedia = { ...media };

/**
 * Restores media object to their original values.
 */
const restoreMockedBreakpoints = () => {
    Object.keys(originalMedia).forEach(breakpoint => {
        media[breakpoint] = originalMedia[breakpoint];
    });
};

/**
 * Mocks a given breakpoint on the media object from sc-utils.
 * The mocked breakpoint will be a normal styled-component css function instead
 * of a media query specific css function.
 *
 * JSDOM doesn't work with media queries, so this allows us to choose
 * one of the breakpoints to manually trigger.
 *
 * Caveat: this has to be run before the rendering of the component,
 * since that is when the media object functions are run.
 */
const setMockedBreakpoint = (breakpoint: string) => {
    restoreMockedBreakpoints();
    media[breakpoint] = css;
};

afterEach(() => {
    restoreMockedBreakpoints();
    cleanup();
});

describe('Grid', () => {
    testComponentCanHandleStyles(<Row />);

    test('should throw error when attempting to render children to a Row that is not a Col', () => {
        expectRenderError(
            <Row>Hello</Row>,
            'The only valid child to a Row element is a Col element.'
        );
    });

    test('should throw error when attempting to render Col with media props without specifying xs', () => {
        expectRenderError(
            <Row>
                <Col md={4} />
            </Row>,
            '`xs` prop must be defined when using media props.'
        );
    });

    test('should have console error when the total span of all columns in a row exceeds the grid max', () => {
        expectConsoleError(
            <Row>
                <Col span={GRID_COLUMN_MAX + 1}>Hello</Col>
            </Row>,
            `Column span total for screen size \`xs\` has exceeded the grid max of ${GRID_COLUMN_MAX} columns.`
        );
    });

    test('should be able to pass refs to Row', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <Row ref={ref}>
                <Col>Hello</Col>
            </Row>
        );
        const row = ref.current as HTMLDivElement;
        expect(row.innerHTML).toMatch('Hello');
    });

    test('should render Row as a div by default', () => {
        const { container } = render(<Row />);
        expect(container.getElementsByTagName('div')).toHaveLength(1);
    });

    test('should be able to render Row with custom element tag', () => {
        const tag = 'section';
        const { container } = render(<Row tag={tag} />);
        expect(container.getElementsByTagName(tag)).toHaveLength(1);
    });

    test('should render Col as a div by default', () => {
        const { container } = render(<Col />);
        expect(container.getElementsByTagName('div')).toHaveLength(1);
    });

    test('should be able to render Col with custom element tag', () => {
        const tag = 'button';
        const { container } = render(<Col tag={tag} />);
        expect(container.getElementsByTagName(tag)).toHaveLength(1);
    });

    describe('Column positioning', () => {
        // Internally, column styles are behind media queries,
        // so we need to manually trigger the default one.
        beforeEach(() => setMockedBreakpoint('xs'));

        test('a Row and Col with no props should span the full grid', () => {
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col" />
                </Row>
            );

            const col = getByTestId('col');
            expect(col).toHaveStyleRule('grid-column-start', '1');
            expect(col).toHaveStyleRule('grid-column-end', 'span 24');
        });

        test('should render Cols in correct position based on span', () => {
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" span={6} />
                    <Col data-testid="col2" span={8} />
                    <Col data-testid="col3" span={10} />
                </Row>
            );

            const col1 = getByTestId('col1');
            const col2 = getByTestId('col2');
            const col3 = getByTestId('col3');

            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 6');
            expect(col2).toHaveStyleRule('grid-column-start', '7');
            expect(col2).toHaveStyleRule('grid-column-end', 'span 8');
            expect(col3).toHaveStyleRule('grid-column-start', '15');
            expect(col3).toHaveStyleRule('grid-column-end', 'span 10');
        });

        test('should render Cols in correct position based on span and offset', () => {
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" span={4} offset={4} />
                    <Col data-testid="col2" span={4} offset={6} />
                    <Col data-testid="col3" span={4} offset={2} />
                </Row>
            );

            const col1 = getByTestId('col1');
            const col2 = getByTestId('col2');
            const col3 = getByTestId('col3');

            expect(col1).toHaveStyleRule('grid-column-start', '5');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 4');
            expect(col2).toHaveStyleRule('grid-column-start', '15');
            expect(col2).toHaveStyleRule('grid-column-end', 'span 4');
            expect(col3).toHaveStyleRule('grid-column-start', '21');
            expect(col3).toHaveStyleRule('grid-column-end', 'span 4');
        });
    });

    describe('Responsive column positioning', () => {
        /**
         * Helper that mocks triggering a media breakpoint and
         * then asserts that the column position is correct based on media prop.
         */
        const assertColumnPositionForBreakpoint = (
            element: React.ReactElement<any>,
            breakpoint: string,
            expectedColStart: number,
            expectedColSpan: number
        ) => {
            // Add data test ID to element so we can grab it from DOM later.
            const dataTestId = 'col';
            let colElement = React.cloneElement(element, { 'data-testid': 'col' });

            // Mock media breakpoint
            setMockedBreakpoint(breakpoint);

            // Render column
            const { getByTestId } = render(<Row>{colElement}</Row>);
            const col = getByTestId(dataTestId);

            // Assert column positioning is correct
            expect(col).toHaveStyleRule('grid-column-start', expectedColStart.toString());
            expect(col).toHaveStyleRule('grid-column-end', `span ${expectedColSpan}`);

            // Clean up the DOM in case we run this more than once in a test,
            // we don't want to create multiple columns with the same test ID.
            cleanup();
        };

        test('should be able to pass media prop as a number to a column', () => {
            assertColumnPositionForBreakpoint(<Col xs={12} />, 'xs', 1, 12);
        });

        test('should be able to pass an object instead of a number for media prop', () => {
            assertColumnPositionForBreakpoint(<Col xs={{ span: 12 }} />, 'xs', 1, 12);
        });

        test('should render a column with different spans based on media props', () => {
            const col = <Col xs={4} sm={12} />;
            assertColumnPositionForBreakpoint(col, 'xs', 1, 4);
            assertColumnPositionForBreakpoint(col, 'sm', 1, 12);
        });

        test('setting an offset prop should affect positioning of column that uses media props', () => {
            const col = <Col xs={4} md={6} offset={4} />;
            assertColumnPositionForBreakpoint(col, 'xs', 5, 4);
            assertColumnPositionForBreakpoint(col, 'md', 5, 6);
        });

        test('should be able to set offsets that are specific to each media prop, which should override the general offset prop', () => {
            const col = <Col xs={{ span: 4, offset: 4 }} md={{ span: 4, offset: 8 }} offset={2} />;
            assertColumnPositionForBreakpoint(col, 'xs', 5, 4);
            assertColumnPositionForBreakpoint(col, 'md', 9, 4);
        });

        test('should ignore generic span/offset when media prop span/offset are set', () => {
            const col = <Col span={12} offset={8} xs={{ span: 4, offset: 2 }} />;
            assertColumnPositionForBreakpoint(col, 'xs', 3, 4);
        });
    });

    describe('Grid Helpers', () => {
        test('addColSpan should default any unspecified media props to the last valid media prop', () => {
            /**
             * Suppose we have a column with xs={4} and xl={8}.
             * Breakpoints `md` and `lg` are unspecified.
             * After calculating column positioning,
             * `md` and `lg` should both be using the same value as `xs`.
             */
            const props = { xs: 4, xl: 8 };

            let colPositions = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, default: 1 };
            let colSpans = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, default: 1 };

            addColSpan(colPositions, colSpans, props);

            expect(colPositions.md).toEqual(colPositions.xs);
            expect(colPositions.lg).toEqual(colPositions.xs);
            expect(colSpans.md).toEqual(colSpans.xs);
            expect(colSpans.lg).toEqual(colSpans.xs);
        });
    });
});
