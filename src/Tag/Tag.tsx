import * as React from 'react';
import styled, { IWithStyles } from '../sc-utils';
import getIcon from '../icons';
import getTypeStyles, { TagType } from './tagTypes';

export interface ITagProps {
    type?: keyof typeof TagType;
    closable?: boolean;
}

interface ITagWrapperProps extends ITagProps, IWithStyles {
    children?: React.ReactNode;
    onClose?: () => void;
}

const Tag = styled.span<ITagProps>`
    display: inline-block;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;

    i {
        display: inline-block;
        cursor: pointer;
        border-radius: 50%;
        transform: scale(0.75, 0.75);
        height: 18px;
        width: 18px;
        line-height: 18px;
        position: relative;
        right: -2px;
        text-align: center;

        :hover {
            color: white;
        }
    }

    ${props => getTypeStyles(props)};
`;

const TagWrapper = React.forwardRef<HTMLSpanElement, ITagWrapperProps>((props, ref) => {
    const Icon = !!props.closable ? getIcon('close') : null;
    return (
        <Tag ref={ref} style={props.style} className={props.className} type={props.type}>
            {props.children}
            {Icon && <Icon onClick={props.onClose} />}
        </Tag>
    );
});

export default TagWrapper;
