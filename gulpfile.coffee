gulp = require("gulp")
sourcemaps = require("gulp-sourcemaps")
header = require("gulp-header")
watch = require("gulp-watch")
shell = require("gulp-shell")
cover = require("gulp-coverage")
inject = require("gulp-inject")
changed = require("gulp-changed")
watch = require("gulp-watch")
pkg = require('./package.json')
coffee = require("gulp-coffee")
coffeelint = require('gulp-coffeelint')
gutil = require('gulp-util')

gulp.task "lint", ->
  gulp.src('./libs/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())

banner = ['',
  ' # <%= pkg.name %> - <%= pkg.description %>',
  ' # @version v<%= pkg.version %>',
  ' # @link <%= pkg.homepage %>',
  ' # @license <%= pkg.license %>'].join('\n')

gulp.task "add-header", ->
    gulp.src("./libs/*.coffee")
    .pipe(header(banner,{pkg: pkg}))
    .pipe(gulp.dest('./libs'))

gulp.task "compress", ->
  gulp.watch "./libs/*.coffee", ->
    return gulp.src("./libs/*.coffee")
    .pipe(changed("./libs/*.coffee"))
    .pipe(sourcemaps.init())
    .pipe(coffee(bare: true))
    .on("error", gutil.log)
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./compressed"))


gulp.task "default", ["compress", "lint"], ->


