import * as React from 'react';

export interface IColProps {
    span: number;
}

const Col: React.FunctionComponent<IColProps> = props => {
    return <div>{props.children}</div>;
};

export default Col;
