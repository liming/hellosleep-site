/*
 * Copyright (C) 2016 Hello Sleep, all rights reserved
 */

'use strict';

// including plugins
const gulp = require('gulp');
const less = require("gulp-less");
const nodemon = require('gulp-nodemon');

const filePath = {
  less: {
    src: './public/less/**/*.less',
    dest: './public/css'
  }
};

gulp.task('less', () => {

  console.log(filePath.less.src);

  return gulp.src(filePath.less.src)
    .pipe(less())
    .pipe(gulp.dest(filePath.less.dest));
});

gulp.task('watch-less', () => {
  gulp.watch(filePath.less.src, ['less']);
  gulp.watch(filePath.less.dest).on('change', file => {
    console.log("Changed less: " + file.path);
  });
});

gulp.task('nodemon', cb => {

  let started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true; 
    }
  });
});

gulp.task('watch', ['watch-less']);

gulp.task('default', ['watch', 'nodemon']);
