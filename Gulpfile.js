var gulp = require("gulp");
var concat = require("gulp-concat");
var jade = require("gulp-jade");
var stylus = require("gulp-stylus");
var rename = require("gulp-rename");
var nib = require("nib");



gulp.task("estilos",function(){
	gulp.src("css/estilos.styl")
	.pipe(stylus({use:nib()}))
	.pipe(gulp.dest(""))
}),
gulp.task("concat",function(){
	gulp.src("js/**/*.js")
	.pipe(concat("app.js"))
	.pipe(gulp.dest(""))
})
gulp.task("jade",function(){
	gulp.src("template/jade/*.jade")
	.pipe(jade({pretty:true}))
	.pipe(gulp.dest("template"))
})


gulp.task("watch",["estilos","jade","concat"],function(){
	gulp.watch("css/**/*.styl",["estilos"])
	gulp.watch("template/jade/*.jade",["jade"])
	gulp.watch("js/**/*.js",["concat"])
})

gulp.task("default",["watch"])

//echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p