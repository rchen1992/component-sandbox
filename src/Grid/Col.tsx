import sc, { styledComponentWithProps } from '../sc-utils';
import { GRID_COLUMN_MAX } from './util';

export interface IColProps {
    span?: number;
    offset?: number;
    gridColumnStart?: number;
}

const styled = {
    div: styledComponentWithProps<IColProps, HTMLDivElement>(sc.div),
};

const Col = styled.div`
    grid-column-start: ${props => props.gridColumnStart};
    grid-column-end: span ${props => props.span};
`;

Col.defaultProps = {
    span: GRID_COLUMN_MAX,
    offset: 0,
};

export default Col;
