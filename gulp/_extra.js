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

    extra.aEntity.forEach( sType => {
        Object.keys(extra[sType]).forEach( sEntity => {
            _extra['sprite_' + sEntity] = _extra._sprite['sprite_' + sEntity] = gulp.series( sprite.generate(sType, sEntity) );
            if( sType == 'oChar') {
                _extra['char_' + sEntity] = _extra._char['char_' + sEntity] = gulp.parallel( sprite.generate(sType, sEntity), gulp.series( data.parse(sEntity), data.clean(sEntity) ) );
                _extra['data_' + sEntity] = _extra._data['data_' + sEntity] = gulp.series( data.parse(sEntity), data.clean(sEntity) );
            } 
        } );
    } );

    _extra.char = gulp.parallel.apply(gulp, Object.values(_extra._char) );
    _extra.sprite = gulp.parallel.apply(gulp, Object.values(_extra._sprite) );
    _extra.data = gulp.parallel.apply(gulp, Object.values(_extra._data) );

    return _extra;
};