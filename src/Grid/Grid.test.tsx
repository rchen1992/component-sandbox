import * as React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Row, Col } from './index';
import { expectRenderError, expectConsoleError } from '../../tests/testUtils';
import { GRID_COLUMN_MAX } from './util';

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
});
