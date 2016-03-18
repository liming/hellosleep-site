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

const filePath = {
  main: './src/app.js',
  sass: {
    src: './src/public/sass/**/*.scss',
    dest: './src/public/css'
  },
  css: {
    src: './src/public/css/*.css',
    dest: './src/public/css/dist'
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
    script: filePath.main
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

gulp.task('watch', function() {
  gulp.watch(filePath.sass.src, ['build']).on('change', file => {
    console.log(`The ${file.path} changed. Rebuild`);
  });
});

gulp.task('default', ['set-env', 'watch', 'nodemon']);

gulp.task('build', ['sass', 'minify-css']);
