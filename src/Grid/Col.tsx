import styled from '../sc-utils';
import { GRID_COLUMN_MAX } from './util';

export interface IColProps {
    span?: number;
    offset?: number;
    gridColumnStart?: number;
    tag?: string;
}

const Col = styled.div.attrs<IColProps>({
    as: (props: IColProps) => props.tag,
})`
    grid-column-start: ${props => props.gridColumnStart};
    grid-column-end: span ${props => props.span};
`;

Col.defaultProps = {
    span: GRID_COLUMN_MAX,
    offset: 0,
};

export default Col;
