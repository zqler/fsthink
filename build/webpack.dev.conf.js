"use strict";
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");
//模拟后台接口
const express = require("express");
const app = express();
const router = express.Router();
var bodyPaeser = require("body-parser");
app.use("/api", router);
const user = require("../mock/user.json");
const usersList = require("../mock/userslist.json");
app.use(bodyPaeser.urlencoded({ extended: false }));
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: "warning",
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            { warnings: false, errors: true } :
            false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        },
        //提供模拟接口
        before(app) {
            app.use(function(req, res, next) {
                var s =
                    "[" +
                    Date.now() +
                    "] :" +
                    req.url +
                    ";" +
                    req.header("Authorization");
                console.info(s);
                next();
            });
            app.post("/api/login", function(req, res) {
                // let name = req.body.name;
                // let passWord = req.body.pwd;
                // console.info("[Login] name:" + name + " password: " + passWord);
                console.info(req.body);
                res.json(user);
            });
            app.get("/api/loginOut", function(req, res) {
                res.json(user);
            });
            app.get("/api/usersList", function(req, res) {
                res.json(usersList);
            });
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": require("../config/dev.env")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
                        ]
                    },
                    onErrors: config.dev.notifyOnErrors ?
                        utils.createNotifierCallback() :
                        undefined
                })
            );

            resolve(devWebpackConfig);
        }
    });
});