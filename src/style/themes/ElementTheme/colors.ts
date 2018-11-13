import { getColorShades } from '../../utils';
import {
    elementBlue,
    elementGreen,
    elementGray,
    elementOrange,
    elementRed,
    lightGray,
    gray,
} from '../../colors';

export interface IElementColors {
    defaultBorderColor: string;
    secondaryTextColor: string;
    primaryColor: string;
    primaryColorAccent: string;
    primaryColorLight: string;
    primaryColorHighlight: string;
    primaryColorDark: string;
    successColor: string;
    successColorAccent: string;
    successColorLight: string;
    successColorHighlight: string;
    successColorDark: string;
    infoColor: string;
    infoColorAccent: string;
    infoColorLight: string;
    infoColorHighlight: string;
    infoColorDark: string;
    warningColor: string;
    warningColorAccent: string;
    warningColorLight: string;
    warningColorHighlight: string;
    warningColorDark: string;
    dangerColor: string;
    dangerColorAccent: string;
    dangerColorLight: string;
    dangerColorHighlight: string;
    dangerColorDark: string;
}

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

const ElementColors: IElementColors = {
    defaultBorderColor: lightGray,
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
};

export default ElementColors;
