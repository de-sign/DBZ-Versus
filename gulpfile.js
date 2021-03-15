// Require
const gulp          = require('gulp');

// Data
const config        = require('./gulp/config');
const _builds       = require('./gulp/_builds')(config);
const _serves       = require('./gulp/_serves')(config, _builds);

// Export
Object.assign(exports, {
    default: gulp.series(_builds.global, _serves.global),
    build: _builds.global,
    templates: _builds.templates,
    scripts: _builds.scripts,
    styles: _builds.styles,
    clean: _builds.clean
});