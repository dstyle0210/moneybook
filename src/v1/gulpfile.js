const nodePath = require('path');
const {src,dest, task, series, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const flatten = require('gulp-flatten');

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

task("scss",function(done){
    return watch("./src/v1/**/*.scss").on("change",function(path){
        return src("./src/v1/_entry/*.scss")
        .pipe(sass())
        .pipe(dest("./src/v1/css"))
        .pipe(dest("./public/v1/css"))
        .on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        done();
        console.log("scss watch Ready");
    });
});

task("jsx:atomic",function(done){
    return watch("./src/v1/_atomic/**/*.jsx").on("change",function(path){
        src("./src/v1/_atomic/**/*.jsx")
        .pipe(concat("component.jsx"))
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(dest("./public/v1/js"))
        .on("end",function(){
            console.log(path);
        })
    }).on("ready",function(){
        done();
        console.log("jsx:atomic watch Ready");
    });
});
task("jsx:page",function(done){
    return watch("./src/v1/_page/**/*.jsx").on("change",function(path){
        src(path)
        .pipe(concat("index.jsx"))
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(dest("./public/v1/"+nodePath.parse(path).name))
        .on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        done();
        console.log("jsx:page watch Ready");
    });
});
task("jsx:service",function(done){
    return watch("./src/v1/_service/**/*.js").on("change",function(path){
        src("./src/v1/_service/**/*.js")
        .pipe(concat("service.js"))
        .pipe(dest("./public/v1/js"))
        .on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        done();
        console.log("jsx:service watch Ready");
    });
});

task("dev",series("scss","jsx:atomic","jsx:service","jsx:page"))