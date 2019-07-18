import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-styled-components';
import { getStops } from './Stop';

afterEach(cleanup);

describe('Slider Stop', () => {
    test('should get correct number of slider stops', () => {
        const numStops = 10;
        const stops = getStops(numStops, 10, 100, 0);

        /**
         * Kinda misleading, but the `numStops` variable
         * is actually not the number of rendered stops.
         *
         * If you divide a slider of length 100 by step 10,
         * you get `numStops = 10`, but you should only render
         * 9 stop elements on the slider.
         */
        expect(stops).toHaveLength(numStops - 1);
    });

    test('should render correct left offset position', () => {
        const numStops = 10;
        const step = 10;
        const stops = getStops(numStops, step, 100, 0);
        const { container } = render(<>{stops}</>);

        container.querySelectorAll('div').forEach((stop, index) => {
            expect(stop.style.left).toBe(`${(index + 1) * step}%`);
        });
    });
});
