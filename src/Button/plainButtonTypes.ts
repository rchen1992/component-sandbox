import { css } from 'styled-components';
import { ButtonType, getButtonTypeCssFromMapping } from './buttonTypes';
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
 * @param {string} accentColorKey - name of accent color property in the theme prop
 * @param {string} lightColorKey - name of light color property in the theme prop
 * @param {string} darkColorKey - name of dark color property in the theme prop
 */
const getButtonTypeCss = (
    colorKey: string,
    accentColorKey: string,
    lightColorKey: string,
    darkColorKey: string
): ButtonCssFunction => ({ theme }) =>
    theme &&
    css`
        color: ${theme[colorKey]};
        border-color: ${theme[accentColorKey]};
        background-color: ${theme[lightColorKey]};

        &:hover {
            color: white;
            border-color: ${theme[colorKey]};
            background-color: ${theme[colorKey]};
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
    'primaryColorAccent',
    'primaryColorLight',
    'primaryColorDark'
);
const SuccessButtonCss = getButtonTypeCss(
    'successColor',
    'successColorAccent',
    'successColorLight',
    'successColorDark'
);
const InfoButtonCss = getButtonTypeCss(
    'infoColor',
    'infoColorAccent',
    'infoColorLight',
    'infoColorDark'
);
const WarningButtonCss = getButtonTypeCss(
    'warningColor',
    'warningColorAccent',
    'warningColorLight',
    'warningColorDark'
);
const DangerButtonCss = getButtonTypeCss(
    'dangerColor',
    'dangerColorAccent',
    'dangerColorLight',
    'dangerColorDark'
);

const buttonTypeToCss = {
    [ButtonType.primary]: PrimaryButtonCss,
    [ButtonType.success]: SuccessButtonCss,
    [ButtonType.info]: InfoButtonCss,
    [ButtonType.warning]: WarningButtonCss,
    [ButtonType.danger]: DangerButtonCss,
    [ButtonType.text]: TextButtonCss,
};

export default getButtonTypeCssFromMapping(buttonTypeToCss);
