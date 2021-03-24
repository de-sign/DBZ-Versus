function OutputElement(hElm) {
    if( hElm instanceof HTMLElement ){
        this.hElement = hElm;
        hElm.classList.add( OutputManager.oConfig.class.created );
        this.bElementCreate = false;
    } else {
        this.hElement = this.createHTML(this.constructor.name, hElm);
        this.bElementCreate = true;
    }
    this.sId = OutputElement.add(this);
    this.oParentElement = null;

    this.aTickUpdate = [];
    this.oStyle = getComputedStyle(this.hElement);

    this.bAutoPositioning = false;
    this.oPosition = {};
    this.oReferencePosition = {};
}

Object.assign(
    OutputElement, {
        nId: 0,
        oInstance: {},
        oInstanceByConstructor: {},

        add: function(oElm) {
            const id = oElm.hElement.id = oElm.hElement.id || 'OE_' + (++this.nId);
            this.oInstanceByConstructor[oElm.constructor.name] || ( this.oInstanceByConstructor[oElm.constructor.name] = {} );
            this.oInstance[id] = this.oInstanceByConstructor[oElm.constructor.name][id] = oElm;
            return id;
        },

        remove: function(oElm) {
            const id = oElm.sId;
            delete this.oInstance[id];
            delete this.oInstanceByConstructor[oElm.constructor.name][id];
            return oElm;
        },

        prototype: {
            constructor: OutputElement,

            update: function() {
                if( this.bAutoPositioning ){
                    this.setStyle({
                        transform: 'translate(' + (this.oPosition.nX - this.oReferencePosition.nX) + 'px, ' + (this.oPosition.nY - this.oReferencePosition.nY) + 'px) rotate(' + (this.oPosition.nAngle - this.oReferencePosition.nAngle) + 'deg)'
                    });
                }
                this.aTickUpdate.forEach((fUpd) => {
                    fUpd.call(this);
                });
                this.aTickUpdate = [];
            },

            addTickUpdate: function(fUpd) {
                this.aTickUpdate.push(fUpd);
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

            getBox: function(){
                const box = this.hElement.getBoundingClientRect(),
                    origin = this.oStyle.transformOrigin.split(' ');
                let trans = this.oStyle.transform,
                    angle = 0;

                if( trans && trans != 'none' ){
                    trans = trans.split('(')[1].split(')')[0].split(',');
                    angle = Math.round(Math.atan2(trans[1], trans[0]) * (180 / Math.PI));
                }

                return Object.assign( box, {
                    originX: box.left + parseFloat( origin[0] ),
                    originY: box.top + parseFloat( origin[1] ),
                    rotate: angle
                } );
            },
            setPosition: function(oPos){
                oPos = Object.assign({}, this.oPosition, oPos);
                oPos.nDistance = Math.sqrt(oPos.nX * oPos.nX + oPos.nY * oPos.nY);
                oPos.nAngle %= 360;
                return Object.assign(this.oPosition, oPos);
            },
            resetPosition: function(){
                return Object.assign(this.oPosition, this.oReferencePosition);
            },
            getCalculatedPosition: function(){
                const box = this.getBox(),
                    nX = box.originX - OutputManager.oViewport.oOrigin.nX,
                    nY = box.originY - OutputManager.oViewport.oOrigin.nY;

                return {
                    nX: nX,
                    nY: nY,
                    nDistance: Math.sqrt(nX * nX + nY * nY),
                    nAngle: box.rotate
                };
            },
            enableAutoPositioning: function(){
                this.bAutoPositioning = true;
                
                const lastTrans = this.oStyle.transform;
                this.hElement.style.transform = '';
                Object.assign(this.oReferencePosition, this.getCalculatedPosition());

                this.hElement.style.transform = lastTrans;
                Object.assign(this.oPosition, this.getCalculatedPosition());
            },
            disableAutoPositioning: function(){
                this.bAutoPositioning = false;
            },

            setStyle: function(oCss) {
                this.addTickUpdate(() => {
                    Object.assign(this.hElement.style, oCss);
                });
            }
        }
    }
);