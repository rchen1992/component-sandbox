// const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('awesome-typescript-loader'),
        options: {
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
    });
    // defaultConfig.plugins.push(new TSDocgenPlugin());
    defaultConfig.resolve.extensions.push('.ts', '.tsx');

    return defaultConfig;
};
