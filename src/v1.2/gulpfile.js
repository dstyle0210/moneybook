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

let version = "v1.2";
let distRoot = "../../dist/"+version;
let buildRoot = "../../public/"+version;

task("dist",function(done){
    src("../../dist/common/*.*")
    .pipe(dest("../../public/common"));

    src("../../dist/index.html")
    .pipe(dest("../../public/"));

    src([distRoot+"/**/*.css",distRoot+"/**/*.js",distRoot+"/**/index.html",distRoot+"/**/*.png"])
    .pipe(dest(buildRoot))
    .on("end",done);
});


task("common",(done)=>{
    const build = function(){
        return src("../common/**/*.js")
        .pipe(concat("common.js"))
        .pipe(dest("../../dist/common"));
    };
    watch("../common/**/*.js").on("change",(path)=>{
        build();
    }).on("ready",()=>{
        build();
        done();    
    });
});

task("res",function(done){
    src("./_resource/*.*")
    .pipe(dest(distRoot+"/asset/resource"))
    .on("end",done);
});

task("html",function(done){
    let globs = ["./_page/**/*.html"];
    function build(folderName){
        return src("./_page/"+folderName+"/**/*.html")
        .pipe(dest(distRoot+"/"+folderName));
    };
    return watch(globs).on("change",function(path){
        let folderName = (nodePath.parse(path).dir).replace("_page\\",""); // 폴더명 구하기
        return build(folderName).on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        fs.readdir("./_page",function(err,folders){
            folders.forEach(function(folderName){
                build(folderName);
            });
        });
        done();
        console.log("html watch Ready");
    });
});

task("uikit:scss",function(done){
    // let globs = ["./_uikit/1_atom/**/*.scss","./_uikit/2_module/**/*.scss","./_uikit/3_component/**/*.scss"]; // 일단은 section 까지 다 통합
    let globs = ["./_uikit/**/*.scss"];
    function build(){
        return src(globs)
        .pipe(concat("uikit.scss"))
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
            console.log("uikit:scss watch Ready");
        });
    });
});

task("uikit:jsx",function(done){
    let globs = ["./_uikit/**/*.jsx"];
    function build(){
        return src(globs)
        .pipe(concat("uikit.jsx"))
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(dest(distRoot+"/asset/js"));
    };
    return watch(globs).on("change",function(path){
        return build().on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        build().on("end",function(){
            done();
            console.log("uikit:jsx watch Ready");
        });
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

task("layout:jsx",function(done){
    let globs = ["./_layout/**/*.jsx"];
    function build(){
        return src(globs)
        .pipe(concat("layout.jsx"))
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(dest(distRoot+"/asset/js"));
    };
    return watch(globs).on("change",function(path){
        return build().on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        build().on("end",function(){
            done();
            console.log("layout:jsx watch Ready");
        });
    });
});

task("page:scss",function(done){
    let globs = ["./_page/**/*.scss"];
    function build(folderName){
        return src("./_page/"+folderName+"**/*.scss")
        .pipe(concat("index.scss"))
        .pipe(sass())
        .pipe(dest(distRoot+"/"+folderName));
    };
    return watch(globs).on("change",function(path){
        let folderName = (nodePath.parse(path).dir).replace("_page\\",""); // 폴더명 구하기
        return build(folderName).on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        fs.readdir("./_page",function(err,folders){
            folders.forEach(function(folderName){
                build(folderName);
            });
        });
        done();
        console.log("page:scss watch Ready");
    });
});

task("page:jsx",function(done){
    let globs = ["./_page/**/*.jsx"];
    function build(folderName){
        return src("./_page/"+folderName+"**/*.jsx")
        .pipe(concat("index.jsx"))
        .pipe(babel({
            plugins:["@babel/plugin-transform-react-jsx"]
        }))
        .pipe(dest(distRoot+"/"+folderName));
    };
    return watch(globs).on("change",function(path){
        let folderName = (nodePath.parse(path).dir).replace("_page\\",""); // 폴더명 구하기
        return build(folderName).on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        fs.readdir("./_page",function(err,folders){
            folders.forEach(function(folderName){
                build(folderName);
            });
        });
        done();
        console.log("page:jsx watch Ready");
    });
});

task("service:js",function(done){
    let globs = ["./_service/**/*.js"];
    function build(){
        return src(globs)
        .pipe(concat("service.js"))
        .pipe(dest(distRoot+"/asset/js"));
    };
    return watch(globs).on("change",function(path){
        return build().on("end",function(){
            console.log(path);
        });
    }).on("ready",function(){
        build().on("end",function(){
            done();
            console.log("service:js watch Ready");
        });
    });
});

task("dev",series("uikit:scss","uikit:jsx","layout:scss","layout:jsx","page:scss","page:jsx","service:js","html","res","common"));