const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const packageJson = require("./package.json");

module.exports = {
    entry: {
        background: "./src/background.js",
        "block-page/script": "./src/block-page/script.js"
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
                    from: "**/*",
                    context: "src/",
                    globOptions: {
                        ignore: ["**/*.js"]
                    }
                },
                {
                    from: "manifest.json",
                    to: "manifest.json",
                    transform: (content) => {
                        let manifestJson = JSON.parse(content);

                        manifestJson.description = packageJson.description;
                        manifestJson.version = packageJson.version;

                        return JSON.stringify(manifestJson, null, 2);
                    }
                }
            ],
        }),
    ],
};