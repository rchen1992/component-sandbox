import * as wInfoStyle from './styles.json';

export function wInfo(text: string): any {
    return {
        info: { inline: true, source: false, styles: wInfoStyle, propTables: false, text: text },
    };
}

/**
 * Returns number of newlines in a string.
 */
export function countNewlines(s: string) {
    let count = 0;
    for (let char of s) {
        if (char === '\n') {
            count++;
        }
    }
    return count;
}
