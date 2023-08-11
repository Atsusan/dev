const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const browserSync = require("browser-sync");
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const htmlBeautify = require("gulp-html-beautify");

function compileSass() {
  return gulp
    .src("./src/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssSorter()]))
    .pipe(mmq())
    .pipe(gulp.dest("../public/assets/css/"))
    .pipe(cleanCss())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("../public/assets/css/"));
}

function watch(done) {
  gulp.watch(
    "./src/assets/sass/**/*.scss",
    gulp.series(compileSass, browserReload)
  );
  gulp.watch("./src/assets/js/**/*.js", gulp.series(minJS, browserReload));
  gulp.watch("./src/assets/**/*", gulp.series(copyImage, browserReload));
  gulp.watch("./src/**/*.html", gulp.series(formatHTML, browserReload));
  gulp.watch("../public/**/*.php", browserReload);
  done();
}

function browserInit() {
  browserSync.init({
    server: {
      baseDir: "../public",
    },
    // proxy: "http://teamf.wp/" // local でWordPressを作成する時にドメインを変更する必要あり！
  });
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function minJS() {
  return gulp
    .src("./src/assets/js/**/*.js")
    .pipe(gulp.dest("../public/assets/js/"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("../public/assets/js/"));
}

function formatHTML() {
  return gulp
    .src("./src/**/*.html")
    .pipe(
      htmlBeautify({
        indent_size: 2,
        indent_with_tabs: true,
      })
    )
    .pipe(gulp.dest("../public/"));
}

function copyImage() {
  return gulp
    .src("./src/assets/img/**/*")
    .pipe(gulp.dest("../public/assets/img/"));
}

exports.compileSass = compileSass;
exports.watch = watch;
exports.browserInit = browserInit;
exports.minJS = minJS;
exports.formatHTML = formatHTML;
exports.dev = gulp.parallel(watch, browserInit);
exports.build = gulp.parallel(formatHTML, minJS, compileSass, copyImage);
exports.build2 = gulp.parallel(minJS, compileSass, copyImage);
