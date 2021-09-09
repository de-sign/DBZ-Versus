/* ----- START CLASS ----- */
/* ----- START CONSTRUCTOR ----- */
function OutputHTMLElement(hElm) {
    /* ----- START PROPERTIES ----- */
    this.hElement = null;
    this.bElementCreate = false;
    this.sId = null;

    this.bAutoPositioning = false;
    this.oPosition = {};
    this.oReferencePosition = {};

    this.oStyle = {};
    /* ----- END PROPERTIES ----- */

    this.init(hElm);
    OutputElement.call(this);
}
/* ----- END CONSTRUCTOR ----- */

Object.assign(
    OutputHTMLElement, {
        prototype: Object.assign(
            /* ----- START EXTENDS ----- */
            Object.create(OutputElement.prototype), {
            /* ----- END EXTENDS ----- */
                constructor: OutputHTMLElement,
                /* ----- START PROTOTYPE ----- */
                /* ----- START METHODS ----- */
                init: function(hElm){
                    if( hElm instanceof HTMLElement ){
                        this.hElement = hElm;
                        hElm.classList.add( OutputManager.oConfig.class.created );
                        this.bElementCreate = false;
                    } else {
                        this.hElement = this.createHTML(this.constructor.name, hElm);
                        this.bElementCreate = true;
                    }
                    this.sId = this.hElement.id;
                    this.oStyle = getComputedStyle(this.hElement);
                },
                update: function() {
                    if( this.bAutoPositioning ){
                        this.setStyle( {
                            transformOrigin: this.oPosition.originX + 'px ' + this.oPosition.originY + 'px',
                            transform:
                                'translate(' + this.oPosition.translateX + 'px, ' + this.oPosition.translateY + 'px) ' + 
                                'rotate(' + this.oPosition.rotate + 'deg) ' +
                                'scale(' + this.oPosition.scaleX + ', ' + this.oPosition.scaleY + ') ' +
                                'skew(' + this.oPosition.skewX + 'deg, ' + this.oPosition.skewY + 'deg)'
                        } );
                    }
                    OutputElement.prototype.update.call(this);
                },

                createHTML: function(sTyp, oHCfg) {
                    oHCfg = Object.assign({}, OutputManager.oConfig.HTMLElements[sTyp], oHCfg || {});
                    oHCfg.class = Array.isArray(oHCfg.class) ? oHCfg.class : [oHCfg.class];
                    oHCfg.class.push(OutputManager.oConfig.HTMLElements[sTyp].class, OutputManager.oConfig.class.created);

                    let elm = document.createElement(oHCfg.tag);
                    DOMTokenList.prototype.add.apply(elm.classList, oHCfg.class);
                    return elm;
                },
                autoCreateChildElement: function(){},

                calculatePositionBox: function(){

                    // getBoundingClientRect without CSS transform
                    let offsetTop = -window.pageYOffset,
                        offsetLeft = -window.pageXOffset,
                        hElement = this.hElement;

                    while (hElement) {
                        offsetTop += hElement.offsetTop;
                        offsetLeft += hElement.offsetLeft;
                        hElement = hElement.offsetParent;
                    }

                    const oRect = {
                        x: offsetLeft,
                        y: offsetTop,
                        height: this.hElement.offsetHeight,
                        width: this.hElement.offsetWidth,
                        top: offsetTop,
                        bottom: offsetTop + this.hElement.offsetHeight,
                        left: offsetLeft,
                        right: offsetLeft + this.hElement.offsetWidth,
                    };

                    // transfom CSS
                    const aOrigin = this.oStyle.transformOrigin.split(' '),
                        oOrigin = {
                            originX: parseFloat( aOrigin[0] ),
                            originY: parseFloat( aOrigin[1] )
                        };

                    let sTransform = this.oStyle.transform,
                        oTransform = {
                            rotate: 0,
                            scaleX: 1,
                            scaleY: 1,
                            skewX: 0,
                            skewY: 0,
                            translateX: 0,
                            translateY: 0
                        };

                    if( sTransform && sTransform != 'none' ){
                        let aMatrix = sTransform.split('(')[1].split(')')[0].split(',').map( nValue => parseFloat(nValue) ),
                            nDenom = Math.pow(aMatrix[0], 2) + Math.pow(aMatrix[1], 2);
                            
                        oTransform = {
                            rotate: Math.atan2(aMatrix[1], aMatrix[0]) / (Math.PI / 180),
                            scaleX: Math.sqrt(nDenom),
                            scaleY: (aMatrix[0] * aMatrix[3] - aMatrix[2] * aMatrix[1]) / Math.sqrt(nDenom),
                            skewX: Math.atan2(aMatrix[0] * aMatrix[2] + aMatrix[1] * aMatrix[3], nDenom) / (Math.PI / 180),
                            skewY: 0,
                            translateX: aMatrix[4],
                            translateY: aMatrix[5]
                        };
                    }

                    // Fuse of all data
                    return Object.assign(
                        {
                            nX: oRect.left + oOrigin.originX - OutputManager.oViewport.oOrigin.nX,
                            nY: oRect.top + oOrigin.originY - OutputManager.oViewport.oOrigin.nY
                        },
                        oRect,
                        oTransform,
                        oOrigin
                    );
                },
                // PROP translate calculé
                setPosition: function(oPos){
                    oPos = Object.assign({}, this.oPosition, oPos);
                    oPos.translateX = oPos.nX - this.oReferencePosition.nX + this.oReferencePosition.translateX;
                    oPos.translateY = oPos.nY - this.oReferencePosition.nY + this.oReferencePosition.translateY;
                    return Object.assign(this.oPosition, oPos);
                },
                resetPosition: function(){
                    return Object.assign(this.oPosition, this.oReferencePosition);
                },
                enableAutoPositioning: function(){
                    const oBox = this.calculatePositionBox();
                    this.bAutoPositioning = true;
                    Object.assign(this.oReferencePosition, oBox);
                    Object.assign(this.oPosition, oBox);
                },
                disableAutoPositioning: function(){
                    this.bAutoPositioning = false;
                },

                setStyle: function(oCss) {
                    this.addTickUpdate(() => {
                        Object.assign(this.hElement.style, oCss);
                    });
                },
                /* ----- END METHODS ----- */
                /* ----- END PROTOTYPE ----- */
            }
        )
    }
);
/* ----- END CLASS ----- */