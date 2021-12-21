const {src,dest, task, series} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const concat = require("gulp-concat");

function defaultTask(cb) {
    // place code for your default task here
    cb();
  }


task("jsx:uikit",function(done){
    return src("./src/_uikit/**/*.jsx")
    .pipe(concat("uikit.jsx"))
    .pipe(babel({
        plugins:["@babel/plugin-transform-react-jsx"]
    }))
    .pipe(dest("./public/js"))
    .on("end",function(){
        done();
    });
});
task("jsx:page",function(done){
    return src("./src/page/**/*.jsx")
    .pipe(concat("page.jsx"))
    .pipe(babel({
        plugins:["@babel/plugin-transform-react-jsx"]
    }))
    .pipe(dest("./public/js"))
    .on("end",function(){
        done();
    });
});

task("jsx",series("jsx:uikit","jsx:page"));


task("scss",function(done){
    return src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(dest("./public/css"))
    .on("end",function(){
        done();
    });
});