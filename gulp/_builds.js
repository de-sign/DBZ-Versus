// Require
const gulp          = require('gulp');
const mergeWith     = require('lodash.mergewith');
const del           = require('del');
const plumber       = require('gulp-plumber');
const include       = require('gulp-include');
const data          = require('gulp-data');
const fs            = require('fs');
const url           = require('url');
const path          = require('path');
const nunjucks      = require('gulp-nunjucks');
const gulpif        = require('gulp-if');
//const sourcemaps    = require('gulp-sourcemaps');
const concat        = require('gulp-concat');
const beautify      = require('gulp-beautify');
const uglify        = require('gulp-uglify');
const sass          = require('gulp-sass');
const rename        = require('gulp-rename');
const cleanCss      = require('gulp-clean-css');
const imagemin      = require('gulp-imagemin');
const favicons      = require('gulp-favicons');
const replace       = require('gulp-replace');

// Export
module.exports = function(config){
    
    const _builds = {
        clean: () => {
            return del([config.paths.dest.root], { force: true });
        },

        favicon: (() => {
            function _getData(file){
                let FW = require('../' + config.paths.src.data + '/website.json');

                return Object.assign({}, FW.favicon, config.plugins.favicons, {
                    appName: FW.meta.title,
                    appDescription: FW.meta.description,
                    url: FW.url.origin,
                    path: '{{ FW.paths.favicon }}',
                    html: config.files.dest.favicon
                } );
            };

            return gulp.series(
                function favicon__generate() {
                    return gulp.src(config.paths.src.favicon + '/' + config.files.src.favicon)
                        .pipe(favicons(_getData()))
                        .pipe(gulp.dest(config.paths.dest.favicon));
                },
                function favicon__move_html() {
                    return gulp.src(config.paths.dest.favicon + '/' + config.files.dest.favicon)
                        .pipe(replace(/(?:%7B){2}(?:%20)*(.+?)(?:%20)*(?:%7D){2}/gi, '{{ $1 }}'))
                        .pipe(gulp.dest(config.paths.src.templates));
                },
                function favicon__delete() {
                    return del([config.paths.dest.favicon + '/' + config.files.dest.favicon], { force: true });
                }
            );
        })(),
        
        njk: () => {
            return gulp.src(config.paths.src.njk + '/' + config.files.src.njk)
                .pipe(plumber(config.plugins.plumber))
                .pipe(include(config.plugins.include.njk))
                .pipe(rename(config.files.dest.njk))
                .pipe(plumber.stop())
                .pipe(gulp.dest(config.paths.dest.njk));
        },
        
        html: (() => {
            let FW = null;
            const fCustomizer = (objValue, srcValue) => {
                    if(Array.isArray(objValue)){
                        return srcValue;
                    }
                };

            function _getData(file){
                FW = mergeWith(
                    mergeWith(
                        require('../package.json'),
                        require('../' + config.paths.src.data + '/website.json'),
                        fCustomizer
                    ),
                    require(path.dirname(file.path) + '/page.json'),
                    fCustomizer
                );
                FW.url = url.parse(FW.url.origin + FW.url.path);

                const date = new Date();
                FW.date = '' + date.getFullYear() + date.getMonth() + date.getDate();
                FW.time = '' + date.getHours() + date.getMinutes() + date.getSeconds();
                
                let s_root = config.paths.dest.root;
                FW.paths = {};
                for( let s_path in config.paths.dest ){
                    FW.paths[s_path] = path.relative( s_root + path.dirname(FW.url.pathname), config.paths.dest[s_path] ).split(path.sep).join('/');
                }

                let mustache = (uData) => {
                    if( Object.prototype.toString.call(uData) === '[object Object]' ){
                        for( let sProp in uData ){
                            uData[sProp] = mustache(uData[sProp]);
                        }
                        return uData;
                    } else if( Array.isArray(uData) ){
                        return uData.map(mustache);
                    } else if( typeof uData === 'string' ) {
                        return uData.replace( /\{\{\s*FW\.(.+?)\s*\}\}/g, (sFind, sCatch) => {
                            let sReturn = FW;
                            sCatch.split('.').forEach( sProp => {
                                sReturn = sReturn[sProp];
                            } );
                            return sReturn.toString();
                        } );
                    } else {
                        return uData;
                    }
                }
                return { FW: mustache(FW) };
            };

            return function html() {
                return gulp.src(config.paths.src.html + '/' + config.files.src.html)
                    .pipe(plumber(config.plugins.plumber))
                    .pipe(data(_getData))
                    .pipe(nunjucks.compile({ type: "native" }, config.plugins.nunjucks))
                    .pipe(gulpif(config.env.isDevelopment, beautify.html(config.plugins.beautify.html)))
                    .pipe(rename( file => config.files.dest.html(FW, file) ))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest(config.paths.dest.html));
            };
        })(),

        js: () => {
            return gulp.src(config.paths.src.js + '/' + config.files.src.js)
                .pipe(plumber(config.plugins.plumber))
                //.pipe(gulpif(config.env.isDevelopment, sourcemaps.init(config.plugins.sourcemaps.js.init)))
                .pipe(include(config.plugins.include.js))
                .pipe(gulpif(!config.env.isDevelopment, uglify(config.plugins.uglify)))
                //.pipe(gulpif(config.env.isDevelopment, beautify.js(config.plugins.beautify.js), uglify(config.plugins.uglify)))
                //.pipe(gulpif(config.env.isDevelopment, sourcemaps.write(config.plugins.sourcemaps.js.write)))
                .pipe(rename(config.files.dest.js))
                .pipe(plumber.stop())
                .pipe(gulp.dest(config.paths.dest.js));
        },
        
        scss: () => {
            return gulp.src(config.paths.src.scss + '/' + config.files.src.scss)
                .pipe(plumber(config.plugins.plumber))
                //.pipe(gulpif(config.env.isDevelopment, sourcemaps.init(config.plugins.sourcemaps.css.init)))
                .pipe(sass())
                .pipe(rename(config.files.dest.scss))
                .pipe(gulpif(config.env.isDevelopment, beautify.css(config.plugins.beautify.css), cleanCss(config.plugins.cleanCss)))
                //.pipe(gulpif(config.env.isDevelopment, sourcemaps.write(config.plugins.sourcemaps.css.write)))
                .pipe(plumber.stop())
                .pipe(gulp.dest(config.paths.dest.scss));
        },
        
        images: () => {
            return gulp.src(config.paths.src.images + '/' + config.files.src.images)
                .pipe(imagemin(config.plugins.imagemin))
                .pipe(gulp.dest(config.paths.dest.images));
        },
        
        videos: () => {
            return gulp.src(config.paths.src.videos + '/' + config.files.src.videos)
                .pipe(gulp.dest(config.paths.dest.videos));
        },
        
        fonts: () => {
            return gulp.src(config.paths.src.fonts + '/' + config.files.src.fonts)
                .pipe(gulp.dest(config.paths.dest.fonts));
        }
    };

    Object.assign(_builds, {
        templates: gulp.series(_builds.njk, _builds.html),
        scripts: gulp.parallel(_builds.js),
        styles: gulp.parallel(_builds.scss, _builds.images, _builds.fonts, _builds.videos)
    });
    _builds.global = gulp.series(_builds.clean, _builds.favicon, _builds.templates, gulp.parallel(_builds.scripts, _builds.styles));

    return _builds;
};