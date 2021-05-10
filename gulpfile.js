// Require
const gulp          = require('gulp');

// Data
const config        = require('./gulp/config');
const _builds       = require('./gulp/_builds')(config);
const _serves       = require('./gulp/_serves')(config, _builds);
const _extra        = require('./gulp/_extra')(config);

// Export
Object.assign(
    exports,
    {
        default: gulp.series(_builds.global, _serves.global, _extra.extra),
        build: _builds.global,
        templates: _builds.templates,
        scripts: _builds.scripts,
        styles: _builds.styles,
        clean: _builds.clean,
    },
    // Ajout des EXTRA
    _extra
);