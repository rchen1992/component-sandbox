import * as React from 'react';
import styled, { css, IWithStyles } from '../sc-utils';
import Col, { IColProps } from './Col';
import { GRID_COLUMN_MAX } from './util';

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
    let colSpanTotal = 1;

    React.Children.toArray(props.children).forEach(child => {
        // Disallow children type other than Col elements.
        if (!React.isValidElement(child) || child.type !== Col) {
            throw new Error('The only valid child to a Row element is a Col element.');
        }

        let col = child as React.ReactElement<IColProps>;

        // Add offset to column span total
        colSpanTotal += col.props.offset || (Col.defaultProps && Col.defaultProps.offset) || 0;

        // Clone the column and pass it its grid column start position via props
        children.push(
            React.cloneElement(col, {
                gridColumnStart: {
                    xs: colSpanTotal,
                    sm: colSpanTotal,
                    md: colSpanTotal,
                    lg: colSpanTotal,
                    xl: colSpanTotal,
                    default: colSpanTotal,
                },
            })
        );

        // Add column span to column span total
        colSpanTotal +=
            col.props.span || (Col.defaultProps && Col.defaultProps.span) || GRID_COLUMN_MAX;
    });

    /**
     * Check if total col span has exceeded the grid column max col span.
     * We add +1 to GRID_COLUMN_MAX because the grid goes from 1-25.
     */
    if (colSpanTotal > GRID_COLUMN_MAX + 1) {
        console.error(`Column span total has exceeded the grid max of ${GRID_COLUMN_MAX} columns.`);
    }

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
