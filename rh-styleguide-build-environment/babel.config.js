module.exports = function (api) {
    api.cache.never();
    
    const presets = [
        ["@babel/preset-env", {
            "targets": {
                "node": "10",
                "browsers": ["last 2 versions", "ie >= 9"]
            },
        }],
        "@babel/preset-react"
    ];
    
    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "react-html-attrs"
    ];

    return {
        presets,
        plugins
    };
}
