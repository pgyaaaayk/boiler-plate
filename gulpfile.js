var gulp = require("gulp"),
    sass = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    browser = require("browser-sync"),
    plumber = require("gulp-plumber");

// Sassコンパイルタスク
gulp.task("sass", function() {
  gulp.src("sass/**/*scss")
    .pipe(frontnote())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./css"))
    .pipe(browser.reload({stream:true}))
});

gulp.task("js", function() {
  gulp.src(["js/**/*.js","!js/min/**/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./js/min"))
    .pipe(browser.reload({stream:true}))
});

// watchタスク(**/*.scss変更時に実行するタスク)
gulp.task("default",['server'], function() {
  gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
  gulp.watch("sass/**/*.scss",["sass"]);
});

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./"
    }
  });
});