// Imports

const gulp        = require('gulp'),
      del         = require('del'),
      newer       = require('gulp-newer'),
      // CSS processing
      sass        = require('gulp-sass'),
      cleanCSS    = require('gulp-clean-css'),
      // Templating
      nunjucks    = require('gulp-nunjucks-render'),
      // JavaScript handling
      concat      = require('gulp-concat'),
      terser      = require('gulp-terser'),
      // Development browser
      browserSync = require('browser-sync'),
      reload      = browserSync.reload;


// TASKS

// Clean previous build

gulp.task('clean', function(done){
  // Deletes all files from dist/
  del.sync('dist/', {force: true});
  done()
});


// Nunjucks

gulp.task('nunjucks', function() {
  // Gets all .html files in pages
  return gulp.src('app/**/*.html')
  // Renders template with nunjucks
  .pipe(nunjucks({
    path: ['app/templates/']
  }))
  // Outputs files in dist folder
  .pipe(gulp.dest('dist'))
});


// Sass preprocessing and CSS minifying

gulp.task('sass', function(){
  return gulp.src('scss/style.scss')
    .pipe(sass()) // Compiles styles.scss to css
    .pipe(cleanCSS({compatibility: 'ie9'})) // Minifies CSS
    .pipe(gulp.dest('app/static/css'))
    .pipe(reload({
      stream: true
    }))
  });


// Concat and minify JavaScript

gulp.task('js', function() {
  const files = [
    // Uncomment 2 lines below to add Bootstrap JS support
    // 'node_modules/jquery/dist/jquery.slim.min.js',
    // 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'js/*.js'
  ];
  return gulp.src(files)
    .pipe(concat('scripts.js'))
    // Minify JS
    .pipe(terser())
    .pipe(gulp.dest('dist/static/js/'));
});


// Copy all static files

gulp.task('copy-static', function(){
  return gulp.src('app/static/**/*.*', {base: './app/static/'})
  .pipe(gulp.dest('dist/static/'));
});

gulp.task('reload', function(done){
  reload();
  done();
});


// Watch for changes

gulp.task('watch', function(done){
  // Watch HTML pages
  gulp.watch('app/**/*.html',
             gulp.series('nunjucks', 'copy-static', 'reload'));
  // Watch SCSS files
  gulp.watch('scss/**/*.scss', gulp.series('sass', 'copy-static'));
  // Watch JS files
  gulp.watch('js/*.js', gulp.series('js', 'reload'));
  done();
});


// Starts browserSync

gulp.task('serve', function(done){
  browserSync({
    server: {
      baseDir: './dist',
      index: "index.html",
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });
  done();
});


// Series

// Default task
gulp.task('default', gulp.series('clean', 'sass', 'nunjucks', 'js',
  'copy-static', 'serve', 'watch'));

// Deployment task
gulp.task('build', gulp.series('clean', 'sass', 'nunjucks', 'js',
  'copy-static'));
