/*
 * Copyright (C) 2016 Hello Sleep, all rights reserved
 */

'use strict';

// including plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

const filePath = {
  sass: {
    src: './public/sass/**/*.scss',
    dest: './public/css'
  }
};

gulp.task('sass', function () {
  return gulp.src(filePath.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(filePath.sass.dest));
});

gulp.task('watch-sass', function () {
  gulp.watch(filePath.sass.src, ['sass']).on('change', file => {
    console.log(`The ${file.path} changed`);
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

gulp.task('watch', ['watch-sass']);

gulp.task('default', ['watch', 'nodemon']);
