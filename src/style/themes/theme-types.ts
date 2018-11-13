export interface IThemeColors {
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

export interface ITheme extends IThemeColors {
    fontSize: string;
    defaultButtonVerticalPadding: string;
    defaultButtonHorizontalPadding: string;
}
