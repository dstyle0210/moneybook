const {src,dest} = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function defaultTask(cb) {
    // place code for your default task here
    src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(dest("./public/css"))
    cb();
  }
  
  exports.default = defaultTask