import { lighten, darken, desaturate, setLightness } from 'polished';

/**
 * Object containing various shades of a certain color.
 */
interface IColorShades {
    highlight: string;
    accent: string;
    light: string;
    dark: string;
}

export const getColorShades = (color: string): IColorShades => ({
    highlight: lighten(0.07, color),
    accent: setLightness(0.82, color),
    light: setLightness(0.96, color),
    dark: desaturate(0.23, darken(0.07, color)),
});
