var gulp = require('gulp');

var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jade = require('gulp-jade');
var gulpFilter = require('gulp-filter');
var connect = require('gulp-connect');

var paths = {
  js: ['source/js/**/*.js'],
  css: ['source/css/**/*.css', 'source/css/**/*.styl'],
  images: 'source/img/**/*',
  templates: ['source/**/*.jade'],
};

// Copy, minify and concat all JS
gulp.task('scripts', function() {
  console.log(paths.js);
  return gulp.src(paths.js)
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/js'));
});

// Copy, minify and concat all css
gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(stylus({use: [nib()]}))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('build/css'));
});

// Compile Jade templates
gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src(paths.templates)
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/'))
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(gulp.dest('build/img'));
});


// Rerun the task when a file changes
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.templates, ['templates']);
});

gulp.task('serve', ['watch'], function() {
  connect.server({
    root: 'build',
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['templates', 'scripts', 'images', 'css']);

