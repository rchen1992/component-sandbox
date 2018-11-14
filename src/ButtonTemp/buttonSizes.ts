import { css } from '../sc-utils';
import { ButtonCssFunction } from './Button';

export enum ButtonSize {
    MEDIUM = 'medium',
    SMALL = 'small',
    MINI = 'mini',
}

const ButtonSizeCss: ButtonCssFunction = ({ theme, ...props }) => {
    if (theme && props.size) {
        switch (props.size) {
            case ButtonSize.MEDIUM:
                return css`
                    padding: calc(${theme.defaultButtonVerticalPadding} - 2px)
                        ${theme.defaultButtonHorizontalPadding};
                `;
            case ButtonSize.SMALL:
                return css`
                    padding: calc(${theme.defaultButtonVerticalPadding} - 3px)
                        calc(${theme.defaultButtonHorizontalPadding} - 9px);
                    font-size: calc(${theme.fontSize} - 2px);
                `;
            case ButtonSize.MINI:
                return css`
                    padding: calc(${theme.defaultButtonVerticalPadding} - 5px)
                        calc(${theme.defaultButtonHorizontalPadding} - 9px);
                    font-size: calc(${theme.fontSize} - 2px);
                `;
            default:
                console.error(`Button size '${props.size}' is not a valid button size.`);
                return undefined;
        }
    }

    return undefined;
};

export default ButtonSizeCss;
