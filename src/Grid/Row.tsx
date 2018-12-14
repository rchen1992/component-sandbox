import * as React from 'react';
import styled, { css, IWithStyles } from '../sc-utils';
import Col, { IColProps } from './Col';
import { GRID_COLUMN_MAX, hasMediaProp, addColOffsetToPosition, addColSpan } from './util';

interface IGridRowProps {
    gutter?: number;
}

const GridRow = styled<IGridRowProps, 'div'>('div')`
    display: grid;
    grid-template-columns: repeat(${GRID_COLUMN_MAX}, 1fr);

    ${props =>
        props.gutter &&
        css`
            grid-column-gap: ${props.gutter}px;
        `};
`;

interface IRowProps extends IWithStyles {
    children?: React.ReactNode;
    gutter?: number;
    tag?: string;
}

/**
 * Note: there is currently a TypeScript bug with passing refs to styled-components,
 * so we are currently using type `any` for the ref.
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
 */
const Row = React.forwardRef<any, IRowProps>((props, ref) => {
    const children: React.ReactElement<IColProps>[] = [];
    let colPositions = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 };

    React.Children.toArray(props.children).forEach(child => {
        // Disallow children type other than Col elements.
        if (!React.isValidElement(child) || child.type !== Col) {
            throw new Error('The only valid child to a Row element is a Col element.');
        }

        let col = child as React.ReactElement<IColProps>;

        if (hasMediaProp(col.props) && !col.props.xs) {
            throw new Error('`xs` prop must be defined when using media props.');
        }

        // Add offset to column span totals
        addColOffsetToPosition(colPositions, col.props);
        // Save current positions in another variable.
        // This is necessary because addColSpan will update the positions
        // and we don't want to update it yet for the first column.
        let gridColumnStart = { ...colPositions };

        // Add column spans to position and span objects.
        let colSpans = { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 };
        addColSpan(colPositions, colSpans, col.props);

        // Clone the column and pass it position and span objects.
        children.push(
            React.cloneElement(col, {
                gridColumnStart,
                gridColumnSpans: colSpans,
            })
        );
    });

    /**
     * Check if total col span has exceeded the grid column max col span.
     * We add +1 to GRID_COLUMN_MAX because the grid goes from 1-25.
     */
    Object.keys(colPositions).forEach(media => {
        if (colPositions[media] > GRID_COLUMN_MAX + 1) {
            console.error(
                `Column span total for screen size \`${media}\` has exceeded the grid max of ${GRID_COLUMN_MAX} columns.`
            );
        }
    });

    return (
        <GridRow
            ref={ref}
            as={props.tag}
            style={props.style}
            className={props.className}
            gutter={props.gutter}
        >
            {children}
        </GridRow>
    );
});

export default Row;
