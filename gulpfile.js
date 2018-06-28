const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rev  = require('gulp-rev');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: 'src/assets/styles/**/*.scss',
    dest: './dist/'
  },
  scripts: {
    src: 'src/assets/scripts/**/*.js',
    dest: './dist/'
  },
  html: {
    src: 'src/**/*.html',
    dest: './dist/'
  }
};

const clean = () => del(['dist']);
gulp.task('clean', clean);


const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
};
gulp.task('styles', styles);

const scripts = () => {
  return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
};
gulp.task('scripts', scripts);


const html = () => {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
};


const build = gulp.series(clean, gulp.parallel(styles, scripts, html));
gulp.task('build', build);



const serve = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
  }
  });


  gulp.watch('src/assets/styles/**/*.scss', styles);
}
gulp.task('default', gulp.parallel(styles, scripts, html, serve));
