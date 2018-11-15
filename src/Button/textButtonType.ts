import { css } from '../sc-utils';
import { ButtonCssFunction } from './Button';

const TextButtonCss: ButtonCssFunction = props => {
    if (props.theme) {
        if (props.disabled) {
            return css`
                color: ${props.theme.secondaryTextColor};
                border: none;
                background: none;
            `;
        }

        return css`
            color: ${props.theme.primaryColor};
            border: none;
            background: none;

            &:hover {
                color: ${props.theme.primaryColorHighlight};
                border: none;
                background: none;
            }

            &:active {
                color: ${props.theme.primaryColorDark};
            }
        `;
    }

    return undefined;
};

export default TextButtonCss;
