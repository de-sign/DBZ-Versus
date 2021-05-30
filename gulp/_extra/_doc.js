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

    function parse(sText, oRegExp){
        const aResult = [];
        [...sText.matchAll(oRegExp.rRegexp)].forEach( aMatch => {
            if( oRegExp.oStructure ){
                const oResult = {};
                for( let sProp in oRegExp.oStructure ){
                    oResult[sProp] = parse( aMatch[ oRegExp.nGroup ], oRegExp.oStructure[sProp]);
                }
                aResult.push( oResult );
            } else {
                let sResult = null;
                const aGroup = Array.isArray(oRegExp.nGroup) ? oRegExp.nGroup : [oRegExp.nGroup];
                for( let nIndex = 0; nIndex < aGroup.length; nIndex++ ){
                    sResult = aMatch[ aGroup[nIndex] ];
                    if( sResult ){
                        if( oRegExp.rRemove ){
                            sResult = sResult.replace(oRegExp.rRemove, '');
                        } else if( oRegExp.nRemove ){
                            sResult = sResult.replace(new RegExp('^' + aMatch[oRegExp.nRemove], 'gm'), '');
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

    // Export
    return {
        delete: function(done){
            del.sync([sPathDest], { force: true });
            fs.mkdirSync(sPathDest);
            done();
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
                                            oParse.sName = oParse[ oParse.sType == 'DATA' ? 'oInitialize' : 'oConstructor'].sName;
                                            oParse.sPath = sFile;
                                            oParse.sDirectory = sPath.split(path.sep).shift();
                                            oData[oParse.sName] = oParse;
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
                        if( oNode.oClass ){
                            aMarkdown.push( `${sPrefixe}- [${oNode.sName}](${oNode.sName}.md)` );
                        } else {
                            aMarkdown.push( `${sPrefixe}- ${oNode.sName}` );
                        }
                        render(oNode.aNodes, sPrefixe + '    ');
                    } );
            }

            for( let sClass in oData ){
                const oClass = oData[sClass],
                    oNode = getNodes(sClass);

                oNode.oClass = oClass;
                if( oClass.sMenu ){
                    let oMenu = null;
                    oClass.sMenu.split('/').forEach( sSubMenu => {
                        let oSubMenu = getNodes(sSubMenu);
                        if( oMenu && oMenu.aNodes.indexOf(oSubMenu) == -1 ){
                            oMenu.aNodes.push(oSubMenu);
                        }
                        oMenu = oSubMenu;
                    } );
                    oMenu.aNodes.push(oNode);
                } else if( oClass.sExtend ){
                    getNodes(oClass.sExtend).aNodes.push(oNode);
                } else {
                    oTree[oClass.sDirectory] || (oTree[oClass.sDirectory] = []);
                    oTree[oClass.sDirectory].push(oNode);
                }
            }

            aMarkdown.push( `# &#8251; Class references` );
            aMarkdown.push( `` );
            aMarkdown.push( `## For correctly see this documentation !` );
            aMarkdown.push( `` );
            aMarkdown.push( `Please install [Markdown Viewer / Browser Extension](https://github.com/simov/markdown-viewer#markdown-viewer--browser-extension)  `);
            aMarkdown.push( `and enable the extension for the \`\`\`https://raw.githubusercontent.com\`\`\` origin on [advanced options](https://github.com/simov/markdown-viewer#advanced-options).`);
            aMarkdown.push( `` );

            for( let sDirectory in oTree ){
                aMarkdown.push( `## ${sDirectory.toUpperCase()}` );
                render(oTree[sDirectory]);
                aMarkdown.push( `` );
            }

            aMarkdown.push( `<link rel="stylesheet" href="${sStyleFile}" />` );
            
            fs.writeFile(
                sPathDest + '/References.md',
                aMarkdown.join('\n'),
                oError => {
                    oError && console.log(oError);
                    done();
                }
            );
        },

        pages: function(done){

            function render(uPrefix, oData, sType, nLevel){
                const aRender = [];
                if( Array.isArray(oData) ){
                    oData.forEach( oSubData => {
                        [].push.apply( aRender, render(uPrefix, oSubData, sType, nLevel) );
                    } );
                }
                else {
                    if( oData.oSubCategory ){
                        [].push.apply(
                            aRender,
                            renderElement(
                                oData.oSubCategory,
                                'subcategory',
                                nLevel - 1
                            )
                        );
                        delete( oData.oSubCategory );
                    }

                    transform(oData)
                        .forEach( oSubData => {
                            [].push.apply(
                                aRender,
                                renderElement(
                                    Object.assign({ uPrefix }, oSubData),
                                    sType,
                                    nLevel
                                )
                            );
                        } );
                    aRender.push( `` );
                }

                return aRender;
            }

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

            function renderElement(oData, sType, nLevel){
                const aRender = [],
                    aLevel = [null, '#', '##', '###', '####', '#####', '######'],
                    aPrefix = Array.isArray(oData.uPrefix) ? oData.uPrefix : [oData.uPrefix, oData.uPrefix];;

                switch(sType){
                    case 'subcategory':
                        aRender.push( `${aLevel[nLevel]} ${oData.sName}` );
                        if( oData.sDetails ){
                            aRender.push( `` );
                            aRender.push( oData.sDetails );
                        }
                        aRender.push( `` );
                        break;

                    case 'constructor':
                        aRender.push( `${aLevel[nLevel]} ${oData.sName}()` );
                        aRender.push( `` );
                        aRender.push( `\`\`\`javascript` );
                        aRender.push( `new ${oData.sName}${oData.sArguments};` );
                        aRender.push( `\`\`\`` );
                        aRender.push( `` );
                        break;

                    case 'property':
                        aRender.push( `${aLevel[nLevel]} ${aPrefix[0]}.${oData.sName}` );
                        if( oData.sDetails ){
                            aRender.push( `` );
                            aRender.push( oData.sDetails );
                        }
                        aRender.push( `` );
                        aRender.push( `\`\`\`javascript` );
                        aRender.push( `${aPrefix[1]}.${oData.sName} = ${oData.sValue};` );
                        aRender.push( `\`\`\`` );
                        aRender.push( `` );
                        break;

                    case 'method':
                        aRender.push( `${aLevel[nLevel]} ${aPrefix[0]}.${oData.sName}()` );
                        if( oData.sDetails ){
                            aRender.push( `` );
                            aRender.push( oData.sDetails );
                        }
                        aRender.push( `` );
                        aRender.push( `\`\`\`javascript` );
                        aRender.push( `${aPrefix[1]}.${oData.sName}${oData.sArguments};` );
                        // aRender.push( `    ${oData.sCode}` );
                        aRender.push( `\`\`\`` );
                        aRender.push( `` );
                        break;
                }

                return aRender;
            }

            const oData = JSON.parse( fs.readFileSync(sJSONFile, { encoding: 'utf-8' }) ),
                aPromise = [];

            for( let sClass in oData ){
                aPromise.push(
                    new Promise( (fResolve, fReject) => {

                        const aMarkdown = [],
                            oClass = oData[sClass],
                            sDetails = (oClass.oInitialize || oClass.oConstructor).sDetails,
                            sPath = path
                                .relative(config.paths.src.js, oClass.sPath)
                                .replace( new RegExp('\\' + path.sep, 'g'), '/' );

                        // FileName
                        [].push.apply(
                            aMarkdown,
                            render(
                                sClass,
                                { sName: sClass, sDetails },
                                'subcategory',
                                1
                            )
                        );
                        aMarkdown.push( `_System :_ ${oClass.sDirectory.toUpperCase()}  ` );
                        aMarkdown.push( `_File source :_ [${sPath}](https://github.com/de-sign/DBZ-Versus/blob/master/${oClass.sPath})` );
                        aMarkdown.push( `` );

                        if( oClass.sType == 'DATA' ){
                            if( oClass.oInitialize.aProperties ){
                                aMarkdown.push( `## Properties` );
                                [].push.apply(
                                    aMarkdown,
                                    render(
                                        sClass,
                                        oClass.oInitialize.aProperties,
                                        'property',
                                        3
                                    )
                                );
                            }
                        }

                        else if( oClass.sType == 'CLASS' ){

                            if( oClass.oSingleton ){

                                if( oClass.oSingleton.aProperties ){
                                    aMarkdown.push( `## Static properties` );
                                    [].push.apply(
                                        aMarkdown,
                                        render(
                                            sClass,
                                            oClass.oSingleton.aProperties,
                                            'property',
                                            3
                                        )
                                    );
                                }

                                if( oClass.oSingleton.aMethods ){
                                    aMarkdown.push( `## Static methods` );
                                    [].push.apply(
                                        aMarkdown,
                                        render(
                                            sClass,
                                            oClass.oSingleton.aMethods,
                                            'method',
                                            3
                                        )
                                    );
                                }
                            }

                            if( oClass.sExtend || oClass.oConstructor.aProperties || oClass.oPrototype ){

                                aMarkdown.push( `## Constructor` );

                                if( oClass.sExtend ){
                                    aMarkdown.push( `` );
                                    aMarkdown.push( `${oClass.oConstructor.sName} is a child class of [${oClass.sExtend}](${oClass.sExtend}.md).` );
                                }

                                [].push.apply(
                                    aMarkdown,
                                    render(
                                        sClass,
                                        oClass.oConstructor,
                                        'constructor',
                                        3
                                    )
                                );
                                
                                if( oClass.oConstructor.aProperties ){
                                    aMarkdown.push( `## Instance properties` );
                                    if( oClass.sExtend ){
                                        aMarkdown.push( `_Properties inherited :_ [${oClass.sExtend}.prototype](${oClass.sExtend}.md#instance-properties)` );
                                        aMarkdown.push( `` );
                                    }
                                    [].push.apply(
                                        aMarkdown,
                                        render(
                                            'this',
                                            oClass.oConstructor.aProperties,
                                            'property',
                                            3
                                        )
                                    );
                                }
                                
                                if( oClass.oPrototype && oClass.oPrototype.aMethods ){
                                    aMarkdown.push( `## Instance methods` );
                                    if( oClass.sExtend ){
                                        aMarkdown.push( `_Methods inherited :_ [${oClass.sExtend}.prototype](${oClass.sExtend}.md#instance-methods) ` );
                                        aMarkdown.push( `` );
                                    }
                                    [].push.apply(
                                        aMarkdown,
                                        render(
                                            [sClass + '.prototype', 'this'],
                                            oClass.oPrototype.aMethods,
                                            'method',
                                            3
                                        )
                                    );
                                }
                                    
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
                    console.log(oError);
                    done();
                } );
        }
    };
};