import * as React from 'react';
import styled from '../sc-utils';
import Col, { IColProps } from './Col';

// Defines the total number of columns in a grid row.
export const GRID_COLUMN_MAX = 24;

const GridRow = styled.div`
    display: grid;
    grid-template-columns: repeat(${GRID_COLUMN_MAX}, 1fr);
`;

const Row: React.FunctionComponent = props => {
    const children: React.ReactElement<IColProps>[] = [];
    let colSpanTotal = 1;

    React.Children.toArray(props.children).forEach(child => {
        if (!React.isValidElement(child) || child.type !== Col) {
            throw new Error('The only valid child to a Row element is a Col element.');
        }

        let col = child as React.ReactElement<IColProps>;

        children.push(
            React.cloneElement(col, {
                gridColumnStart: colSpanTotal,
            })
        );

        colSpanTotal +=
            col.props.span || (Col.defaultProps && Col.defaultProps.span) || GRID_COLUMN_MAX;
        colSpanTotal += col.props.offset || (Col.defaultProps && Col.defaultProps.offset) || 0;
    });

    /**
     * Check if total col span has exceeded the grid column max col span.
     * We add +1 to GRID_COLUMN_MAX because the grid goes from 1-25.
     */
    if (colSpanTotal > GRID_COLUMN_MAX + 1) {
        console.error(`Column span total has exceeded the grid max of ${GRID_COLUMN_MAX} columns.`);
    }

    return <GridRow>{children}</GridRow>;
};

export default Row;
