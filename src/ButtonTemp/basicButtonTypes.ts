import { css } from '../sc-utils';
import { ButtonType, IButtonTypeCssMapping, getButtonTypeCssFromMapping } from './buttonTypes';
import TextButtonCss from './textButtonType';
import { ButtonCssFunction } from './Button';

/**
 * Takes the theme color property names of a particular
 * button type and returns a function.
 * The returned function accesses the theme and returns CSS based on the provided
 * button type color properties.
 *
 * Used to dyanmically create button types based on colors.
 *
 * @param {string} colorKey - name of color property in the theme prop
 * @param {string} highlightColorKey - name of highlight color property in the theme prop
 * @param {string} darkColorKey - name of dark color property in the theme prop
 */
const getButtonTypeCss = (
    colorKey: string,
    highlightColorKey: string,
    darkColorKey: string
): ButtonCssFunction => ({ theme }) =>
    theme &&
    css`
        color: white;
        border-color: ${theme[colorKey]};
        background-color: ${theme[colorKey]};

        &:hover {
            color: white;
            background-color: ${theme[highlightColorKey]};
            border-color: ${theme[highlightColorKey]};
        }

        &:active {
            background-color: ${theme[darkColorKey]};
            border-color: ${theme[darkColorKey]};
        }
    `;

/**
 * CSS for each button type.
 */
const PrimaryButtonCss = getButtonTypeCss(
    'primaryColor',
    'primaryColorHighlight',
    'primaryColorDark'
);
const SuccessButtonCss = getButtonTypeCss(
    'successColor',
    'successColorHighlight',
    'successColorDark'
);
const InfoButtonCss = getButtonTypeCss('infoColor', 'infoColorHighlight', 'infoColorDark');
const WarningButtonCss = getButtonTypeCss(
    'warningColor',
    'warningColorHighlight',
    'warningColorDark'
);
const DangerButtonCss = getButtonTypeCss('dangerColor', 'dangerColorHighlight', 'dangerColorDark');

const buttonTypeToCss: IButtonTypeCssMapping = {
    [ButtonType.PRIMARY]: PrimaryButtonCss,
    [ButtonType.SUCCESS]: SuccessButtonCss,
    [ButtonType.INFO]: InfoButtonCss,
    [ButtonType.WARNING]: WarningButtonCss,
    [ButtonType.DANGER]: DangerButtonCss,
    [ButtonType.TEXT]: TextButtonCss,
};

export default getButtonTypeCssFromMapping(buttonTypeToCss);
