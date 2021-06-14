/* Dev */
function DevScene(){
}

Object.assign(
    DevScene, {
        prototype: Object.assign(
            Object.create(Scene.prototype), {
                constructor: DevScene,
				init: function(){
                    Scene.prototype.init.call(this, 'CTX__Dev');
                    this.initMenu();
				},
                initMenu: function(){
                    // Menu Char
                    OutputManager.getElement('LAY__Dev_Menu').aChildElement.forEach( oText => {
                        oText.hElement.addEventListener('click', () => {
                            this.click('menu', oText);
                        }, false);
                    } );

                    // Menu Color
                    OutputManager.getElement('LAY__Dev_Content').aChildElement.forEach( oLayer => {
                        oLayer.aChildElement[0].aChildElement.forEach( oText => {
                            oText.hElement.addEventListener('click', () => {
                                this.click('color', oText);
                            }, false);
                        } );
                    } );

                    this.click('menu', OutputManager.getElement('LAY__Dev_Menu').aChildElement[0]);
                },

                click: function(sType, oElement){
                    this.select(sType, oElement);
                    this.show(sType, oElement);
                },

                select: function(sType, oElement){
                    switch( sType ){
                        case 'menu':
                            [].forEach.call(
                                this.oContext.hElement.querySelectorAll('#LAY__Dev_Menu li'),
                                oHTML => {
                                    oHTML.classList.remove('--selected');
                                }
                            );
                            oElement.hElement.classList.add('--selected');
                            break;

                        case 'color':
                            [].forEach.call(
                                this.oContext.hElement.querySelectorAll('.Dev__Frame_Color'),
                                oHTML => {
                                    oHTML.classList.remove('--selected');
                                }
                            );
                            oElement.hElement.classList.add('--selected');
                            break;
                    }
                },
                show: function(sType, oElement){
                    switch(sType){
                        case 'menu':
                            [].forEach.call(
                                this.oContext.hElement.querySelectorAll('#LAY__Dev_Content > .outputLayer'),
                                oHTML => {
                                    oHTML.classList.remove('--show');
                                }
                            );
                            const oLayer = OutputManager.getElement('LAY__Dev_Frame_' + oElement.__oData.sEntity);
                            oLayer.hElement.classList.add('--show');
                            this.click('color', oLayer.aChildElement[0].aChildElement[0]);
                            break;

                        case 'color':
                            [].forEach.call(
                                this.oContext.hElement.querySelectorAll('.Dev__Frame_Entity_Sprite'),
                                oHTML => {
                                    oHTML.classList.remove('--show');
                                }
                            );
                            [].forEach.call(
                                this.oContext.hElement.querySelectorAll('.Dev__Frame_Entity_Sprite.--color_' + oElement.__oData.sColor),
                                oHTML => {
                                    oHTML.classList.add('--show');
                                }
                            );
                            break;

                            
                    }
                }
            }
        )
    }
);