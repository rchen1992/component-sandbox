import { ITheme } from 'sc-utils';
import { IInputProps } from './Input';

export enum InputSize {
    large = 'large',
    small = 'small',
    mini = 'mini',
}

export const inputHeight = (props: IInputProps & { theme: ITheme }): string | undefined => {
    if (props.inputSize) {
        switch (props.inputSize) {
            case InputSize.large:
                return '42px';
            case InputSize.small:
                return '30px';
            case InputSize.mini:
                return '22px';
            default:
                console.error(`Input size \`${props.inputSize}\` is not a valid input size.`);
        }
    }

    return '36px';
};

export const inputFontSize = (props: IInputProps & { theme: ITheme }): string | undefined => {
    if (props.inputSize) {
        switch (props.inputSize) {
            case InputSize.large:
                return '16px';
            case InputSize.small:
                return '13px';
            case InputSize.mini:
                return '12px';
            default:
                console.error(`Input size \`${props.inputSize}\` is not a valid input size.`);
        }
    }

    return '14px';
};
