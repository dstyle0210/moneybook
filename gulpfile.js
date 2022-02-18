const nodePath = require('path');
const {src,dest, task, series, watch} = require("gulp");
const replace = require('gulp-replace');
const shell = require('gulp-shell');


let version = "v1.2";
task('serve:firebase', shell.task([
    'firebase serve'
]));
task('deploy:firebase', shell.task([
    'firebase deploy'
]));


// 개발용 서버 설정
task("dist:ready", function(done){
    return src("./firebase.json")
        .pipe(replace(/"public",/,'"dist",'))
        .pipe(dest("./"))
        .on("end",function(){
            done();
        });
});
task("dist:db", function(done){
    src("./src/"+version+"/_service/getReceiptsUrl.js")
        .pipe(replace(/DBNAME = "real"/,'DBNAME = "dev"'))
        .pipe(dest("./src/"+version+"/_service/"));

    src("./dist/"+version+"/asset/js/service.js")
        .pipe(replace(/DBNAME = "real"/,'DBNAME = "dev"'))
        .pipe(dest("./dist/"+version+"/asset/js/"))
        .on("end",function(){
            done();
        });
});

task("dist:serve",series("dist:ready","dist:db","serve:firebase"))

// 배포용 서버 설정
task('public:ready', function(done){
    return src("./firebase.json")
        .pipe(replace(/"dist",/,'"public",'))
        .pipe(dest("./"))
        .on("end",function(){
            done();
        });
});
task("public:db", function(done){
    src("./src/"+version+"/_service/getReceiptsUrl.js")
        .pipe(replace(/DBNAME = "dev"/,'DBNAME = "real"'))
        .pipe(dest("./src/"+version+"/_service/"));

    src("./dist/"+version+"/asset/js/service.js")
        .pipe(replace(/DBNAME = "dev"/,'DBNAME = "real"'))
        .pipe(dest("./dist/"+version+"/asset/js/"));

    src("./public/"+version+"/asset/js/service.js")
        .pipe(replace(/DBNAME = "dev"/,'DBNAME = "real"'))
        .pipe(dest("./public/"+version+"/asset/js/"))
        .on("end",function(){
            done();
        });
});
task("public:serve",series("public:ready","public:db","serve:firebase"))
task("deploy",series("public:ready","public:db","deploy:firebase"))