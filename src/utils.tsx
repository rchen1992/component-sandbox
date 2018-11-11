import * as wInfoStyle from './styles.json';
import { StyledFunction } from 'styled-components';

/**
 * Wraps a styled-components function with prop types.
 */
export function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(
    styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
    return styledFunction;
}

export function wInfo(text: string): any {
    return {
        info: {
            inline: true,
            source: false,
            styles: wInfoStyle,
            text: text,
        },
    };
}
