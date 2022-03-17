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

/*! 변수 설정 */
let version = "v1.3";
let srcRoot = "../../src/"+version+"/pages";
let distRoot = "../../dist/"+version;
let buildRoot = "../../public/"+version;

/*! 공통함수 */
function getFolderName(watchPath,rootFolderName){
    return (nodePath.parse(watchPath).dir).replace(rootFolderName+"\\",""); // 폴더명 구하기
}

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
        let folderName = getFolderName(path,"pages"); // 폴더명 구하기
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

task("layout:scss",function(done){
    let globs = ["./_layout/**/*.scss"];
    function build(){
        return src(globs)
        .pipe(concat("layout.scss"))
        .pipe(sass())
        .pipe(dest(distRoot+"/asset/css"));
    };
    return watch(globs).on("change",function(path){
        return build().on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        build().on("end",function(){
            done();
            console.log("layout:scss watch Ready");
        });
    });
});




task("dev",series("page:scss"));