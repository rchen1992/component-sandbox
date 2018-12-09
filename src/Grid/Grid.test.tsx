import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Row, Col } from './index';
import { expectRenderError, expectConsoleError } from '../../tests/testUtils';
import { GRID_COLUMN_MAX } from './util';
import { css, media } from '../sc-utils';
import 'jest-styled-components';
import { addColSpanToPosition } from './Row';
import { defaultColSpan } from './Col';

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

afterEach(cleanup);

describe('Grid', () => {
    test('should throw error when attempting to render children to a Row that is not a Col', () => {
        expectRenderError(
            <Row>Hello</Row>,
            'The only valid child to a Row element is a Col element.'
        );
    });

    test('should have console error when the total span of all columns in a row exceeds the grid max', () => {
        expectConsoleError(
            <Row>
                <Col span={GRID_COLUMN_MAX + 1}>Hello</Col>
            </Row>,
            `Column span total has exceeded the grid max of ${GRID_COLUMN_MAX} columns.`
        );
    });

    test('should be able to apply className to Row', () => {
        const className = 'helloworld';
        const { container } = render(<Row className={className} />);
        expect(container.querySelector('.helloworld')).toBeTruthy();
    });

    test('should be able to apply style to Row', () => {
        const { container } = render(<Row style={{ backgroundColor: 'red' }} />);
        expect(container.innerHTML).toMatch('background-color: red');
    });

    test('should be able to pass refs to Row', () => {
        const ref = React.createRef<any>();
        render(
            <Row ref={ref}>
                <Col>Hello</Col>
            </Row>
        );
        expect(ref.current.innerHTML).toMatch('Hello');
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
        test('should be able to pass media prop as a number to a column', () => {
            setMockedBreakpoint('xs');
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" xs={12} />
                </Row>
            );

            const col1 = getByTestId('col1');

            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 12');
        });

        test('should be able to pass an object instead of a number for media prop', () => {
            setMockedBreakpoint('xs');
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" xs={{ span: 12 }} />
                </Row>
            );

            const col1 = getByTestId('col1');

            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 12');
        });

        test('should render a column with different spans based on media props', () => {
            setMockedBreakpoint('xs');
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" xs={4} sm={12} />
                </Row>
            );
            const col1 = getByTestId('col1');

            // Expect column is using `xs` span
            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 4');

            // Trigger `sm` media styles and render another column.
            setMockedBreakpoint('sm');
            const { getByTestId: getByTestIdForCol2 } = render(
                <Row>
                    <Col data-testid="col2" xs={4} sm={12} />
                </Row>
            );
            const col2 = getByTestIdForCol2('col2');

            // Expect column is using `sm` span
            expect(col2).toHaveStyleRule('grid-column-start', '1');
            expect(col2).toHaveStyleRule('grid-column-end', 'span 12');
        });

        test('should render multiple responsive columns with different breakpoints correctly', () => {
            /**
             * Create different combinations of columns with different breakpoints (some unspecified)
             * and assert grid position values are correct based on screen size
             */
        });
    });

    describe('Grid Helpers', () => {
        test('addColSpanToPosition should default any unspecified media props to the last valid media prop', () => {
            /**
             * Suppose we have a column with xs={4} and xl={8}.
             * Breakpoints `md` and `lg` are unspecified.
             * After calculating column positioning,
             * `md` and `lg` should both be using the same value as `xs`.
             */
            const props = { xs: 4, xl: 8 };

            let colPositions = {
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                default: 1,
            };

            addColSpanToPosition(colPositions, props);

            expect(colPositions.md).toEqual(colPositions.xs);
            expect(colPositions.lg).toEqual(colPositions.xs);
        });

        test('addColSpanToPosition should default any unspecified media prop to the `span` prop when there is no last valid media prop', () => {
            /**
             * Suppose we have a column with md={4} and span={12}.
             * Breakpoint `xs` is unspecified, so there is no valid last media prop.
             * Therefore, it should default to same value as the span` prop.
             */
            const props = { md: 4, span: 12 };

            let colPositions = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, default: 1 };

            addColSpanToPosition(colPositions, props);

            // Add 1 because the col position for xs starts at 1
            expect(colPositions.xs).toEqual(props.span + 1);
        });

        test('addColSpanToPosition should default any unspecified media prop to the default `span` when there is no last valid media prop nor `span` prop', () => {
            /**
             * create a column with md={4} and no span.
             * At breakpoint `xs`, which is unspecified, it should be using the default column span.
             */
            /**
             * Suppose we have a column with md={4} and no span prop.
             * Breakpoint `xs` is unspecified, so there is no valid last media prop nor a `span` prop.
             * Therefore, it should default to same value as the default `span`.
             */
            const props = { md: 4 };

            let colPositions = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, default: 1 };

            addColSpanToPosition(colPositions, props);

            // Add 1 because the col position for xs starts at 1
            expect(colPositions.xs).toEqual(defaultColSpan + 1);
        });

        test('addColSpanToPosition should set default span to the default when column has media prop', () => {
            const props = { xs: 4 };

            let colPositions = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, default: 1 };

            addColSpanToPosition(colPositions, props);

            // Add 1 because the col position starts at 1
            expect(colPositions.default).toEqual(defaultColSpan + 1);
        });
    });
});
