const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        background: "./src/background.js",
        blocked: "./src/blocked.js"
    },
    mode: "production",
    resolve: {
        extensions: [".js"],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "static"
                }
            ],
        }),
    ],
};