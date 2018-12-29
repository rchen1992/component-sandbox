import * as React from 'react';
import { cleanup } from 'react-testing-library';
import Radio from './index';
import 'jest-styled-components';
import { testComponentCanHandleStyles } from '../../tests/testUtils';

afterEach(cleanup);

describe('Checkbox', () => {
    testComponentCanHandleStyles(<Radio />);
});
