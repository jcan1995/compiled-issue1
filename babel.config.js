module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: '> 1% in US, iOS 14'
            }
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
                importSource: 'preact'
            }
        ]
    ],
    plugins: ['lodash', '@compiled/babel-plugin', 'preval']
}
