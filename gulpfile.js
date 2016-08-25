/*
 * Copyright (C) 2016 Hello Sleep, all rights reserved
 */

'use strict';

// including plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const WebpackDevServer = require("webpack-dev-server");

const filePath = {
  main: './src/app.js',
  sass: {
    src: './src/public/sass/**/*.scss',
    dest: './src/public/css'
  },
  css: {
    src: './src/public/css/*.css',
    dest: './src/public/css/dist'
  },
  js: {
    src: './src/client/**/*',
    destFile: 'dist.js',
    destFolder: './src/public/js'
  }
};

gulp.task('sass', function () {
  return gulp.src(filePath.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(filePath.sass.dest));
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src(filePath.css.src)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(filePath.css.dest));
});


gulp.task('watch-sass', function () {
  gulp.watch(filePath.sass.src, ['sass']).on('change', file => {
    console.log(`The ${file.path} changed`);
  });
});

gulp.task('nodemon', cb => {

  let started = false;

  return nodemon({
    exec: 'node',
    script: filePath.main,
    watch: [
      'src/app.js',
      'src/routes/',
      'src/models/',
      'src/lib/'
    ],
    ignore: [
      'src/client/**',
      'src/public/**'
    ]
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true; 
    }
  });
});

gulp.task('set-env', function () {
  env({
    vars: {
      NODE_PATH: 'src'
    }
  });
});

gulp.task('watchcss', function() {
  gulp.watch(filePath.sass.src, ['build']).on('change', file => {
    console.log(`The ${file.path} changed. Rebuild`);
  });
});

// configure webpack
gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/" + myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});

// modify some webpack config options
const myDevConfig = Object.create(webpackConfig);
myDevConfig.debug = true;

const devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("build-dev", ["webpack:build-dev"], function() {
	gulp.watch([filePath.js.src], ["webpack:build-dev"]);
});


gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('default', ['set-env', 'watchcss', 'build-dev', 'nodemon']);

gulp.task('build', ['sass', 'minify-css', 'webpack:build']);
