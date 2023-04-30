let project_folder = "dist";
let source_folder = "src";

let fs = require('fs');

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: [source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", "!" + source_folder + "/img/icons/*", "!" + source_folder + "/img/**/_*.{jpg,png,svg,gif,ico,webp}"],
        img_no_crop: source_folder + "/img/**/_*.{jpg,png,svg,gif,ico,webp}",
        icons: source_folder + "/img/icons/*.{jpg,png,svg,gif,ico,webp}",
        video: source_folder + "/img/**/*.mp4",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        img_no_crop: source_folder + "/img/**/_*.{jpg,png,svg,gif,ico,webp}",
        icons: source_folder + "/img/icons/*.{jpg,png,svg,gif,ico,webp}",
        video: source_folder + "/img/**/*.mp4"
    },
    clean: "./" + project_folder + "/"
};

let {
    src,
    dest
} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    htmlmin = require("gulp-htmlmin"),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imageresize = require("gulp-image-resize"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    webpack = require("webpack-stream");


function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/",
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
        port: 3000,
        notify: false
    });
}

function html_no_min() {
    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '_9'
        }))
        .pipe(rename({
            extname: ".no-min.html"
        }))
        .pipe(dest(path.build.html));
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '_9'
        }))
        /* .pipe(webphtml()) */
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        /* .pipe(webpcss()) */
        .pipe(dest(path.build.css))
        .pipe(
            clean_css()
        )
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude({
            prefix: '_9'
        }))
        .pipe(dest(path.build.js))
        /* .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.min.js'
            },
            watch: false,
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]
                            ]
                        }
                    }
                }]
            }
        })) */
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.min.js'
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]
                            ]
                        }
                    }
                }]
            }
        }))
        .pipe(
            uglify()
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img + '1400/'))
        .pipe(src(path.src.img))
        .pipe(
            imageresize({
                width: 1400,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: true
            })
        )
        .pipe(dest(path.build.img + '1400/'))
        .pipe(src(path.src.img))
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img + '992/'))
        .pipe(src(path.src.img))
        .pipe(
            imageresize({
                width: 992,
                quality: 0.9,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: true
            })
        )
        .pipe(dest(path.build.img + '992/'))
        .pipe(src(path.src.img))
        .pipe(
            webp({
                quality: 95
            })
        )
        .pipe(dest(path.build.img + '768/'))
        .pipe(src(path.src.img))
        .pipe(
            imageresize({
                width: 768,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: true
            })
        )
        .pipe(dest(path.build.img + '768/'))
        .pipe(src(path.src.img))
        .pipe(
            webp({
                quality: 95
            })
        )
        .pipe(dest(path.build.img + '425/'))
        .pipe(src(path.src.img))
        .pipe(
            imageresize({
                width: 425,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: true
            })
        )
        .pipe(dest(path.build.img + '425/'));
}

function images_no_crop() {
    return src(path.src.img_no_crop)
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img + '1400/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            imageresize({
                width: 1400,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: false
            })
        )
        .pipe(dest(path.build.img + '1400/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img + '992/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            imageresize({
                width: 992,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: false
            })
        )
        .pipe(dest(path.build.img + '992/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img + '768/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            imageresize({
                width: 768,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: false
            })
        )
        .pipe(dest(path.build.img + '768/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img + '425/'))
        .pipe(src(path.src.img_no_crop))
        .pipe(
            imageresize({
                width: 425,
                quality: 0.95,
                noProfile: true,
                interlance: true,
                cover: true,
                crop: false
            })
        )
        .pipe(dest(path.build.img + '425/'));
}

function icons() {
    return (src(path.src.icons))
        .pipe(
            webp({
                quality: 75
            })
        )
        .pipe(dest(path.build.img + 'icons/'))
        .pipe(src(path.src.icons))
        .pipe(
            imageresize({
                quality: 0.9,
                noProfile: true,
                interlance: true,
                cover: true,
            })
        )
        .pipe(dest(path.build.img + "icons/"));

}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

function fontsStyle() {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        });
    }
}

function cb() {}

function copy() {
    return src(path.src.video)
        .pipe(dest(path.build.img));

}

gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
});


function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.img_no_crop], images_no_crop);
    gulp.watch([path.watch.video], copy);
    gulp.watch([path.watch.icons], icons);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, html_no_min, images, copy, icons, images_no_crop, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.html_no_min = html_no_min;
exports.images_no_crop = images_no_crop;
exports.icons = icons;
exports.copy = copy;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;