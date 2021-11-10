function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}import{openPopup}from"./index.js";var Card=function(){function e(t,n){_classCallCheck(this,e),this._name=t.name,this._link=t.link,this._cardSelector=n}return _createClass(e,[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._element.querySelector(".element__photo").src=this._link,this._element.querySelector(".element__name").textContent=this._name,this._element.querySelector(".element__photo").alt=this._decription,this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element__like").addEventListener("click",(function(){e._toggleLike()})),this._element.querySelector(".element__delete").addEventListener("click",(function(){e._deleteElement()})),this._element.querySelector(".element__photo").addEventListener("click",(function(){e._openPlaceImageFullscreen()}))}},{key:"_openPlaceImageFullscreen",value:function(){var e=document.querySelector(".popup_type_image"),t=e.querySelector(".popup__image"),n=e.querySelector(".popup__caption");t.src=this._link,t.alt="Фотография места. Название: ".concat(this._name),n.textContent=this._decription,openPopup(e)}},{key:"_toggleLike",value:function(){this._element.querySelector(".element__like").classList.toggle("element__like_active")}},{key:"_deleteElement",value:function(){this._element.remove()}}]),e}();export{Card as default};