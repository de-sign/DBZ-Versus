// Require
const gulp          = require('gulp');
const extra         = require('./_extra/_config');

// Export
module.exports = function(config){
    const data          = require('./_extra/_data')(config);
    const sprite        = require('./_extra/_sprite')(config);

    const _extra = {
        _char: {},
        _sprite: {},
        _data: {}
    };

    Object.keys(extra.oChar).forEach( sChar => {
        _extra['char_' + sChar] = _extra._char['char_' + sChar] = gulp.parallel( sprite.generate(sChar), gulp.series( data.parse(sChar), data.clean(sChar) ) );
        _extra['sprite_' + sChar] = _extra._sprite['sprite_' + sChar] = gulp.series( sprite.generate(sChar) );
        _extra['data_' + sChar] = _extra._data['data_' + sChar] = gulp.series( data.parse(sChar), data.clean(sChar) );
    } );

    _extra.char = gulp.parallel.apply(gulp, Object.values(_extra._char) );
    _extra.sprite = gulp.parallel.apply(gulp, Object.values(_extra._sprite) );
    _extra.data = gulp.parallel.apply(gulp, Object.values(_extra._data) );

    return _extra;
};