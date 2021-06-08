// Require
const gulp          = require('gulp');
const extra         = require('./_extra/_config');

// Export
module.exports = function(config){
    const data          = require('./_extra/_data')(config);
    const sprite        = require('./_extra/_sprite')(config);
    const doc           = require('./_extra/_doc')(config);

    const _extra = {
        _char: {},
        _sprite: {},
        _data: {},    
        _migrate: {}
    };

    extra.aEntity.forEach( sType => {
        Object.keys(extra[sType]).forEach( sEntity => {
            _extra['sprite_' + sEntity] = _extra._sprite['sprite_' + sEntity] = gulp.series( sprite.generate(sType, sEntity) );
            if( sType == 'oChar') {
                _extra['migrate_' + sEntity] = _extra._migrate['migrate_' + sEntity] = gulp.series( sprite.migrate(sType, sEntity) );
                _extra['char_' + sEntity] = _extra._char['char_' + sEntity] = gulp.parallel( sprite.generate(sType, sEntity), gulp.series( data.parse(sEntity), data.clean(sEntity) ) );
                _extra['data_' + sEntity] = _extra._data['data_' + sEntity] = gulp.series( data.parse(sEntity), data.clean(sEntity) );
            } 
        } );
    } );

    _extra.char = gulp.parallel.apply(gulp, Object.values(_extra._char) );
    _extra.sprite = gulp.series.apply(gulp, Object.values(_extra._sprite) );
    _extra.data = gulp.parallel.apply(gulp, Object.values(_extra._data) );
    _extra.migrate = gulp.parallel.apply(gulp, Object.values(_extra._migrate) );

    _extra.doc_reference = gulp.series( doc.json, doc.clean, doc.reference );
    _extra.doc_pages = gulp.series( doc.json, doc.clean, doc.pages );
    _extra.js = _extra.doc = gulp.series( doc.delete, doc.json, doc.clean, gulp.parallel(doc.reference, doc.pages ) );

    return _extra;
};