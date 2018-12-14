import * as React from 'react';
import styled, { css, IWithStyles, screenSizes } from '../sc-utils';
import Col, {
    IColProps,
    IColMediaValues,
    IColMediaProp,
    defaultColSpan,
    defaultColOffset,
} from './Col';
import { GRID_COLUMN_MAX } from './util';

/**
 * Returns true if column received media props.
 */
export const hasMediaProp = (props: IColProps) => {
    return Object.keys(screenSizes).some(media => {
        let mediaProp: IColMediaProp = props[media];
        return !!mediaProp;
    });
};

/**
 * Calculates span values for each breakpoint for a single column
 * and updates the column positioning object.
 */
export const addColSpan = (
    colPositions: IColMediaValues,
    colSpans: IColMediaValues,
    props: IColProps
) => {
    if (hasMediaProp(props) && props.xs) {
        /**
         * This variable tracks the value of the last specified media prop span.
         *
         * For example, let's say you create a column with xs={4} and xl={8}.
         * Notice we didn't specify the values for `sm`, `md`, or `lg`. So what should the value of them be?
         * We want it to be the value of the last specified media prop, which was `xs`.
         * This makes sense because xs represents the span value when our screen size is
         * AT LEAST extra small, and so all screen sizes above it should at least be that big.
         *
         * This is necessary in the following case:
         * Col1 has xs={4} and md={6}
         * Col2 has xs={2} sm={2} and lg={8}
         * If the screen is at `sm`, Col1 didn't specify `sm`, so it will use it's `xs` (span 4).
         * Even though Col1 doesn't apply any new styles at `sm`, we need to know its position
         * so that Col2 can be correctly positioned.
         *
         * We default this value to the value of `xs` since `xs` is the only REQUIRED prop
         * when using media props.
         */
        let lastValidMediaPropValue = getSpanFromMediaProp(props.xs);

        /**
         * Loop through every media prop (xs, sm, md...).
         * If media prop exists, update the positioning for that breakpoint based on the span.
         * Otherwise, if media prop was not provided, we should use the last valid one.
         */
        Object.keys(screenSizes).forEach(media => {
            let mediaProp: IColMediaProp = props[media];
            if (mediaProp) {
                let span = getSpanFromMediaProp(mediaProp);
                colPositions[media] += span;
                colSpans[media] = span;
                lastValidMediaPropValue = span;
            } else {
                colPositions[media] += lastValidMediaPropValue;
                colSpans[media] = lastValidMediaPropValue;
            }
        });
    } else {
        // Update all breakpoints by the same span
        Object.keys(screenSizes).forEach(media => {
            colPositions[media] += props.span || defaultColSpan;
            colSpans[media] = props.span || defaultColSpan;
        });
    }
};

/**
 * Calculates offset values for each breakpoint for a single column
 * and updates the column positioning object.
 */
export const addColOffsetToPosition = (colPositions: IColMediaValues, props: IColProps) => {
    if (hasMediaProp(props)) {
        // See lastValidMediaPropValue variable in addColSpan.
        // This is the same idea, but for offsets.
        let lastValidMediaPropOffset = getOffsetFromMediaProp(
            props.xs as IColMediaProp,
            props.offset
        );

        /**
         * Loop through every media prop (xs, sm, md...).
         * If media prop exists, update the positioning for that breakpoint based on the offset.
         * Otherwise, use the default offset.
         */
        Object.keys(screenSizes).forEach(media => {
            let mediaProp: IColMediaProp = props[media];
            if (mediaProp) {
                let offset = getOffsetFromMediaProp(mediaProp, props.offset);
                colPositions[media] += offset;
                lastValidMediaPropOffset = offset;
            } else {
                colPositions[media] += lastValidMediaPropOffset;
            }
        });
    } else {
        // Update all breakpoints by the same offset
        Object.keys(screenSizes).forEach(media => {
            colPositions[media] += props.offset || defaultColOffset;
        });
    }
};

/**
 * Try to get span from media prop.
 * If it doesn't exist, use a default span.
 */

const getSpanFromMediaProp = (mediaProp: IColMediaProp) => {
    return typeof mediaProp === 'number' ? mediaProp : (mediaProp && mediaProp.span) || 0;
};

/**
 * Try to get offset from media prop.
 * If it doesn't exist, use a default offset.
 */
const getOffsetFromMediaProp = (mediaProp: IColMediaProp, defaultOffset = defaultColOffset) => {
    if (typeof mediaProp === 'number') {
        return defaultOffset;
    }

    return mediaProp.offset ? mediaProp.offset : defaultOffset;
};

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
