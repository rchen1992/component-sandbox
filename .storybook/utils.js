import wInfoStyle from '../src/styles.json';
export function wInfo(text) {
    return {
        info: {
            inline: true,
            source: false,
            styles: wInfoStyle,
            text: text,
        },
    };
}
