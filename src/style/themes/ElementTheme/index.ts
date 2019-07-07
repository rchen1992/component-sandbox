import ElementColors from './colors';
import zIndexes from './zIndexes';
import { ITheme } from '../theme-types';

const ElementTheme: ITheme = {
    fontSize: '16px',
    defaultButtonVerticalPadding: '12px',
    defaultButtonHorizontalPadding: '24px',
    defaultSwitchWidth: '50px',
    defaultSwitchCoreLength: '18px',
    defaultSwitchCorePadding: '4px',

    ...ElementColors,
    ...zIndexes,
};

export default ElementTheme;
