import * as React from 'react';
import styled from '../sc-utils';

// Defines the total number of columns in a grid row.
const GRID_COLUMN_MAX = 24;

const GridRow = styled.div`
    display: grid;
    grid-template-columns: repeat(${GRID_COLUMN_MAX}, 1fr);
`;

const Row: React.FunctionComponent = props => {
    return <GridRow>{props.children}</GridRow>;
};

export default Row;
