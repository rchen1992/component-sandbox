import { getColorShades } from '../../utils';
import {
    elementBlue,
    elementGreen,
    elementGray,
    elementOrange,
    elementRed,
    lightGray,
    lightBlueGray,
    lightBlack,
    gray,
    blue,
} from '../../colors';
import { IThemeColors } from '../theme-types';

const defaultPrimaryColor = elementBlue;

const {
    highlight: primaryColorHighlight,
    accent: primaryColorAccent,
    light: primaryColorLight,
    dark: primaryColorDark,
} = getColorShades(defaultPrimaryColor);

const {
    highlight: successColorHighlight,
    accent: successColorAccent,
    light: successColorLight,
    dark: successColorDark,
} = getColorShades(elementGreen);

const {
    highlight: infoColorHighlight,
    accent: infoColorAccent,
    light: infoColorLight,
    dark: infoColorDark,
} = getColorShades(elementGray);

const {
    highlight: warningColorHighlight,
    accent: warningColorAccent,
    light: warningColorLight,
    dark: warningColorDark,
} = getColorShades(elementOrange);

const {
    highlight: dangerColorHighlight,
    accent: dangerColorAccent,
    light: dangerColorLight,
    dark: dangerColorDark,
} = getColorShades(elementRed);

const ElementColors: IThemeColors = {
    defaultBorderColor: lightGray,
    defaultTextColor: lightBlack,
    secondaryTextColor: gray,
    primaryColor: defaultPrimaryColor,
    primaryColorAccent,
    primaryColorLight,
    primaryColorHighlight,
    primaryColorDark,
    successColor: elementGreen,
    successColorAccent,
    successColorLight,
    successColorHighlight,
    successColorDark,
    infoColor: elementGray,
    infoColorAccent,
    infoColorLight,
    infoColorHighlight,
    infoColorDark,
    warningColor: elementOrange,
    warningColorAccent,
    warningColorLight,
    warningColorHighlight,
    warningColorDark,
    dangerColor: elementRed,
    dangerColorAccent,
    dangerColorLight,
    dangerColorHighlight,
    dangerColorDark,
    linkColor: blue,
    lightBlueGray: lightBlueGray,
};

export default ElementColors;
