import styled, { media, screenSizes } from '../sc-utils';
import { GRID_COLUMN_MAX } from './util';
import { InterpolationValue } from 'styled-components';

/**
 * Returns all media queries for all breakpoints for a column.
 */
const colMediaQueries = (props: IColProps): InterpolationValue[] => {
    return Object.keys(screenSizes).reduce(
        (result, breakpoint) => {
            result.push(...colMediaQuery(props, breakpoint));
            return result;
        },
        [] as InterpolationValue[]
    );
};

/**
 * Returns media query that sets start and span for a column at a specific breakpoint.
 */
const colMediaQuery = (props: IColProps, breakpoint: string): InterpolationValue[] => {
    return media[breakpoint]`
            grid-column-start: ${props.gridColumnStart && props.gridColumnStart[breakpoint]};
            grid-column-end: span
                ${props.gridColumnSpans && props.gridColumnSpans[breakpoint]};
        `;
};

export interface IColMediaValues {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

/**
 * Media props (xs, sm, md...) can either be a number representing the span
 * or an object specifying both span and offset
 */
export type IColMediaProp = number | { span?: number; offset?: number };

export interface IColProps {
    span?: number;
    offset?: number;
    gridColumnStart?: IColMediaValues;
    gridColumnSpans?: IColMediaValues;
    tag?: string;
    xs?: IColMediaProp;
    sm?: IColMediaProp;
    md?: IColMediaProp;
    lg?: IColMediaProp;
    xl?: IColMediaProp;
}

const Col = styled.div.attrs<IColProps>({
    as: (props: IColProps) => props.tag,
})`
    ${colMediaQueries}
`;

Col.defaultProps = {
    span: GRID_COLUMN_MAX,
    offset: 0,
};

export const defaultColSpan = (Col.defaultProps && Col.defaultProps.span) || GRID_COLUMN_MAX;
export const defaultColOffset = (Col.defaultProps && Col.defaultProps.offset) || 0;

export default Col;
