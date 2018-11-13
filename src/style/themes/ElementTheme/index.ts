import ElementColors, { IElementColors } from './colors';

export interface IElementTheme extends IElementColors {
    fontSize: string;
    defaultButtonVerticalPadding: string;
    defaultButtonHorizontalPadding: string;
}

const ElementTheme: IElementTheme = {
    fontSize: '16px',
    defaultButtonVerticalPadding: '12px',
    defaultButtonHorizontalPadding: '24px',
    ...ElementColors,
};

export default ElementTheme;
