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


task("jsx:component",function(done){
    return watch("./src/component/**/*.jsx").on("change",function(path){
        src("./src/component/**/*.jsx")
        .pipe(concat("component.jsx"))
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(dest("./public/js"))
        .on("end",function(){
            console.log(path);
        })
    }).on("ready",function(){
        done();
    });
});
task("jsx:page",function(done){
    return watch("./src/page/**/*.jsx").on("change",function(path,stats){
        src(path)
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(flatten())
        .pipe(dest("./public/page"))
        .on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        done();
    });
});
task("jsx:service",function(done){
    return watch("./src/service/**/*.js").on("change",function(path){
        src("./src/service/**/*.js")
        .pipe(concat("service.js"))
        .pipe(dest("./public/js"))
        .on("end",function(){
            console.log(path);
        })
    }).on("ready",function(){
        done();
    });
});
task("jsx",series("jsx:component","jsx:page","jsx:service"));


task("scss",function(done){
    return watch("./src/**/*.scss").on("change",function(path){
        return src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(dest("./src/css"))
        .pipe(dest("./public/css"))
        .on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        done();
        console.log("scss:watch Ready");
    });
});