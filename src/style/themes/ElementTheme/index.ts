import ElementColors from './colors';
import { ITheme } from '../theme-types';

const ElementTheme: ITheme = {
    fontSize: '16px',
    defaultButtonVerticalPadding: '12px',
    defaultButtonHorizontalPadding: '24px',
    ...ElementColors,
};

export default ElementTheme;
