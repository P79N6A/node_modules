var gulp = require("gulp"),
     uglify = require("gulp-uglifyjs"),
     concat = require("gulp-concat"),
     css = require('gulp-css'),
     sass = require('gulp-sass'),
     autoprefixer = require('gulp-autoprefixer'),
     minifycss = require('gulp-minify-css'),
     image = require('gulp-image'),
     rename = require('gulp-rename'),
     imagemin = require('gulp-imagemin'),
     pngquant = require('imagemin-pngquant'),
     browserSync = require('browser-sync');

/////////////////////////////////////////////////////////
gulp.task("js", function () {
     return gulp.src(require("./dependencies.json").js)
          .pipe(concat("script.js"))
//          .pipe(rename({
//               suffix: "",
//               prefix: ""
//          }))
//          .pipe(uglify())
          .pipe(gulp.dest("./build/js/"))
});
gulp.task('sass', function () {
     return gulp.src(require("./dependencies.json").sass)
          .pipe(sass())
          .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
               cascade: true
          }))
          .pipe(gulp.dest("app/css/"))
});
gulp.task('css', function () {
     return gulp.src(require("./dependencies.json").css)
          .pipe(concat("main.css"))
          .pipe(autoprefixer({
               browsers: ["last 20 versions"],
               cascade: false
          }))
          //           .pipe(minifycss()) 
          .pipe(gulp.dest("./build/css/"))
});
gulp.task('browser-sync', ["css", "js", "sass",], function () {
     browserSync({
          server: {
               baseDir: 'build'
          },
          notify: true
     })
});
gulp.task("html", function () {
     gulp.src("app/*.html")
          .pipe(gulp.dest("build"))
})
gulp.task("img", function () {
     return gulp.src('app/img/**/*')
          .pipe(imagemin({
               interlaced: true,
               progressive: true,
               svgoPlugins: [{
                    removeViewBox: false
               }],
               une: [pngquant()]
          }))
          .pipe(gulp.dest("./build/img/"));
});
gulp.task('watch', ['browser-sync', 'sass', 'css', "js", "img"], function () {
     gulp.watch('app/sass/**/*.sass', ["sass"]);
     gulp.watch("app/css/**/*.css", ["css"]);
     gulp.watch("app/*.html", ["html"]);
     gulp.watch("app/*.jpg", ["jpg"]);
     gulp.watch("app/js/**/*.js", ["js"]);
     gulp.watch('app/css/*.css', browserSync.reload);
     gulp.watch('app/*.html', browserSync.reload);
     gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('default', ['watch']);
/////////////////////////////////////////////////////////////////////////////
