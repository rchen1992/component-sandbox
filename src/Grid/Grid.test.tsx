import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Row, Col } from './index';
import { expectRenderError, expectConsoleError } from '../../tests/testUtils';
import { GRID_COLUMN_MAX } from './util';
import { screenSizes } from '../sc-utils';
import 'jest-styled-components';

const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: width,
    });
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
        afterEach(() => {
            // Reset any changes to window width
            // setWindowWidth(1024);
        });

        test('should be able to pass responsive span prop for column', () => {
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" xs={12} />
                </Row>
            );

            const col1 = getByTestId('col1');

            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 12');
        });

        test('should be able to pass an object specifying span as responsive column prop', () => {
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
            const { getByTestId } = render(
                <Row>
                    <Col data-testid="col1" xs={4} sm={12} />
                </Row>
            );

            const col1 = getByTestId('col1');

            // By default, the window width will be 1024, so it should be using the `sm` breakpoint
            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 12');

            // Set window width to `xs` size, which is anything smaller than `sm`
            setWindowWidth(screenSizes.sm - 1);

            // Expect that the column is now using `xs` span
            expect(col1).toHaveStyleRule('grid-column-start', '1');
            expect(col1).toHaveStyleRule('grid-column-end', 'span 4');
        });

        test('should render a column that defaults any unspecified media props to the last valid media prop', () => {
            /**
             * create a column with xs={4} and xl={8}.
             * At breakpoint `md` and `lg`, which are unspecified, they should both be using `xs`.
             */
        });

        test('should render a column that defaults an unspecified media prop to the `span` prop when there is no last valid media prop', () => {
            /**
             * create a column with md={4} and span={12}.
             * At breakpoint `xs`, which is unspecified, it should be using 12.
             *
             * create a column with md={4} and no span.
             * At breakpoint `xs`, which is unspecified, it should be using the default column span.
             */
        });

        test('should render multiple responsive columns with different breakpoints correctly', () => {
            /**
             * Create different combinations of columns with different breakpoints (some unspecified)
             * and assert grid position values are correct based on screen size
             */
        });
    });
});
