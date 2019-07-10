import { keyframes } from '../../sc-utils';

export const halfFade = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 0.5;
    }
`;

export const halfFadeRev = keyframes`
    from {
        opacity: 0.5;
    }

    to {
        opacity: 0;
    }
`;
