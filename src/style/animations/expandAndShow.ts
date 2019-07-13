import { keyframes } from '../../sc-utils';

export const expandAndShow = keyframes`
    from {
        transform: scaleY(0);
        opacity: 0;
    }

    to {
        transform: scaleY(1);
        opacity: 1;
    }
`;
