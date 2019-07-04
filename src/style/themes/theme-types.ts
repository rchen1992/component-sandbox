/**
 * All color variables for theme.
 */
export interface IThemeColors {
    defaultBorderColor: string;
    defaultTextColor: string;
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
    linkColor: string;
    disabledColor: string;
}

export interface IThemeZIndexes {
    zIndexOverlay: number;
    zIndexModal: number;
}

/**
 * Object containing theme variables.
 */
export interface ITheme extends IThemeColors, IThemeZIndexes {
    fontSize: string;
    defaultButtonVerticalPadding: string;
    defaultButtonHorizontalPadding: string;
    defaultSwitchWidth: string;
    defaultSwitchCoreLength: string;
    defaultSwitchCorePadding: string;
}
