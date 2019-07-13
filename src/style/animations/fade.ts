import { keyframes } from '../../sc-utils';

export const fade = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const fadeRev = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;
