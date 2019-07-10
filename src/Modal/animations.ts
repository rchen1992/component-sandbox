import { keyframes } from '../sc-utils';

export const ANIMATION_DURATION = 300;

export const fadeSlide = keyframes`
    from {
        transform: translate(-50%, -20px);
        opacity: 0;
    }

    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
`;

export const fadeSlideRev = keyframes`
    from {
        transform: translate(-50%, 0);
        opacity: 1;
    }

    to {
        transform: translate(-50%, -20px);
        opacity: 0;
    }
`;
