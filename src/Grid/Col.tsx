import styled, { css, media } from '../sc-utils';
import { GRID_COLUMN_MAX } from './util';

export interface IColStartPositions {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    default: number;
}

/**
 * Media props (xs, sm, md...) can either be a number representing the span
 * or an object specifying both span and offset
 */
export type IColMediaProp = number | { span?: number; offset?: number };

export interface IColProps {
    span?: number;
    offset?: number;
    gridColumnStart?: IColStartPositions;
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
    grid-column-start: ${props => props.gridColumnStart && props.gridColumnStart.default};
    grid-column-end: span ${props => props.span};

    ${props =>
        props.xs &&
        css`
            grid-column-start: ${props => props.gridColumnStart && props.gridColumnStart.xs};
            grid-column-end: span
                ${props =>
                    typeof props.xs === 'number'
                        ? props.xs
                        : props.xs && props.xs && props.xs.span};
        `}

    ${props =>
        props.sm &&
        media.sm`
            grid-column-start: ${props => props.gridColumnStart && props.gridColumnStart.sm};
            grid-column-end: span
                ${props =>
                    typeof props.sm === 'number'
                        ? props.sm
                        : props.sm && props.sm && props.sm.span};
        `}
`;

Col.defaultProps = {
    span: GRID_COLUMN_MAX,
    offset: 0,
};

export default Col;
