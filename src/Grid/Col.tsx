import * as React from 'react';
import sc, { styledComponentWithProps } from '../sc-utils';
import { GRID_COLUMN_MAX } from './util';

export interface IColProps {
    span?: number;
    offset?: number;
    gridColumnStart?: number;
}

export interface IGridColProps {
    span?: number;
    gridColumnStart?: number;
}

const styled = {
    div: styledComponentWithProps<IGridColProps, HTMLDivElement>(sc.div),
};

const GridCol = styled.div`
    grid-column-start: ${props => props.gridColumnStart};
    grid-column-end: span ${props => props.span};
`;

const Col: React.FunctionComponent<IColProps> = props => {
    return <GridCol {...props}>{props.children}</GridCol>;
};

Col.defaultProps = {
    span: GRID_COLUMN_MAX,
    offset: 0,
};

export default Col;
