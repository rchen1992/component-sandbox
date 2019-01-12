import { styled } from '../sc-utils';

interface IIconProps {
    content: string;
}

export default styled<IIconProps, 'i'>('i')`
    font-family: element-icons;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    &::before {
        content: '${props => props.content}';
    }
`;
