/**
 * Takes a slider value (arbitrary number that has meaning to the consuming component),
 * and converts it to an offset position (in pixels).
 *
 * This is useful for taking a starting slider value and rendering the correct
 * starting position for the slider.
 *
 * @param max - max value for slider
 * @param min - min value for slider
 * @param value - current slider value
 * @param sliderWidth - slider width
 */
export function convertSliderValueToOffsetPosition(
    max: number,
    min: number,
    value: number,
    sliderWidth: number
) {
    const absoluteWidth = max - min;
    const offsetPercentage = (value - min) / absoluteWidth;
    return Math.round(offsetPercentage * sliderWidth);
}

/**
 * Takes a slider offset position (in pixels) and converts it to
 * a meaningful value defined by the consuming component.
 *
 * For example, if your slider goes from 0-100,
 * this function takes an offset position in pixels and converts
 * it to a value between 0-100.
 *
 * @param max - max value for slider
 * @param min - min value for slider
 * @param positionX - current slider offset position (in pixels)
 * @param sliderWidth - slider width
 */
export function convertOffsetPositionToSliderValue(
    max: number,
    min: number,
    positionX: number,
    sliderWidth: number
) {
    const offsetPercentage = positionX / sliderWidth;
    const absoluteWidth = max - min;
    const offsetValue = Math.round(offsetPercentage * absoluteWidth);
    return offsetValue + min;
}
