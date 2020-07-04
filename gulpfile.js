var gulp = require("gulp");
var javascriptObfuscator = require("gulp-javascript-obfuscator");
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var through = require('through2');
var minimist = require('minimist');
var imagemin = require("gulp-imagemin");
// var uglify = require("gulp-uglify");

var dir = "./release/wxgame/**/*";

//命令行获取平台参数
var knownOptions = {
    string: 'pf',
    default: { pf: 'wxgame' }
};
var options = minimist(process.argv.slice(2), knownOptions);

//压缩图片
// gulp.task("imagemin", function (cb) {
//     gulp.src(["./build/wechatgame/**/*.png"])
//         .pipe(imagemin([
//             imagemin.gifsicle({interlaced: true}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.optipng({optimizationLevel: 5})
//         ]))
//         .pipe(gulp.dest("./build/wechatgame"))
//         .on("end", cb);
// });

//正则匹配空字符，并打印文件名
function Check_nullchar(path) {
    // gutil.log(path)
    if (/\s+/.test(path)) {
        gutil.log(gutil.colors.red("空字符：" + path));
        return 'true';
    }
}

//名字含空字符会导致部分android手机加载不了CDN资源
gulp.task("checkNullChar", function (cb) {
    gulp.src(dir)
        .pipe(through.obj(function (file, enc, callback) {
            Check_nullchar(file.path)
            callback();
        })).on('data', function (data) {
        })
})

// //压缩libs库
// gulp.task("pack_libs", [], function (cb) {
//     gulp.src(["./release/wxgame/libs/*.js"])
//         .pipe(uglify())
//         .on('error', function (err) {
//             console.warn(err.toString());
//         })
//         .pipe(gulp.dest("./release/wxgame/libspack/")
//             .on("end", cb));
// })

// //压缩js
// gulp.task("pack_js", [], function (cb) {
//     gulp.src(["./bin/js/bundle.js"])
//         .pipe(uglify())
//         .on('error', function (err) {
//             console.warn(err.toString());
//         })
//         .pipe(gulp.dest("./release/wxgame/js/"));
// });

//混淆js 高性能配置
//gulp obfuse_js --pf wxgame
//https://gitee.com/ifaswind/ccc-obfuscated-code
gulp.task("obfuse_js", [], function (cb) {
    console.log('----------------', options.pf)
    gulp.src(["./bin/js/bundle.js"])
        .pipe(javascriptObfuscator({
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false, //屏蔽日志
            identifierNamesGenerator: 'hexadecimal',
            log: true,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            shuffleStringArray: true,
            splitStrings: false,
            stringArray: true,
            stringArrayEncoding: false,
            stringArrayThreshold: 0.75,
            unicodeEscapeSequence: false
        }))
        .pipe(gulp.dest("./release/" + options.pf + "/js/")
            .on("end", cb));
});


// 现在微信查重查的很严。 ui 和ui文件名字等还是要改一下过审的可能性才大。
// 用以下方法可以加大过审的可能性，不过 不能保证。
// 1. 混淆的方法 和之前一样，还是用 javascript-obfuscator  ， 不过可以试试加大假代码 "deadCodeInjectionThreshold": 0.3,  （obconfig.json中）的阈值
// 2. cocos 编译完后的 res 文件中有 很多json 文件（开放域下也有），可以将json文件的key的顺序 随机打乱一下。用 json-stable-stringify 就可以。

//参数说明：https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
