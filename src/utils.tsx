import * as wInfoStyle from './styles.json';

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
