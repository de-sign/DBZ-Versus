// Menu
function GameMenu(sLayer, aIndexDefault){
	this.oLayer = null;
	this.aCursor = [];

	this.init(sLayer, Array.isArray(aIndexDefault) ? aIndexDefault : [aIndexDefault]);
}

Object.assign(
    GameMenu.prototype, {
		init: function(sLayer, aIndexDefault){
			this.oLayer = OutputManager.getElement(sLayer);
			aIndexDefault.forEach( (nDefault, nIndex) => {
				this.aCursor.push( {
					nIndexCurrent: null,
					nIndexNew: null
				} );
				this.select( nIndex, nDefault );
			} );
			this.oLayer.addTickUpdate( () => {
				this.oLayer.hElement.classList.add('Menu__Layer', 'Menu__nb_cursor_' + this.aCursor.length);
			} );
		},
		update: function(){
			let bUpdated = false;
			this.aCursor.forEach( (oCursor, nIndex) => {
				if( oCursor.nIndexNew != oCursor.nIndexCurrent ){
					const oMenuLast = this.oLayer.aChildElement[oCursor.nIndexCurrent],
						oMenu = this.oLayer.aChildElement[oCursor.nIndexCurrent = oCursor.nIndexNew];

					oMenuLast && this.oLayer.addTickUpdate( () => {
						oMenuLast.hElement.classList.remove('Menu__cursor_' + nIndex);
					} );
					this.oLayer.addTickUpdate( () => {
						oMenu.hElement.classList.add('Menu__cursor_' + nIndex);
					} );
					bUpdated = true;
				}
			} );
			return bUpdated;
		},
		destroy: function(){
			const aReturn = [];
			this.aCursor.forEach( (oCursor, nIndex) => {
				if( oCursor.nIndexCurrent != null ){
					let oMenu = this.oLayer.aChildElement[oCursor.nIndexCurrent];
					this.oLayer.addTickUpdate( () => {
						oMenu.hElement.classList.remove('Menu__cursor_' + nIndex);
					} );
				}
				aReturn.push( oCursor.nIndexCurrent );
			} );
			this.oLayer.addTickUpdate( () => {
				this.oLayer.hElement.classList.remove('Menu__Layer', 'Menu__nb_cursor_' + this.aCursor.length);
			} );
			this.oLayer.update();
			return aReturn;
		},

		getIndex: function(nIndex){
			if( nIndex < 0 ){
				nIndex = this.oLayer.aChildElement.length - 1;
			} else if( nIndex >= this.oLayer.aChildElement.length ){
				nIndex = 0;
			}
			return nIndex;
		},
		select: function(nCursor, nIndex){
			if( nIndex == null ){
				nIndex = nCursor;
				nCursor = 0;
			}
			if( this.aCursor[nCursor] ){
				if( this.aCursor[nCursor].nIndexCurrent != nIndex ){
					this.aCursor[nCursor].nIndexNew = this.getIndex(nIndex);
				}
			}
		},
		next: function(nCursor){
			nCursor || ( nCursor = 0 );
			if( this.aCursor[nCursor] ){
				this.select( nCursor, this.aCursor[nCursor].nIndexCurrent + 1 );
				OutputManager.getChannel('CHN__SFX').play('ADO__Move');
			}
		},
		prev: function(nCursor){
			nCursor || ( nCursor = 0 );
			if( this.aCursor[nCursor] ){
				this.select( nCursor, this.aCursor[nCursor].nIndexCurrent - 1 );
				OutputManager.getChannel('CHN__SFX').play('ADO__Move');
			}
		},
		getSelected: function(nCursor){
			nCursor || ( nCursor = 0 );
			if( this.aCursor[nCursor] ){
				return this.oLayer.aChildElement[this.aCursor[nCursor].nIndexCurrent];
			}
		}
    }
);