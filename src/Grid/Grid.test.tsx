import * as React from 'react';
import { cleanup } from 'react-testing-library';
import { Row } from './index';
import expectRenderError from '../../tests/expectRenderError';

afterEach(cleanup);

describe('Grid', () => {
    test('should throw error when attempting to render children to a Row that is not a Col', () => {
        expectRenderError(
            <Row>Hello</Row>,
            'The only valid child to a Row element is a Col element.'
        );
    });
});
