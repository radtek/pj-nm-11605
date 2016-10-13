// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.11/esri/copyright.txt for details.
//>>built
define("esri/undoManager",["dojo/_base/declare","dojo/has","./kernel","./Evented","dojo/has!extend-esri?./OperationBase"],function(b,c,d,e){b=b([e],{declaredClass:"esri.UndoManager",maxOperations:10,canUndo:!1,canRedo:!1,position:0,length:0,onUndo:function(){},onRedo:function(){},onAdd:function(){},onChange:function(){},constructor:function(a){a=a||{};a.maxOperations&&(this.maxOperations=a.maxOperations);this._historyStack=[]},add:function(a){if(0<this.maxOperations)for(;this._historyStack.length>=
this.maxOperations;)this._historyStack.shift();this._historyStack.splice(this.position,0,a);this.position++;this.clearRedo();this.onAdd();this._checkAvailability()},undo:function(){if(0===this.position)return null;var a=this.peekUndo();this.position--;a&&a.performUndo();this.onUndo();this._checkAvailability()},redo:function(){if(this.position===this._historyStack.length)return null;var a=this.peekRedo();this.position++;a&&a.performRedo();this.onRedo();this._checkAvailability()},_checkAvailability:function(){this.length=
this._historyStack.length;0===this.length?this.canUndo=this.canRedo=!1:0===this.position?(this.canRedo=!0,this.canUndo=!1):this.position===this.length?(this.canUndo=!0,this.canRedo=!1):this.canRedo=this.canUndo=!0;this.onChange()},clearUndo:function(){this._historyStack.splice(0,this.position);this.position=0;this._checkAvailability()},clearRedo:function(){this._historyStack.splice(this.position,this._historyStack.length-this.position);this.position=this._historyStack.length;this._checkAvailability()},
peekUndo:function(){if(0<this._historyStack.length&&0<this.position)return this.get(this.position-1)},peekRedo:function(){if(0<this._historyStack.length&&this.position<this._historyStack.length)return this.get(this.position)},get:function(a){return this._historyStack[a]},remove:function(a){0<this._historyStack.length&&(this._historyStack.splice(a,1),0<this.position&&a<this.position&&this.position--,this._checkAvailability())},destroy:function(){this._historyStack=null}});c("extend-esri")&&(d.UndoManager=
b);return b});