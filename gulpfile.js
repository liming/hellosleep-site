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
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

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
    src: './src/client/index.js',
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

// add custom browserify options here
var customOpts = {
  entries: [filePath.js.src],
  debug: false
};
var opts = Object.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

// add transformations here
// i.e. b.transform(coffeeify);
b.transform(babelify.configure({
	presets: ['es2015', 'react']
}));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
  // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(filePath.js.destFile))
    .pipe(buffer())
  // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
  // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(filePath.js.destFolder));
}

gulp.task('watchcss', function() {
  gulp.watch(filePath.sass.src, ['build']).on('change', file => {
    console.log(`The ${file.path} changed. Rebuild`);
  });
});

gulp.task('default', ['set-env', 'watchcss', 'js', 'nodemon']);

gulp.task('build', ['sass', 'minify-css']);
