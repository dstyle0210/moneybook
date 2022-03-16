const nodePath = require('path');
const fs = require('fs');
const {src,dest, task, series, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const flatten = require('gulp-flatten');


function defaultTask(cb) {
    // place code for your default task here
    cb();
}

let version = "v1.3";
let srcRoot = "../../src/"+version+"/pages";
let distRoot = "../../dist/"+version;
let buildRoot = "../../public/"+version;

task("page:scss",function(done){
    let globs = ["./pages/**/*.scss"];
    function build(folderName){
        return src("./pages/"+folderName+"**/*.scss")
        .pipe(concat("index.scss"))
        .pipe(sass())
        .pipe(dest(srcRoot+"/"+folderName))
        .pipe(dest(distRoot+"/"+folderName));
    };
    return watch(globs).on("change",function(path){
        let folderName = (nodePath.parse(path).dir).replace("pages\\",""); // 폴더명 구하기
        return build(folderName).on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        fs.readdir("./pages",function(err,folders){
            folders.forEach(function(folderName){
                build(folderName);
            });
        });
        done();
        console.log("pages:scss watch Ready");
    });
});