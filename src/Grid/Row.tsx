import * as React from 'react';
import styled, { css, IWithStyles, MediaProp } from '../sc-utils';
import Col, { IColProps, IColStartPositions, IColMediaProp, defaultColSpan } from './Col';
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

// const hasMediaProp = (props: IColProps) => {
//     Object.keys(MediaProp).forEach(media => {
//         if (props[media] !== undefined) {
//             return true;
//         }
//     });

//     return false;
// };

/**
 * Calculates span values for each breakpoint for a single column
 * and updates the column positioning object.
 */
export const addColSpanToPosition = (colPositions: IColStartPositions, props: IColProps) => {
    // Indicates if this column has specified any media props.
    let hasMediaProp = false;

    /**
     * This variable tracks the value of the last specified media prop.
     *
     * For example, let's say you create a column with md={4} and xl={8}.
     * Notice we didn't specify the value for `lg`. So what should the value of it be?
     * We want it to be the value of the last specified media prop, which was `md`.
     * This makes sense because md represents the span value when our screen size is
     * AT LEAST medium, so even if we didn't specify a value for `lg`, `lg` is bigger than medium.
     *
     * There is an edge case though.
     * Notice in the above example we didn't specify a value for `xs`,
     * and there is no valid media prop that comes before `xs`.
     * So what should the value default to?
     * I've decided that it should default to the provided `span` prop.
     * OR if that doesn't exist either, then it should use the default for that `span` prop.
     */
    let lastValidMediaPropValue = props.span || defaultColSpan;

    /**
     * Loop through every media prop (xs, sm, md...).
     * If media prop exists, update the positioning for that breakpoint based on the span.
     * Otherwise, if media prop was not provided, we should use the last valid one.
     */
    Object.keys(MediaProp).forEach(media => {
        let mediaProp: IColMediaProp = props[media];
        if (mediaProp) {
            let span =
                typeof mediaProp === 'number' ? mediaProp : (mediaProp && mediaProp.span) || 0;
            colPositions[media] += span;
            lastValidMediaPropValue = span;
            hasMediaProp = true;
        } else {
            colPositions[media] += lastValidMediaPropValue;
        }
    });

    /**
     * If this column has media props, we should not be incrementing the default span,
     * or else it will be inaccurate.
     * Since we don't usually specify `span` when using media props,
     * each column's `span` will default to the full width of the grid, and get added up
     * to exceed the grid column max.
     */
    if (hasMediaProp) {
        colPositions.default = defaultColSpan + 1;
    } else {
        colPositions.default += props.span || defaultColSpan;
    }
};

/**
 * Note: there is currently a TypeScript bug with passing refs to styled-components,
 * so we are currently using type `any` for the ref.
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
 */
const Row = React.forwardRef<any, IRowProps>((props, ref) => {
    const children: React.ReactElement<IColProps>[] = [];
    let colPositions = {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        default: 1,
    };

    React.Children.toArray(props.children).forEach(child => {
        // Disallow children type other than Col elements.
        if (!React.isValidElement(child) || child.type !== Col) {
            throw new Error('The only valid child to a Row element is a Col element.');
        }

        let col = child as React.ReactElement<IColProps>;

        // Add offset to column span total
        colPositions.default +=
            col.props.offset || (Col.defaultProps && Col.defaultProps.offset) || 0;

        // Clone the column and pass it its grid column start position via props
        children.push(
            React.cloneElement(col, {
                gridColumnStart: { ...colPositions },
            })
        );

        // Add column span to column span total
        addColSpanToPosition(colPositions, col.props);
    });

    /**
     * Check if total col span has exceeded the grid column max col span.
     * We add +1 to GRID_COLUMN_MAX because the grid goes from 1-25.
     */
    if (colPositions.default > GRID_COLUMN_MAX + 1) {
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
