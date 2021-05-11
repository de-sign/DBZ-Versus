// Require
const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const path          = require('path');

// Export
module.exports = function(config, _builds, _extra){

    const _serves = {
        browserSync: (done) => {
            browserSync.init(config.plugins.browserSync);
            done();
        },
        
        watch: (() => {

            function _getFile(task, file) {
                return path.normalize(config.paths.src[task] + '/' + file).replace(/\\+/g, '/');
            }

            return function watch(done) {
                for( let task in config.files.watch){
                    gulp.watch(
                        Array.isArray(config.files.watch[task]) ?
                            config.files.watch[task].map( file => _getFile(task, file) ) :
                            _getFile(task, config.files.watch[task]),
                        gulp.parallel(_builds[task], _extra[task] || function empty(done){ done() })
                    );
                };
                done();
            };
        })()
    };
    _serves.global = gulp.series(_serves.browserSync, _serves.watch);

    return _serves;
};