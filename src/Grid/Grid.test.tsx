import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Row, Col } from './index';
import { expectRenderError, expectConsoleError } from '../../tests/testUtils';
import { GRID_COLUMN_MAX } from './util';
import 'jest-styled-components';

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
});
