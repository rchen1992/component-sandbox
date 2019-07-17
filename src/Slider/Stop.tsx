import * as React from 'react';
import styled from '../sc-utils';

/**
 * Slider step breakpoint component.
 */
export const Stop = styled.div`
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.defaultBorderColor};
    transform: translate(-50%);
`;

/**
 * Get array of slider Stop elements.
 *
 * @param numStops
 * @param step
 * @param max
 * @param min
 */
export function getStops(numStops: number, step: number, max: number, min: number) {
    let stopValues = [];
    for (let i = 1; i < numStops; i++) {
        stopValues.push(i);
    }

    const stopWidthPercentage = (100 * step) / (max - min);

    return stopValues.map(i => <Stop key={i} style={{ left: `${i * stopWidthPercentage}%` }} />);
}
