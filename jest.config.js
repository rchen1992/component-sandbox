module.exports = {
    preset: 'ts-jest/presets/js-with-babel',

    testURL: 'http://localhost',

    // A set of global variables that need to be available in all test environments
    globals: {
        __DEV__: false,
    },

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: [
        'node_modules',
        'src', // allows us to import with an absolute path from src folder
    ],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '\\.(ttf|svg)$': '<rootDir>/tests/mocks/fileMock.ts', // mocks out imports of static assets
        '\\.(css|scss)$': '<rootDir>/tests/mocks/styleMock.ts', // mocks out imports of css files
    },

    // Skip tests that match the regexes.
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
