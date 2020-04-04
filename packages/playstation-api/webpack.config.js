const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./src/index.ts",
    mode: "production",
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
        library: "playstation-api",
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/,
            },
        ],
    },
    externals: [nodeExternals()],
};
