// Require
const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const beautify      = require('gulp-beautify');
const del           = require('del');
const fs            = require('fs');
const path          = require('path');
const extra         = require('./_config');

module.exports = function(config){

    const sPathSrc = config.paths.src.js + ( extra.oPath.oDoc.sSrc == '.' ? '' : '/' + extra.oPath.oDoc.sSrc ),
        sPathRoot = path.resolve(config.paths.src.root + '/' + extra.oPath.oDoc.sDest),
        sPathDest = path.resolve(config.paths.src.root + '/' + extra.oPath.oDoc.sDest + '/markdown'),
        sStyleFile = '../_doc.css',
        sJSONFile = sPathRoot + '/_doc.json';

    // Methods json
    function readDir(aAccu, sPath){
        fs.readdirSync(sPath).forEach( sFile => {
            const sNewPath = sPath + '/' + sFile,
                sExt = path.extname(sNewPath);

            if( !sExt ){
                readDir(aAccu, sNewPath);
            } else if (sExt == '.js'){
                aAccu.push(sNewPath);
            }
        } );
    }

    function parse(sText, oRegExp, bDEBUG){
        const aResult = [];
        [...sText.matchAll(oRegExp.rRegexp)].forEach( aMatch => {
            if( oRegExp.oStructure ){
                const oResult = {};
                for( let sProp in oRegExp.oStructure ){
                    oResult[sProp] = parse( aMatch[ oRegExp.nGroup ], oRegExp.oStructure[sProp]);
                }
                aResult.push( oResult );
            } else {
                bDEBUG && console.log(oRegExp, aMatch);
                let sResult = null;
                const aGroup = Array.isArray(oRegExp.nGroup) ? oRegExp.nGroup : [oRegExp.nGroup];
                for( let nIndex = 0; nIndex < aGroup.length; nIndex++ ){
                    sResult = aMatch[ aGroup[nIndex] ];
                    if( sResult ){
                        if( oRegExp.rRemove ){
                            sResult = sResult.replace(oRegExp.rRemove, '');
                        } else {
                            sResult = sResult.trim();
                        }
                        aResult.push(sResult);
                        break;
                    }
                }
            }
        } );

        return aResult.length ?
            ( aResult.length == 1 ?
                aResult[0] :
                aResult ) :
            null;
    }

    // Methods markdown
    function sort(oA, oB){
        return oA.sName.localeCompare( oB.sName, 'en', {
            numeric: true
        } );
    }

    // Methods pages
    function transform(oData){
        const aResult = [],
            uValue = Object.values(oData)[0];

        if( Array.isArray(uValue) ){
            for( let nIndex = 0; nIndex < uValue.length; nIndex++ ){
                const oResult = {};
                aResult.push(oResult);
                for( let sProp in oData ){
                    const aData = Array.isArray(oData[sProp]) ? oData[sProp] : [oData[sProp]];
                    oResult[sProp] = aData[nIndex];
                }
            }
        } else {
            aResult.push(oData);
        }

        return aResult;
    }

    // Export
    return {
        delete: function(){
            return del([sPathDest + '/*'], { force: true });
        },
        
        json: function(done){
            const aFile = [],
                aPromise = [],
                oData = {};

            readDir(aFile, sPathSrc);

            aFile.forEach( sFile => {
                aPromise.push(
                    new Promise( (fResolve, fReject) => {
                        fs.readFile(
                            sFile,
                            { encoding: 'utf-8' },
                            (oErr, sText) => {
                                if( oErr ){
                                    fReject(oErr);
                                } else {
                                    let aParse = parse(sText, extra.oRegExp);
                                    if( aParse ){
                                        aParse = Array.isArray(aParse) ? aParse : [aParse];
                                        aParse.forEach( oParse => {
                                            const sPath = path.relative( sPathSrc, sFile );
                                            oParse.sName = oParse.oConstructor.sName;
                                            oParse.sPath = sFile;
                                            oParse.sDirectory = sPath.split(path.sep).shift();
                                            oData[oParse.oConstructor.sName] = oParse;
                                        } );
                                    }
                                    fResolve();
                                }
                            }
                        );
                    } )
                );
            } );

            Promise
                .all(aPromise)
                .then( () => {
                    fs.writeFile(
                        sJSONFile,
                        JSON.stringify(oData),
                        oError => {
                            oError && console.log(oError.message);
                            done();
                        }
                    );
                } )
                .catch( oError => {
                    console.log(oError.message);
                    done();
                } );
        },

        clean: function(){
            return gulp.src(sJSONFile)
                .pipe(plumber(config.plugins.plumber))
                .pipe(beautify.js(config.plugins.beautify.js))
                .pipe(plumber.stop())
                .pipe(gulp.dest(sPathRoot));
        },

        reference: function(done){
            const oData = JSON.parse( fs.readFileSync(sJSONFile, { encoding: 'utf-8' }) ),
                aMarkdown = [],
                oTree = {},
                oNodes = {};

            function getNodes(sName){
                if( !oNodes[sName] ){
                    oNodes[sName] = {
                        sName: sName,
                        oClass: null,
                        aNodes: []
                    };
                }
                return oNodes[sName];
            }

            function render(aNode, sPrefixe = ''){
                aNode
                    .sort( sort )
                    .forEach( oNode => {
                        aMarkdown.push( `${sPrefixe}- [${oNode.sName}](${oNode.sName}.md)` );
                        render(oNode.aNodes, sPrefixe + '    ');
                    } );
            }

            for( let sClass in oData ){
                const oClass = oData[sClass],
                    oNode = getNodes(sClass);

                oNode.oClass = oClass;
                if( oClass.sExtend ){
                    getNodes(oClass.sExtend).aNodes.push(oNode);
                } else {
                    oTree[oClass.sDirectory] || (oTree[oClass.sDirectory] = []);
                    oTree[oClass.sDirectory].push(oNode);
                }
            }

            aMarkdown.push( `# &#8251; Class references` );
            aMarkdown.push( `` );
            aMarkdown.push( `**For correctly see this documentation !**  ` );
            aMarkdown.push( `Please install [Markdown Viewer / Browser Extension](https://github.com/simov/markdown-viewer#markdown-viewer--browser-extension)  `);
            aMarkdown.push( `and enable the extension for the \`\`\`https://raw.githubusercontent.com\`\`\` origin on [advanced options](https://github.com/simov/markdown-viewer#advanced-options).`);
            aMarkdown.push( `` );

            for( let sDirectory in oTree ){
                aMarkdown.push( `## ${sDirectory.toUpperCase()}` );
                render(oTree[sDirectory]);
                aMarkdown.push( `` );
            }
            
            fs.writeFile(
                sPathDest + '/References.md',
                aMarkdown.join('\n'),
                oError => {
                    oError && console.log(oError.message);
                    done();
                }
            );
        },

        pages: function(done){
            const oData = JSON.parse( fs.readFileSync(sJSONFile, { encoding: 'utf-8' }) ),
                aPromise = [];

            for( let sClass in oData ){
                aPromise.push(
                    new Promise( (fResolve, fReject) => {

                        const aMarkdown = [],
                            oClass = oData[sClass],
                            sPath = path
                                .relative(config.paths.src.js, oClass.sPath)
                                .replace(
                                    new RegExp('\\' + path.sep, 'g'),
                                    '/'
                                );

                        aMarkdown.push( `# ${sClass}` );
                        if( oClass.oConstructor.sDetails ){
                            aMarkdown.push( oClass.oConstructor.sDetails );
                            aMarkdown.push( `` );
                        }
                        aMarkdown.push( `_System :_ ${oClass.sDirectory.toUpperCase()}  ` );
                        aMarkdown.push( `_File source :_ [${sPath}](https://github.com/de-sign/DBZ-Versus/blob/master/${oClass.sPath})` );
                        aMarkdown.push( `` );

                        if( oClass.oSingleton ){
                            if( oClass.oSingleton.aProperties ){
                                aMarkdown.push( `## Static properties` );
                                transform(oClass.oSingleton.aProperties)
                                    .sort(sort)
                                    .forEach( oProperty => {
                                        aMarkdown.push( `**${sClass}.${oProperty.sName}**` );
                                        if( oProperty.sDetails ){
                                            aMarkdown.push( oProperty.sDetails );
                                            aMarkdown.push( `` );
                                        }
                                        aMarkdown.push( `` );
                                        aMarkdown.push( `\`\`\`javascript` );
                                        aMarkdown.push( `${oProperty.sCode}` );
                                        aMarkdown.push( `\`\`\`` );
                                    } );
                                aMarkdown.push( `` );
                            }
                            if( oClass.oSingleton.aMethods ){
                                aMarkdown.push( `## Static methods` );
                                transform(oClass.oSingleton.aMethods)
                                    // .sort(sort)
                                    .forEach( oMethod => {
                                        aMarkdown.push( `**${sClass}.${oMethod.sName}()**` );
                                        if( oMethod.sDetails ){
                                            aMarkdown.push( oMethod.sDetails );
                                            aMarkdown.push( `` );
                                        }
                                        aMarkdown.push( `\`\`\`javascript` );
                                        aMarkdown.push( `${sClass}.${oMethod.sName}${oMethod.sArguments}` );
                                        aMarkdown.push( `\`\`\`` );
                                        // aMarkdown.push( `    ${oMethod.sCode}` );
                                    } );
                                aMarkdown.push( `` );
                            }
                        }

                        if( oClass.sExtend || oClass.oConstructor.aProperties || oClass.oPrototype ){

                            aMarkdown.push( `## Constructor` );
                            aMarkdown.push( `**${oClass.oConstructor.sName}()**` );
                            aMarkdown.push( `\`\`\`javascript` );
                            aMarkdown.push( `new ${oClass.oConstructor.sName}${oClass.oConstructor.sArguments};` );
                            aMarkdown.push( `\`\`\`` );

                            if( oClass.sExtend ){
                                aMarkdown.push( `## Inheritance` );
                                aMarkdown.push( `${oClass.oConstructor.sName} is a child class of [${oClass.sExtend}](${oClass.sExtend}.md).` );
                                aMarkdown.push( `` );
                            }
                            
                            if( oClass.oConstructor.aProperties ){
                                aMarkdown.push( `## Instance properties` );

                                if( oClass.sExtend ){
                                    aMarkdown.push( `_Properties inherited :_ [${oClass.sExtend}.prototype](${oClass.sExtend}.md#instance-properties)` );
                                    aMarkdown.push( `` );
                                }

                                transform(oClass.oConstructor.aProperties)
                                    .sort(sort)
                                    .forEach( oProperty => {
                                        aMarkdown.push( `**${sClass}.prototype.${oProperty.sName}**` );
                                        if( oProperty.sDetails ){
                                            aMarkdown.push( oProperty.sDetails );
                                            aMarkdown.push( `` );
                                        }
                                        aMarkdown.push( `\`\`\`javascript` );
                                        aMarkdown.push( `${oProperty.sCode}` );
                                        aMarkdown.push( `\`\`\`` );
                                    } );
                                aMarkdown.push( `` );
                            }
                            
                            if( oClass.oPrototype && oClass.oPrototype.aMethods ){
                                aMarkdown.push( `## Instance methods` );

                                if( oClass.sExtend ){
                                    aMarkdown.push( `_Methods inherited :_ [${oClass.sExtend}.prototype](${oClass.sExtend}.md#instance-methods) ` );
                                    aMarkdown.push( `` );
                                }

                                transform(oClass.oPrototype.aMethods)
                                    // .sort(sort)
                                    .forEach( oMethod => {
                                        aMarkdown.push( `**${sClass}.prototype.${oMethod.sName}()**` );
                                        if( oMethod.sDetails ){
                                            aMarkdown.push( oMethod.sDetails );
                                            aMarkdown.push( `` );
                                        }
                                        aMarkdown.push( `\`\`\`javascript` );
                                        aMarkdown.push( `this.${oMethod.sName}${oMethod.sArguments}` );
                                        aMarkdown.push( `\`\`\`` );
                                        // aMarkdown.push( `    ${oMethod.sCode}` );
                                    } );
                                aMarkdown.push( `` );
                            }
                                
                        }

                        aMarkdown.push( `<link rel="stylesheet" href="${sStyleFile}" />` );
                        aMarkdown.push( `` );
                        aMarkdown.push( `[&#8251; Return to Class references](References.md)` );

                        fs.writeFile(
                            sPathDest + '/' + sClass + '.md',
                            aMarkdown.join('\n'),
                            oError => {
                                oError ?
                                    fReject(oError) :
                                    fResolve();
                            }
                        );
                    } )
                );
            }

            Promise
                .all(aPromise)
                .then( () => done() )
                .catch( oError => {
                    console.log(oError.message);
                    done();
                } );
        }
    };
};