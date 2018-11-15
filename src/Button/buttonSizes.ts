import { css } from '../sc-utils';
import { ButtonCssFunction } from './Button';

export enum ButtonSize {
    medium = 'medium',
    small = 'small',
    mini = 'mini',
}

const ButtonSizeCss: ButtonCssFunction = ({ theme, ...props }) => {
    if (theme && props.buttonSize) {
        switch (props.buttonSize) {
            case ButtonSize.medium:
                return css`
                    padding: calc(${theme.defaultButtonVerticalPadding} - 2px)
                        ${theme.defaultButtonHorizontalPadding};
                `;
            case ButtonSize.small:
                return css`
                    padding: calc(${theme.defaultButtonVerticalPadding} - 3px)
                        calc(${theme.defaultButtonHorizontalPadding} - 9px);
                    font-size: calc(${theme.fontSize} - 2px);
                `;
            case ButtonSize.mini:
                return css`
                    padding: calc(${theme.defaultButtonVerticalPadding} - 5px)
                        calc(${theme.defaultButtonHorizontalPadding} - 9px);
                    font-size: calc(${theme.fontSize} - 2px);
                `;
            default:
                console.error(`Button size '${props.buttonSize}' is not a valid button size.`);
                return undefined;
        }
    }

    return undefined;
};

export default ButtonSizeCss;
