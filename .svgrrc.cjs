module.exports = {
    jsxRuntime: 'automatic',
    index: false,
    native: false,
    typescript: false,
    outDir: 'src/components/ui/',
    filenameCase: 'pascal',
    ext: 'jsx',
    template: require('./svgr-template.cjs'),

    svgoConfig: {
        plugins: [
            {
                name: 'removeViewBox',
                active: false,
            },
            {
                name: 'removeXMLNS',
                active: true,
            },
        ],
    },
};
