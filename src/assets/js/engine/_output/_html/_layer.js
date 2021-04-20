function OutputLayer(hElm) {
    this.aChildElement = [];
    OutputHTMLElement.call(this, hElm);
}
Object.assign(
    OutputLayer, {
        prototype: Object.assign(
            Object.create(OutputHTMLElement.prototype), {
                constructor: OutputLayer,

                update: function() {
                    OutputHTMLElement.prototype.update.call(this);
                    this.aChildElement.forEach( oElm => {
                        oElm.update();
                    } );
                },

                add: function(bAppend, oElm, sSlc) {
                    if( typeof bAppend !== 'boolean' ){
                        sSlc = oElm;
                        oElm = bAppend;
                        bAppend = true;
                    }
                    const idx = this.aChildElement.indexOf(oElm);
                    if (idx == -1) {
						const tgt = sSlc ? this.hElement.querySelector(sSlc) : this.hElement;
						this.aChildElement.push(oElm);
						oElm.oParentElement = this;
                        if( bAppend ){
                            this.addTickUpdate( () => {
                                tgt.appendChild(oElm.hElement);
                                oElm.autoCreateChildElement();
                            } );
                        } else {
                            oElm.autoCreateChildElement();
                        }
                    }
                    return oElm;
                },
                remove: function(oElm) {
                    const idx = this.aChildElement.indexOf(oElm);
                    if (idx != -1) {
						this.aChildElement.splice(idx, 1);
						oElm.oParentElement = null;
                        this.addTickUpdate( () => {
                            oElm.hElement.parentNode.removeChild(oElm.hElement);
                        } );
                    }
                    return oElm;
                },
                clear: function() {
                    [...this.aChildElement].forEach( oElm => {
                        this.remove(oElm);
                    } );
                },
                delete: function(oElm) {
                    OutputElement.remove( this.remove(oElm) );
                    oElm.clean && oElm.clean();
                    return oElm;
                },
                clean: function() {
                    [...this.aChildElement].forEach( oElm => {
                        this.delete(oElm);
                    } );
                },
                
                autoCreateChildElement: function() {
                    if( !this.bElementCreate ){
                        this.hElement.classList.add( OutputManager.oConfig.class.scope );
                        for( let typ in OutputManager.oConfig.HTMLElements ){
                            [].forEach.call(
                                this.hElement.parentNode.querySelectorAll( OutputManager.oConfig.selectors.toCreate.replace('{{elementSelector}}', OutputManager.oConfig.selectors[typ]) ),
                                (hElm) => {
                                    if( !hElm.classList.contains( OutputManager.oConfig.class.created ) ){
                                        this.hElement.classList.remove( OutputManager.oConfig.class.scope );
                                        this.add( false, new OutputManager[typ](hElm) );
                                        this.hElement.classList.add( OutputManager.oConfig.class.scope );
                                    }
                                }
                            );
                        }
                        this.hElement.classList.remove( OutputManager.oConfig.class.scope );
                    }
                }
            }
        )
    }
);