const imagemin = require('gulp-imagemin');

// Data
let env = (process.env.NODE_ENV || 'development').trim(),
    out = {
        development: 'build',
        testing: 'test',
        production: 'dist'
    },
    src = {
        root: 'src',
        assets: 'src/assets',
        pages: 'src/pages',
        templates: 'src/pages/_templates',
        data: 'src/data'
    },
    dest = {
        root: `${out[env]}`,
        assets: `${out[env]}/assets`
    };

// Export
Object.assign(exports, {
    
    env: {
        current: env,
        isDevelopment: env == 'development',
        isTesting: env == 'testing',
        isProduction: env == 'production'
    },

    paths: {
        src: Object.assign(src, {
            html: `${src.pages}`,
            njk: `${src.templates}`,
            scss: `${src.assets}/scss`,
            js: `${src.assets}/js`,
            images: `${src.assets}/images`,
            favicon: `${src.assets}/favicon`,
            fonts: `${src.assets}/fonts`,
            videos: `${src.assets}/videos`
        }),
        dest: Object.assign(dest, {
            html: `${dest.root}`,
            njk: `${src.templates}`,
            scss: `${dest.assets}/css`,
            js: `${dest.assets}/js`,
            images: `${dest.assets}/images`,
            favicon: `${dest.assets}/favicons`,
            fonts: `${dest.assets}/fonts`,
            videos: `${dest.assets}/videos`
        })
    },

    files: {
        watch: {
            templates: [
                '_*.njk',
                '*/**/*.njk'
            ],
            html: [
                '../data/*.json',
                '**/*.json',
                '*/**/*.html'
            ],
            scss: '**/*.scss',
            js: '**/*.js',
            images: '**/*.*',
            favicon: '*.*',
            fonts: '**/*.*',
            videos: '**/*.*'
        },
        src: {
            njk: '**/template.njk',
            html: '**/page.html',
            scss: '*.scss',
            js: '**/script.*',
            images: '**/*.*',
            favicon: '*.*',
            fonts: '**/*.*',
            videos: '**/*.*'
        },
        dest: {
            favicon: `_favicons.njk`,
            njk: file => {
                file.basename = file.dirname.split('/').pop();
                file.dirname = '';
            },
            html: (FW, file) => {
                let aFile = FW.url.path.split('/');
                file.basename = aFile.pop().replace(/.html$/gi, '');
                file.extname = '.html';
                file.dirname = aFile.join('/');
            },
            js: file => {
                let aFile = file.dirname.split('/');
                file.basename = aFile.pop();
                file.extname = '.js';
                file.dirname = aFile.join('/');
            },
            scss: file => {
                file.extname = '.css';
            }
        }
    },

    plugins: {
        browserSync: {
            server: dest.root,
            watch: true
        },
        plumber: undefined,
        include: {
            njk: undefined,
            js: undefined
        },
        nunjucks: {
            filters: {
                fw_assign: (oSource, oExtend, bDepth = true) => {
                    if( Object.prototype.toString.call(oSource) == '[object Object]' ){
                        let fAssign = (oSource, oExtend) => {
                            let oReturn = Object.assign({}, oSource, oExtend);
                            if(bDepth) {
                                for( let sProp in oSource ){
                                    if( Object.prototype.toString.call(oSource[sProp]) == '[object Object]' && Object.prototype.toString.call(oExtend[sProp]) == '[object Object]' ){
                                        oReturn[sProp] = fAssign(oSource[sProp], oExtend[sProp]);
                                    }
                                }
                            }
                            return oReturn;
                        };
                        return fAssign(oSource, oExtend);
                    } else {
                        return oSource;
                    }
                },

                fw_toArray: uValue =>{
                    return Array.isArray(uValue) ? uValue : [uValue];
                }
            }
        },
        sourcemaps: {
            js: {
                init: undefined,
                write: undefined
            },
            css: {
                init: undefined,
                write: undefined
            }
        },
        beautify: {
            js: undefined,
            html: undefined,
            css: undefined
        },
        uglify: undefined,
        sass: undefined,
        cleanCss: undefined,
        imagemin: [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { removeComments: true },
                    { removeHiddenElems: true },
                    { removeDimensions: true },
                    { cleanupIDs: true }
                ]
            })
        ],
        favicons: {
            display: 'standalone',
            orientation: 'portrait',
            version: 1.0,
            logging: false,
            start_url: '',
            pipeHTML: true
        }
    }
});