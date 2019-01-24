import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';

export interface ISelectOptionGroupProps extends IWithStyles {
    label?: string;
}

const Group = styled.div``;

const SelectOptionGroup = React.forwardRef<any, ISelectOptionGroupProps>((props, ref) => {
    return <Group>{props.label}</Group>;
});

export default SelectOptionGroup;
