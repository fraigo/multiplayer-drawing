!function(e,t){
"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Colyseus=t():e.Colyseus=t()}
("undefined"!=typeof self?self:this,function(){
return function(e){
function t(r){
if(n[r])return n[r].exports;var i=n[r]={
i:r,l:!1,exports:{
}
}
;return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}
var n={
}
;return t.m=e,t.c=n,t.d=function(e,n,r){
t.o(e,n)||Object.defineProperty(e,n,{
configurable:!1,enumerable:!0,get:r}
)}
,t.n=function(e){
var n=e&&e.__esModule?function(){
return e.default}
:function(){
return e}
;return t.d(n,"a",n),n}
,t.o=function(e,t){
return Object.prototype.hasOwnProperty.call(e,t)}
,t.p="",t(t.s=18)}
([function(e,t,n){
"use strict";var r=this&&this.__importDefault||function(e){
return e&&e.__esModule?e:{
default:e}
}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var i=r(n(21)),o=r(n(22));t.decode=i.default,t.encode=o.default}
,function(e,t,n){
"use strict";function r(e,t,n,r){
var i,o=!1;switch(t){
case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":i="number";break;case"string":i="string",o=!0;break;case"boolean":return}
if(typeof e!==i&&(!o||o&&null!==e)){
var s="'"+JSON.stringify(e)+"'"+(e&&e.constructor&&" ("+e.constructor.name+")");throw new d("a '"+i+"' was expected, but "+s+" was provided in "+n.constructor.name+"#"+r)}
}
function i(e,t,n,r){
if(!(e instanceof t))throw new d("a '"+t.name+"' was expected, but '"+e.constructor.name+"' was provided in "+n.constructor.name+"#"+r)}
function o(e,t,n,i,o){
var s=c[e];return void 0===n?t.push(u.NIL):r(n,e,i,o),!!s&&(s(t,n),!0)}
function s(e,t,n){
var r=h[e];return r?r(t,n):null}
var a=this&&this.__extends||function(){
var e=function(t,n){
return(e=Object.setPrototypeOf||{
__proto__:[]}
instanceof Array&&function(e,t){
e.__proto__=t}
||function(e,t){
for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
)(t,n)}
;return function(t,n){
function r(){
this.constructor=t}
e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}
}
();Object.defineProperty(t,"__esModule",{
value:!0}
);var u=n(15),c=n(35),h=n(36),f=n(2),l=n(3),p=n(16),d=function(e){
function t(){
return null!==e&&e.apply(this,arguments)||this}
return a(t,e),t}
(Error),v=function(){
function e(){
for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];Object.defineProperties(this,{
$changes:{
value:new p.ChangeTree,enumerable:!1,writable:!0}
}
);var n=this._descriptors;n&&Object.defineProperties(this,n)}
return Object.defineProperty(e.prototype,"_schema",{
get:function(){
return this.constructor._schema}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"_descriptors",{
get:function(){
return this.constructor._descriptors}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"_indexes",{
get:function(){
return this.constructor._indexes}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"_filters",{
get:function(){
return this.constructor._filters}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"$changed",{
get:function(){
return this.$changes.changed}
,enumerable:!0,configurable:!0}
),e.prototype.decode=function(t,n){
void 0===n&&(n={
offset:0}
);var r=[],i=this._schema,o=this._indexes,a={
}
;Object.keys(o).forEach(function(e){
var t=o[e];a[t]=e}
);var c=t.length;t[n.offset]===u.TYPE_ID&&(n.offset+=2);for(var p=this;n.offset<c;){
if("break"===function(){
var o=t[n.offset++];if(o===u.END_OF_STRUCTURE)return"break";var c=a[o],d=i[c],v=void 0,y=void 0,g=!1;if(d._schema)h.nilCheck(t,n)?(n.offset++,v=null):(v=p["_"+c]||p.createTypeInstance(t,n,d),v.decode(t,n)),g=!0;else if(Array.isArray(d)){
d=d[0],y=[];var _=p["_"+c]||new f.ArraySchema;v=_.clone();var m=h.number(t,n),b=h.number(t,n);g=b>0;var w=!1;v.length>m&&(b-=v.length-m,v.splice(m).forEach(function(e,t){
e&&e.onRemove&&e.onRemove(),_.onRemove&&_.onRemove(e,m+t)}
));for(var O=0;O<b;O++){
var C=h.number(t,n),A=void 0;h.indexChangeCheck(t,n)&&(h.uint8(t,n),A=h.number(t,n),w=!0);var S=!w&&!v[C]||w&&void 0===A;if(d.prototype instanceof e){
var I=void 0;if(I=S?p.createTypeInstance(t,n,d):void 0!==A?_[A]:_[C],I||(I=p.createTypeInstance(t,n,d),S=!0),h.nilCheck(t,n)){
n.offset++,_.onRemove&&_.onRemove(I,C);continue}
I.decode(t,n),v[C]=I}
else v[C]=s(d,t,n);S?_.onAdd&&_.onAdd(v[C],C):_.onChange&&_.onChange(v[C],C),y.push(v[C])}
}
else if(d.map){
d=d.map;var E=p["_"+c]||new l.MapSchema;v=E.clone();var P=h.number(t,n);g=P>0;for(var w=!1,R=Object.keys(E),O=0;O<P&&(void 0!==t[n.offset]&&t[n.offset]!==u.END_OF_STRUCTURE);O++){
var k=void 0;h.indexChangeCheck(t,n)&&(h.uint8(t,n),k=R[h.number(t,n)],w=!0);var j=h.numberCheck(t,n),M="string"!=typeof d,x=j?R[h.number(t,n)]:h.string(t,n),I=void 0,S=!w&&!E[x]||w&&void 0===k&&j;I=S&&M?p.createTypeInstance(t,n,d):void 0!==k?E[k]:E[x],h.nilCheck(t,n)?(n.offset++,I&&I.onRemove&&I.onRemove(),E.onRemove&&E.onRemove(I,x),delete v[x]):(M?(I.decode(t,n),v[x]=I):v[x]=s(d,t,n),S?E.onAdd&&E.onAdd(I,x):E.onChange&&E.onChange(I,x))}
}
else v=s(d,t,n),g=!0;g&&p.onChange&&r.push({
field:c,value:y||v,previousValue:p["_"+c]}
),p["_"+c]=v}
())break}
return this.onChange&&r.length>0&&this.onChange(r),this}
,e.prototype.encode=function(e,t,n){
var r=this;void 0===e&&(e=this),void 0===t&&(t=!1);var s=[],a=function(){
r!==e&&s.push(u.END_OF_STRUCTURE)}
;if(!this.$changes.changed&&!t)return a(),s;for(var h=this._schema,p=this._indexes,d=this._filters,v=t||n?this.$changes.allChanges:this.$changes.changes,y=0,g=v.length;y<g;y++){
var _=v[y],m=h[_],b=d&&d[_],w=this["_"+_],O=p[_];if(void 0!==w){
var C=[];if(m._schema){
if(n&&b&&!b.call(this,n,w,e))continue;c.number(C,O),w?(i(w,m,this,_),this.tryEncodeTypeId(C,m,w.constructor),C=C.concat(w.encode(e,t,n))):c.uint8(C,u.NIL)}
else if(Array.isArray(m)){
c.number(C,O),c.number(C,w.length);var A=t||n?w.$changes.allChanges:w.$changes.changes;c.number(C,A.length);var S="string"!=typeof m[0];i(this["_"+_],f.ArraySchema,this,_);for(var I=0;I<A.length;I++){
var E=A[I],P=this["_"+_][E];if(void 0!==P&&(!n||!b||b.call(this,n,P,e)))if(S){
c.number(C,E);var R=w.$changes.getIndexChange(P);void 0!==R&&(c.uint8(C,u.INDEX_CHANGE),c.number(C,R)),i(P,m[0],this,_),this.tryEncodeTypeId(C,m[0],P.constructor),C=C.concat(P.encode(e,t,n))}
else if(c.number(C,E),!o(m[0],C,P,this,_)){
console.log("cannot encode",h[_]);continue}
}
t||w.$changes.discard()}
else if(m.map){
c.number(C,O);var k=t||n?w.$changes.allChanges:w.$changes.changes;c.number(C,k.length);var j=Object.keys(this["_"+_]),S="string"!=typeof m.map;i(this["_"+_],l.MapSchema,this,_);for(var M=0;M<k.length;M++){
var x="number"==typeof k[M]&&j[k[M]]||k[M],P=this["_"+_][x],T=this["_"+_]._indexes.get(x);if(!n||!b||b.call(this,n,P,e)){
if(t){
if(void 0===P)continue;T=void 0}
var R=w.$changes.getIndexChange(P);P&&void 0!==R&&(c.uint8(C,u.INDEX_CHANGE),c.number(C,this["_"+_]._indexes.get(R))),void 0!==T?c.number(C,T):c.string(C,x),P&&S?(i(P,m.map,this,_),this.tryEncodeTypeId(C,m.map,P.constructor),C=C.concat(P.encode(e,t,n))):void 0!==P?o(m.map,C,P,this,_):c.uint8(C,u.NIL)}
}
t||(w.$changes.discard(),n||this["_"+_]._updateIndexes())}
else{
if(n&&b&&!b.call(this,n,w,e))continue;if(c.number(C,O),!o(m,C,w,this,_)){
console.log("cannot encode",h[_]);continue}
}
s=s.concat(C)}
}
return a(),t||n||this.$changes.discard(),s}
,e.prototype.encodeFiltered=function(e){
return this.encode(this,!1,e)}
,e.prototype.encodeAll=function(){
return this.encode(this,!0)}
,e.prototype.encodeAllFiltered=function(e){
return this.encode(this,!0,e)}
,e.prototype.clone=function(){
var e=new this.constructor,t=this._schema;for(var n in t)e[n]=this[n];return e}
,e.prototype.triggerAll=function(){
if(this.onChange){
var e=[],t=this._schema;for(var n in t)void 0!==this[n]&&e.push({
field:n,value:this[n],previousValue:void 0}
);this.onChange(e)}
}
,e.prototype.toJSON=function(){
var e=this._schema,t={
}
;for(var n in e)t[n]=this["_"+n];return t}
,e.prototype.tryEncodeTypeId=function(e,t,n){
t._typeid!==n._typeid&&(c.uint8(e,u.TYPE_ID),c.uint8(e,n._typeid))}
,e.prototype.createTypeInstance=function(e,t,n){
if(e[t.offset]===u.TYPE_ID){
t.offset++;return new(this.constructor._context.get(h.uint8(e,t)))}
return new n}
,e}
();t.Schema=v}
,function(e,t,n){
"use strict";var r=this&&this.__extends||function(){
var e=function(t,n){
return(e=Object.setPrototypeOf||{
__proto__:[]}
instanceof Array&&function(e,t){
e.__proto__=t}
||function(e,t){
for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
)(t,n)}
;return function(t,n){
function r(){
this.constructor=t}
e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}
}
();Object.defineProperty(t,"__esModule",{
value:!0}
);var i=function(e){
function t(){
for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=e.apply(this,n)||this;return Object.setPrototypeOf(i,Object.create(t.prototype)),Object.defineProperties(i,{
$changes:{
value:void 0,enumerable:!1,writable:!0}
,onAdd:{
value:void 0,enumerable:!1,writable:!0}
,onRemove:{
value:void 0,enumerable:!1,writable:!0}
,onChange:{
value:void 0,enumerable:!1,writable:!0}
,triggerAll:{
value:function(){
if(i.onAdd)for(var e=0;e<i.length;e++)i.onAdd(i[e],e)}
}
,clone:{
value:function(){
var e=new(t.bind.apply(t,[void 0].concat(i)));return e.onAdd=i.onAdd,e.onRemove=i.onRemove,e.onChange=i.onChange,e}
}
}
),i}
return r(t,e),Object.defineProperty(t,Symbol.species,{
get:function(){
return Array}
,enumerable:!0,configurable:!0}
),t}
(Array);t.ArraySchema=i}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=function(){
function e(t){
void 0===t&&(t={
}
);var n=this;for(var r in t)this[r]=t[r];Object.defineProperties(this,{
$changes:{
value:void 0,enumerable:!1,writable:!0}
,onAdd:{
value:void 0,enumerable:!1,writable:!0}
,onRemove:{
value:void 0,enumerable:!1,writable:!0}
,onChange:{
value:void 0,enumerable:!1,writable:!0}
,clone:{
value:function(){
var t=Object.assign(new e,n);return t.onAdd=n.onAdd,t.onRemove=n.onRemove,t.onChange=n.onChange,t}
}
,triggerAll:{
value:function(){
if(n.onAdd)for(var e in n)n.onAdd(n[e],e)}
}
,_indexes:{
value:new Map,enumerable:!1,writable:!0}
,_updateIndexes:{
value:function(){
var e=0,t=new Map;for(var r in n)t.set(r,e++);n._indexes=t}
}
}
)}
return e}
();t.MapSchema=r}
,function(e,t,n){
"use strict";function r(e,t){
for(var n=e.getUint8(t++),r="",i=0,o=t,s=t+n;o<s;o++){
var a=e.getUint8(o);if(0!=(128&a))if(192!=(224&a))if(224!=(240&a)){
if(240!=(248&a))throw new Error("Invalid byte "+a.toString(16));i=(7&a)<<18|(63&e.getUint8(++o))<<12|(63&e.getUint8(++o))<<6|(63&e.getUint8(++o))<<0,i>=65536?(i-=65536,r+=String.fromCharCode(55296+(i>>>10),56320+(1023&i))):r+=String.fromCharCode(i)}
else r+=String.fromCharCode((15&a)<<12|(63&e.getUint8(++o))<<6|(63&e.getUint8(++o))<<0);else r+=String.fromCharCode((31&a)<<6|63&e.getUint8(++o));else r+=String.fromCharCode(a)}
return r}
function i(e){
void 0===e&&(e="");for(var t=0,n=0,r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n+1}
Object.defineProperty(t,"__esModule",{
value:!0}
);!function(e){
e[e.USER_ID=1]="USER_ID",e[e.JOIN_REQUEST=9]="JOIN_REQUEST",e[e.JOIN_ROOM=10]="JOIN_ROOM",e[e.JOIN_ERROR=11]="JOIN_ERROR",e[e.LEAVE_ROOM=12]="LEAVE_ROOM",e[e.ROOM_DATA=13]="ROOM_DATA",e[e.ROOM_STATE=14]="ROOM_STATE",e[e.ROOM_STATE_PATCH=15]="ROOM_STATE_PATCH",e[e.ROOM_LIST=20]="ROOM_LIST",e[e.BAD_REQUEST=50]="BAD_REQUEST"}
(t.Protocol||(t.Protocol={
}
)),t.utf8Read=r,t.utf8Length=i}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(6);t.OnceSignal=r.OnceSignal;var i=n(23);t.Signal=i.Signal;var o=n(8);t.Slot=o.Slot;var s=n(7);t.SlotList=s.SlotList}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(7),i=n(8),o=function(){
function e(){
for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.slots=r.SlotList.NIL,this.valueClasses=1===e.length&&e[0]instanceof Array?e[0]:e}
return Object.defineProperty(e.prototype,"valueClasses",{
get:function(){
return this._valueClasses}
,set:function(e){
this._valueClasses=e?e.slice():[];for(var t=this._valueClasses.length;t--;)if(!(this._valueClasses[t]instanceof Object))throw new Error("Invalid valueClasses argument: item at index "+t+" should be a Class but was:<"+this._valueClasses[t]+">."+this._valueClasses[t])}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"numListeners",{
get:function(){
return this.slots.length}
,enumerable:!0,configurable:!0}
),e.prototype.addOnce=function(e){
return this.registerListener(e,!0)}
,e.prototype.once=function(e){
return this.addOnce(e)}
,e.prototype.remove=function(e){
var t=this.slots.find(e);return t?(this.slots=this.slots.filterNot(e),t):null}
,e.prototype.removeAll=function(){
this.slots=r.SlotList.NIL}
,e.prototype.dispatch=function(){
for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this._valueClasses.length,r=e.length;if(r<n)throw new Error("Incorrect number of arguments. Expected at least "+n+" but received "+r+".");for(var i=0;i<n;i++)if(!(null===e[i]||e[i]instanceof this._valueClasses[i]||e[i].constructor===this._valueClasses[i]))throw new Error("Value object <"+e[i]+"> is not an instance of <"+this._valueClasses[i]+">.");var o=this.slots;if(o.nonEmpty)for(;o.nonEmpty;)o.head.execute(e),o=o.tail}
,e.prototype.registerListener=function(e,t){
if(void 0===t&&(t=!1),this.registrationPossible(e,t)){
var n=new i.Slot(e,this,t);return this.slots=this.slots.prepend(n),n}
return this.slots.find(e)}
,e.prototype.registrationPossible=function(e,t){
if(!this.slots.nonEmpty)return!0;var n=this.slots.find(e);if(!n)return!0;if(n.once!==t)throw new Error("You cannot addOnce() then add() the same listener without removing the relationship first.");return!1}
,e}
();t.OnceSignal=o}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=function(){
function e(t,n){
if(void 0===n&&(n=null),this.nonEmpty=!1,t||n){
if(!t)throw new Error("Parameter head cannot be null.");this.head=t,this.tail=n||e.NIL,this.nonEmpty=!0}
else{
if(e.NIL)throw new Error("Parameters head and tail are null. Use the NIL element instead.");this.nonEmpty=!1}
}
return Object.defineProperty(e.prototype,"length",{
get:function(){
if(!this.nonEmpty)return 0;if(this.tail===e.NIL)return 1;for(var t=0,n=this;n.nonEmpty;)++t,n=n.tail;return t}
,enumerable:!0,configurable:!0}
),e.prototype.prepend=function(t){
return new e(t,this)}
,e.prototype.append=function(t){
if(!t)return this;if(!this.nonEmpty)return new e(t);if(this.tail===e.NIL)return new e(t).prepend(this.head);for(var n=new e(this.head),r=n,i=this.tail;i.nonEmpty;)r=r.tail=new e(i.head),i=i.tail;return r.tail=new e(t),n}
,e.prototype.insertWithPriority=function(t){
if(!this.nonEmpty)return new e(t);var n=t.priority;if(n>this.head.priority)return this.prepend(t);for(var r=new e(this.head),i=r,o=this.tail;o.nonEmpty;){
if(n>o.head.priority)return i.tail=o.prepend(t),r;i=i.tail=new e(o.head),o=o.tail}
return i.tail=new e(t),r}
,e.prototype.filterNot=function(t){
if(!this.nonEmpty||null==t)return this;if(t===this.head.listener)return this.tail;for(var n=new e(this.head),r=n,i=this.tail;i.nonEmpty;){
if(i.head.listener===t)return r.tail=i.tail,n;r=r.tail=new e(i.head),i=i.tail}
return this}
,e.prototype.contains=function(e){
if(!this.nonEmpty)return!1;for(var t=this;t.nonEmpty;){
if(t.head.listener===e)return!0;t=t.tail}
return!1}
,e.prototype.find=function(e){
if(!this.nonEmpty)return null;for(var t=this;t.nonEmpty;){
if(t.head.listener===e)return t.head;t=t.tail}
return null}
,e.prototype.toString=function(){
for(var e="",t=this;t.nonEmpty;)e+=t.head+" -> ",t=t.tail;return"[List "+(e+="NIL")+"]"}
,e.NIL=new e(null,null),e}
();t.SlotList=r}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=function(){
function e(e,t,n,r){
void 0===n&&(n=!1),void 0===r&&(r=0),this._enabled=!0,this._once=!1,this._priority=0,this._listener=e,this._once=n,this._signal=t,this._priority=r,this.verifyListener(e)}
return e.prototype.execute0=function(){
if(this._enabled){
if(this._once&&this.remove(),this._params&&this._params.length)return void this._listener.apply(null,this._params);this._listener()}
}
,e.prototype.execute1=function(e){
if(this._enabled){
if(this._once&&this.remove(),this._params&&this._params.length)return void this._listener.apply(null,[e].concat(this._params));this._listener(e)}
}
,e.prototype.execute=function(e){
if(this._enabled){
this._once&&this.remove(),this._params&&this._params.length&&(e=e.concat(this._params));var t=e.length;0===t?this._listener():1===t?this._listener(e[0]):2===t?this._listener(e[0],e[1]):3===t?this._listener(e[0],e[1],e[2]):this._listener.apply(null,e)}
}
,Object.defineProperty(e.prototype,"listener",{
get:function(){
return this._listener}
,set:function(e){
if(null==e)throw new Error("Given listener is null.\nDid you want to set enabled to false instead?");this.verifyListener(e),this._listener=e}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"once",{
get:function(){
return this._once}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"priority",{
get:function(){
return this._priority}
,enumerable:!0,configurable:!0}
),e.prototype.toString=function(){
return"[Slot listener: "+this._listener+", once: "+this._once+", priority: "+this._priority+", enabled: "+this._enabled+"]"}
,Object.defineProperty(e.prototype,"enabled",{
get:function(){
return this._enabled}
,set:function(e){
this._enabled=e}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"params",{
get:function(){
return this._params}
,set:function(e){
this._params=e}
,enumerable:!0,configurable:!0}
),e.prototype.remove=function(){
this._signal.remove(this._listener)}
,e.prototype.verifyListener=function(e){
if(null==e)throw new Error("Given listener is null.");if(null==this._signal)throw new Error("Internal signal reference has not been set yet.")}
,e}
();t.Slot=r}
,function(e,t,n){
"use strict";var r=this&&this.__extends||function(){
var e=function(t,n){
return(e=Object.setPrototypeOf||{
__proto__:[]}
instanceof Array&&function(e,t){
e.__proto__=t}
||function(e,t){
for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
)(t,n)}
;return function(t,n){
function r(){
this.constructor=t}
e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}
}
(),i=this&&this.__importDefault||function(e){
return e&&e.__esModule?e:{
default:e}
}
,o=this&&this.__importStar||function(e){
if(e&&e.__esModule)return e;var t={
}
;if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var s=i(n(24)),a=o(n(0)),u=function(e){
function t(t,n){
void 0===n&&(n=!0);var r=e.call(this,t,void 0,{
connect:n}
)||this;return r._enqueuedCalls=[],r}
return r(t,e),t.prototype.onOpenCallback=function(t){
if(e.prototype.onOpenCallback.call(this),this.binaryType="arraybuffer",this._enqueuedCalls.length>0){
for(var n=0,r=this._enqueuedCalls;n<r.length;n++){
var i=r[n],o=i[0],s=i[1];this[o].apply(this,s)}
this._enqueuedCalls=[]}
}
,t.prototype.send=function(t){
if(this.ws.readyState===s.default.OPEN)return e.prototype.send.call(this,a.encode(t));this._enqueuedCalls.push(["send",[t]])}
,t}
(s.default);t.Connection=u}
,function(e,t,n){
"use strict";var r=this&&this.__importStar||function(e){
if(e&&e.__esModule)return e;var t={
}
;if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var i=n(5),o=r(n(0)),s=n(9),a=n(11),u=n(4),c=function(){
function e(e,t,n){
var r=this;this.onJoin=new i.Signal,this.onStateChange=new i.Signal,this.onMessage=new i.Signal,this.onError=new i.Signal,this.onLeave=new i.Signal,this.id=null,this.name=e,this.options=t,n?(this.serializer=new(a.getSerializer("schema")),this.rootSchema=n,this.serializer.state=new n):this.serializer=new(a.getSerializer("fossil-delta")),this.onLeave.add(function(){
return r.removeAllListeners()}
)}
return e.prototype.connect=function(e){
var t=this;this.connection=new s.Connection(e,!1),this.connection.reconnectEnabled=!1,this.connection.onmessage=this.onMessageCallback.bind(this),this.connection.onclose=function(e){
return t.onLeave.dispatch(e)}
,this.connection.onerror=function(e){
console.warn("Possible causes: room's onAuth() failed or maxClients has been reached."),t.onError.dispatch(e)}
,this.connection.open()}
,e.prototype.leave=function(e){
void 0===e&&(e=!0),this.connection?e?this.connection.send([u.Protocol.LEAVE_ROOM]):this.connection.close():this.onLeave.dispatch()}
,e.prototype.send=function(e){
this.connection.send([u.Protocol.ROOM_DATA,this.id,e])}
,Object.defineProperty(e.prototype,"state",{
get:function(){
return this.serializer.getState()}
,enumerable:!0,configurable:!0}
),Object.defineProperty(e.prototype,"hasJoined",{
get:function(){
return void 0!==this.sessionId}
,enumerable:!0,configurable:!0}
),e.prototype.listen=function(e,t,n){
return"schema"===this.serializerId?void console.error("'"+this.serializerId+"' serializer doesn't support .listen() method."):(this.serializerId||console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)"),this.serializer.api.listen(e,t,n))}
,e.prototype.removeListener=function(e){
return this.serializer.api.removeListener(e)}
,e.prototype.removeAllListeners=function(){
this.serializer&&this.serializer.teardown(),this.onJoin.removeAll(),this.onStateChange.removeAll(),this.onMessage.removeAll(),this.onError.removeAll(),this.onLeave.removeAll()}
,e.prototype.onMessageCallback=function(e){
if(this.previousCode)this.previousCode===u.Protocol.ROOM_STATE?this.setState(Array.from(new Uint8Array(e.data))):this.previousCode===u.Protocol.ROOM_STATE_PATCH?this.patch(Array.from(new Uint8Array(e.data))):this.previousCode===u.Protocol.ROOM_DATA&&this.onMessage.dispatch(o.decode(e.data)),this.previousCode=void 0;else{
var t=new DataView(e.data),n=t.getUint8(0);if(n===u.Protocol.JOIN_ROOM){
var r=1;this.sessionId=u.utf8Read(t,r),r+=u.utf8Length(this.sessionId),this.serializerId=u.utf8Read(t,r),r+=u.utf8Length(this.serializerId);var i=a.getSerializer(this.serializerId);if(!i)throw new Error("missing serializer: "+this.serializerId);if("fossil-delta"===this.serializerId||this.rootSchema||(this.serializer=new i),t.buffer.byteLength>r&&this.serializer.handshake){
var s=Array.from(new Uint8Array(t.buffer.slice(r)));this.serializer.handshake(s)}
this.onJoin.dispatch()}
else n===u.Protocol.JOIN_ERROR?this.onError.dispatch(u.utf8Read(t,1)):n===u.Protocol.LEAVE_ROOM?this.leave():this.previousCode=n}
}
,e.prototype.setState=function(e){
this.serializer.setState(e),this.onStateChange.dispatch(this.serializer.getState())}
,e.prototype.patch=function(e){
this.serializer.patch(e),this.onStateChange.dispatch(this.serializer.getState())}
,e}
();t.Room=c}
,function(e,t,n){
"use strict";function r(e,t){
o[e]=t}
function i(e){
return o[e]}
Object.defineProperty(t,"__esModule",{
value:!0}
);var o={
}
;t.registerSerializer=r,t.getSerializer=i}
,function(e,t,n){
"use strict";function r(){
return a||(a="undefined"!=typeof cc&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:"undefined"!=typeof window&&window.localStorage?window.localStorage:{
cache:{
}
,setItem:function(e,t){
this.cache[e]=t}
,getItem:function(e){
this.cache[e]}
,removeItem:function(e){
delete this.cache[e]}
}
),a}
function i(e,t){
r().setItem(e,t)}
function o(e){
r().removeItem(e)}
function s(e,t){
var n=r().getItem(e);"undefined"!=typeof Promise&&n instanceof Promise?n.then(function(e){
return t(e)}
):t(n)}
Object.defineProperty(t,"__esModule",{
value:!0}
);var a;t.setItem=i,t.removeItem=o,t.getItem=s}
,function(e,t,n){
"use strict";var r=this&&this.__awaiter||function(e,t,n,r){
return new(n||(n=Promise))(function(i,o){
function s(e){
try{
u(r.next(e))}
catch(e){
o(e)}
}
function a(e){
try{
u(r.throw(e))}
catch(e){
o(e)}
}
function u(e){
e.done?i(e.value):new n(function(t){
t(e.value)}
).then(s,a)}
u((r=r.apply(e,t||[])).next())}
)}
,i=this&&this.__generator||function(e,t){
function n(e){
return function(t){
return r([e,t])}
}
function r(n){
if(i)throw new TypeError("Generator is already executing.");for(;u;)try{
if(i=1,o&&(s=2&n[0]?o.return:n[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,n[1])).done)return s;switch(o=0,s&&(n=[2&n[0],s.value]),n[0]){
case 0:case 1:s=n;break;case 4:return u.label++,{
value:n[1],done:!1}
;case 5:u.label++,o=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(s=u.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){
u=0;continue}
if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){
u.label=n[1];break}
if(6===n[0]&&u.label<s[1]){
u.label=s[1],s=n;break}
if(s&&u.label<s[2]){
u.label=s[2],u.ops.push(n);break}
s[2]&&u.ops.pop(),u.trys.pop();continue}
n=t.call(e,u)}
catch(e){
n=[6,e],o=0}
finally{
i=s=0}
if(5&n[0])throw n[1];return{
value:n[0]?n[1]:void 0,done:!0}
}
var i,o,s,a,u={
label:0,sent:function(){
if(1&s[0])throw s[1];return s[1]}
,trys:[],ops:[]}
;return a={
next:n(0),throw:n(1),return:n(2)}
,"function"==typeof Symbol&&(a[Symbol.iterator]=function(){
return this}
),a}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var o=n(27),s=n(12),a="colyseus-auth-token";!function(e){
e.ios="ios",e.android="android"}
(t.Platform||(t.Platform={
}
));var u=function(){
function e(e){
var t=this;this._id=void 0,this.username=void 0,this.displayName=void 0,this.avatarUrl=void 0,this.isAnonymous=void 0,this.email=void 0,this.lang=void 0,this.location=void 0,this.timezone=void 0,this.metadata=void 0,this.devices=void 0,this.facebookId=void 0,this.twitterId=void 0,this.googleId=void 0,this.gameCenterId=void 0,this.steamId=void 0,this.friendIds=void 0,this.blockedUserIds=void 0,this.createdAt=void 0,this.updatedAt=void 0,this.token=void 0,this.endpoint=e.replace("ws","http"),s.getItem(a,function(e){
return t.token=e}
)}
return Object.defineProperty(e.prototype,"hasToken",{
get:function(){
return!!this.token}
,enumerable:!0,configurable:!0}
),e.prototype.login=function(e){
return void 0===e&&(e={
}
),r(this,void 0,void 0,function(){
var t,n,r,u,c;return i(this,function(i){
switch(i.label){
case 0:t=[];for(n in e)t.push(n+"="+e[n]);return this.token&&t.push("token="+this.token),[4,o.post(this.endpoint+"/auth?"+t.join("&"),{
headers:{
Accept:"application/json"}
}
)];case 1:r=i.sent(),u=r.data,this.token=u.token,s.setItem(a,this.token);for(c in u)this.hasOwnProperty(c)&&(this[c]=u[c]);return this.registerPingService(),[2,this]}
}
)}
)}
,e.prototype.save=function(){
return r(this,void 0,void 0,function(){
return i(this,function(e){
switch(e.label){
case 0:return[4,o.put(this.endpoint+"/auth",{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
,body:{
username:this.username,displayName:this.displayName,avatarUrl:this.avatarUrl,lang:this.lang,location:this.location,timezone:this.timezone}
}
)];case 1:return e.sent(),[2,this]}
}
)}
)}
,e.prototype.getFriends=function(){
return r(this,void 0,void 0,function(){
return i(this,function(e){
switch(e.label){
case 0:return[4,o.get(this.endpoint+"/friends/all",{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,e.sent().data]}
}
)}
)}
,e.prototype.getOnlineFriends=function(){
return r(this,void 0,void 0,function(){
return i(this,function(e){
switch(e.label){
case 0:return[4,o.get(this.endpoint+"/friends/online",{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,e.sent().data]}
}
)}
)}
,e.prototype.getFriendRequests=function(e){
return r(this,void 0,void 0,function(){
return i(this,function(e){
switch(e.label){
case 0:return[4,o.get(this.endpoint+"/friends/requests",{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,e.sent().data]}
}
)}
)}
,e.prototype.sendFriendRequest=function(e){
return r(this,void 0,void 0,function(){
return i(this,function(t){
switch(t.label){
case 0:return[4,o.post(this.endpoint+"/friends/requests?userId="+e,{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,t.sent().data]}
}
)}
)}
,e.prototype.acceptFriendRequest=function(e){
return r(this,void 0,void 0,function(){
return i(this,function(t){
switch(t.label){
case 0:return[4,o.put(this.endpoint+"/friends/requests?userId="+e,{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,t.sent().data]}
}
)}
)}
,e.prototype.declineFriendRequest=function(e){
return r(this,void 0,void 0,function(){
return i(this,function(t){
switch(t.label){
case 0:return[4,o.del(this.endpoint+"/friends/requests?userId="+e,{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,t.sent().data]}
}
)}
)}
,e.prototype.blockUser=function(e){
return r(this,void 0,void 0,function(){
return i(this,function(t){
switch(t.label){
case 0:return[4,o.post(this.endpoint+"/friends/block?userId="+e,{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,t.sent().data]}
}
)}
)}
,e.prototype.unblockUser=function(e){
return r(this,void 0,void 0,function(){
return i(this,function(t){
switch(t.label){
case 0:return[4,o.put(this.endpoint+"/friends/block?userId="+e,{
headers:{
Accept:"application/json",Authorization:"Bearer "+this.token}
}
)];case 1:return[2,t.sent().data]}
}
)}
)}
,e.prototype.logout=function(){
this.token=void 0,s.removeItem(a),this.unregisterPingService()}
,e.prototype.registerPingService=function(e){
var t=this;void 0===e&&(e=15e3),this.unregisterPingService(),this.keepOnlineInterval=setInterval(function(){
o.get(t.endpoint+"/auth",{
headers:{
Accept:"application/json",Authorization:"Bearer "+t.token}
}
)}
,e)}
,e.prototype.unregisterPingService=function(){
clearInterval(this.keepOnlineInterval)}
,e}
();t.Auth=u}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(1);t.Schema=r.Schema;var i=n(3);t.MapSchema=i.MapSchema;var o=n(2);t.ArraySchema=o.ArraySchema;var s=n(37);t.Reflection=s.Reflection,t.ReflectionType=s.ReflectionType,t.ReflectionField=s.ReflectionField;var a=n(17);t.type=a.type,t.filter=a.filter,t.Context=a.Context}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
),t.END_OF_STRUCTURE=193,t.NIL=192,t.INDEX_CHANGE=212,t.TYPE_ID=213}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(1),i=n(2),o=n(3),s=function(){
function e(e,t,n){
void 0===e&&(e=null),void 0===n&&(n=!1),this.changed=!1,this.changes=[],this.allChanges=[],this.linkedTrees=[],this.parent=t,this.parentField=e,this.trackAllChanges=n}
return e.prototype.link=function(e){
this.linkedTrees.push(e)}
,e.prototype.change=function(e,t){
void 0===t&&(t=!1),this.changed=!0,-1===this.changes.indexOf(e)&&this.changes.push(e);var n=this.allChanges.indexOf(e);t||-1!==n?t&&n>=0&&this.allChanges.splice(n,1):this.allChanges.push(e),this.parent&&this.parent.change(this.parentField)}
,e.prototype.mapIndex=function(e,t){
this.indexMap||(this.indexMap=new Map,this.indexChange=new Map),this.indexMap.set(e,t)}
,e.prototype.getIndex=function(e){
return this.indexMap&&this.indexMap.get(e)}
,e.prototype.deleteIndex=function(e){
this.indexMap.delete(e)}
,e.prototype.mapIndexChange=function(e,t){
this.indexChange.set(e,t)}
,e.prototype.getIndexChange=function(e){
return this.indexChange&&this.indexChange.get(e)}
,e.prototype.deleteIndexChange=function(e){
this.indexChange.delete(e)}
,e.prototype.changeAll=function(e){
if(e instanceof r.Schema){
var t=e._schema;for(var n in t)(e[n]instanceof r.Schema||e[n]instanceof i.ArraySchema||e[n]instanceof o.MapSchema)&&!e[n].$changes.parent.parent&&(e[n].$changes.parent=this),this.change(n)}
else for(var s=Object.keys(e),a=0,u=s;a<u.length;a++){
var c=u[a];this.change(c)}
}
,e.prototype.discard=function(){
this.changed=!1,this.changes=[],this.indexChange&&this.indexChange.clear()}
,e}
();t.ChangeTree=s}
,function(e,t,n){
"use strict";function r(e,n){
return void 0===n&&(n=t.globalContext),function(t,r){
var i=t.constructor;i._context=n,n.has(i)||(n.add(i),i._schema=Object.assign({
}
,i._schema||{
}
),i._indexes=Object.assign({
}
,i._indexes||{
}
),i._descriptors=Object.assign({
}
,i._descriptors||{
}
)),i._indexes[r]=Object.keys(i._schema).length,i._schema[r]=e;var a=Array.isArray(e),u=!a&&e.map,c="_"+r;i._descriptors[c]={
enumerable:!1,configurable:!1,writable:!0}
,i._descriptors[r]={
get:function(){
return this[c]}
,set:function(e){
if((a||u)&&(e=new Proxy(e,{
get:function(e,t){
return e[t]}
,set:function(e,t,n){
if("length"!==t&&"$changes"!==t){
var r=a?Number(t):String(t),i=e.$changes.getIndex(n);void 0!==i&&e.$changes.mapIndexChange(n,i),e.$changes.mapIndex(n,r),n instanceof s.Schema?n.$changes.parent||(n.$changes=new o.ChangeTree(r,e.$changes),n.$changes.changeAll(n)):e[t]=n,e.$changes.change(r)}
else e[t];return e[t]=n,!0}
,deleteProperty:function(e,t){e[t];delete e[t];var n=a?Number(t):String(t);return e.$changes.change(n,!0),!0}
}
)),e!==this[c])if(this[c]=e,Array.isArray(i._schema[r])){
this.$changes.change(r),e.$changes=new o.ChangeTree(r,this.$changes);for(var t=0;t<e.length;t++)e[t]instanceof s.Schema&&(e[t].$changes=new o.ChangeTree(t,e.$changes),e[t].$changes.changeAll(e[t])),e.$changes.mapIndex(e[t],t),e.$changes.change(t)}
else if(i._schema[r].map){
e.$changes=new o.ChangeTree(r,this.$changes),this.$changes.change(r);for(var n in e)e[n]instanceof s.Schema&&(e[n].$changes=new o.ChangeTree(n,e.$changes),e[n].$changes.changeAll(e[n])),e.$changes.mapIndex(e[n],n),e.$changes.change(n)}
else"function"==typeof i._schema[r]?(this.$changes.change(r),e&&(e.$changes=new o.ChangeTree(r,this.$changes),e.$changes.changeAll(e))):this.$changes.change(r)}
,enumerable:!0,configurable:!0}
}
}
function i(e){
return function(t,n){
var r=t.constructor;r._filters||(r._filters={
}
),r._filters[n]=e}
}
Object.defineProperty(t,"__esModule",{
value:!0}
);var o=n(16),s=n(1),a=function(){
function e(){
this.types={
}
,this.schemas=new Map}
return e.prototype.has=function(e){
return this.schemas.has(e)}
,e.prototype.get=function(e){
return this.types[e]}
,e.prototype.add=function(e){
e._typeid=this.schemas.size,this.types[e._typeid]=e,this.schemas.set(e,e._typeid)}
,e}
();t.Context=a,t.globalContext=new a,t.type=r,t.filter=i}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
),n(19);var r=n(20);t.Client=r.Client;var i=n(4);t.Protocol=i.Protocol;var o=n(10);t.Room=o.Room;var s=n(13);t.Auth=s.Auth,t.Platform=s.Platform;var a=n(29);t.FossilDeltaSerializer=a.FossilDeltaSerializer;var u=n(34);t.SchemaSerializer=u.SchemaSerializer;var c=n(11);t.registerSerializer=c.registerSerializer;var h=n(14);t.Schema=h.Schema,t.type=h.type,c.registerSerializer("fossil-delta",a.FossilDeltaSerializer),c.registerSerializer("schema",u.SchemaSerializer)}
,function(e,t){
ArrayBuffer.isView||(ArrayBuffer.isView=function(e){
return null!==e&&"object"==typeof e&&e.buffer instanceof ArrayBuffer}
)}
,function(e,t,n){
"use strict";var r=this&&this.__importStar||function(e){
if(e&&e.__esModule)return e;var t={
}
;if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var i=r(n(0)),o=n(5),s=n(9),a=n(4),u=n(10),c=n(12),h=n(13),f=n(28),l=function(){
function e(e,t){
var n=this;void 0===t&&(t={
}
),this.onOpen=new o.Signal,this.onClose=new o.Signal,this.onError=new o.Signal,this.rooms={
}
,this.connectingRooms={
}
,this.requestId=0,this.roomsAvailableRequests={
}
,this.hostname=e,this.auth=new h.Auth(this.hostname),this.push=new f.Push(this.hostname),c.getItem("colyseusid",function(e){
return n.connect(e,t)}
)}
return e.prototype.join=function(e,t,n){
return void 0===t&&(t={
}
),this.createRoomRequest(e,t,n)}
,e.prototype.rejoin=function(e,t,n){
if(!t.sessionId)throw new Error("'sessionId' options is required for 'rejoin'.");return this.join(e,t,n)}
,e.prototype.getAvailableRooms=function(e,t){
var n=this,r=this.getNextRequestId(),i=function(){
return delete n.roomsAvailableRequests[r]}
,o=setTimeout(function(){
i(),t([],"timeout")}
,15e3);this.connection.send([a.Protocol.ROOM_LIST,r,e]),this.roomsAvailableRequests[r]=function(e){
i(),clearTimeout(o),t(e)}
}
,e.prototype.close=function(){
this.connection.close()}
,e.prototype.createRoom=function(e,t,n){
return void 0===t&&(t={
}
),new u.Room(e,t,n)}
,e.prototype.createRoomRequest=function(e,t,n,r,i){
var o=this;t.requestId=this.getNextRequestId(),this.auth.hasToken&&(t.token=this.auth.token);var s=r||this.createRoom(e,t,n);return s.onLeave.addOnce(function(){
delete o.rooms[s.id],delete o.connectingRooms[t.requestId]}
),t.retryTimes&&s.onError.addOnce(function(){
i=i||0,!s.hasJoined&&i<=t.retryTimes&&(i++,o.createRoomRequest(e,t,n,s,i))}
),this.connectingRooms[t.requestId]=s,this.connection.send([a.Protocol.JOIN_REQUEST,e,t]),s}
,e.prototype.connect=function(e,t){
var n=this;void 0===t&&(t={
}
),this.id=e||"",this.connection=new s.Connection(this.buildEndpoint("",t)),this.connection.onmessage=this.onMessageCallback.bind(this),this.connection.onclose=function(e){
return n.onClose.dispatch(e)}
,this.connection.onerror=function(e){
return n.onError.dispatch(e)}
,this.connection.onopen=function(){
n.id&&n.onOpen.dispatch()}
}
,e.prototype.buildEndpoint=function(e,t){
void 0===e&&(e=""),void 0===t&&(t={
}
);var n=["colyseusid="+this.id];for(var r in t)t.hasOwnProperty(r)&&n.push(r+"="+t[r]);return this.hostname+"/"+e+"?"+n.join("&")}
,e.prototype.onMessageCallback=function(e){
if(this.previousCode){
if(this.previousCode===a.Protocol.ROOM_LIST){
var t=i.decode(new Uint8Array(e.data)),n=t[0],r=t[1];this.roomsAvailableRequests[n]?this.roomsAvailableRequests[n](r):console.warn("receiving ROOM_LIST after timeout:",r)}
this.previousCode=void 0}
else{
var o=new DataView(e.data),s=o.getUint8(0);if(s===a.Protocol.USER_ID)this.id=a.utf8Read(o,1),c.setItem("colyseusid",this.id),this.onOpen.dispatch();else if(s===a.Protocol.JOIN_REQUEST){
var n=o.getUint8(1),u=this.connectingRooms[n],h="";if(!u)return void console.warn("colyseus.js: client left room before receiving session id.");u.id=a.utf8Read(o,2),this.rooms[u.id]=u;var f=3+u.id.length;o.byteLength>f&&(h=a.utf8Read(o,f)+"/"),u.connect(this.buildEndpoint(h+u.id,u.options)),delete this.connectingRooms[n]}
else if(s===a.Protocol.JOIN_ERROR){
var l=a.utf8Read(o,1);console.error("colyseus.js: server error:",l),this.onError.dispatch(l)}
else s===a.Protocol.ROOM_LIST&&(this.previousCode=s)}
}
,e.prototype.getNextRequestId=function(){
return++this.requestId%255}
,e}
();t.Client=l}
,function(e,t,n){
"use strict";function r(e){
if(this._offset=0,e instanceof ArrayBuffer)this._buffer=e,this._view=new DataView(this._buffer);else{
if(!ArrayBuffer.isView(e))throw new Error("Invalid argument");this._buffer=e.buffer,this._view=new DataView(this._buffer,e.byteOffset,e.byteLength)}
}
function i(e,t,n){
for(var r="",i=0,o=t,s=t+n;o<s;o++){
var a=e.getUint8(o);if(0!=(128&a))if(192!=(224&a))if(224!=(240&a)){
if(240!=(248&a))throw new Error("Invalid byte "+a.toString(16));i=(7&a)<<18|(63&e.getUint8(++o))<<12|(63&e.getUint8(++o))<<6|(63&e.getUint8(++o))<<0,i>=65536?(i-=65536,r+=String.fromCharCode(55296+(i>>>10),56320+(1023&i))):r+=String.fromCharCode(i)}
else r+=String.fromCharCode((15&a)<<12|(63&e.getUint8(++o))<<6|(63&e.getUint8(++o))<<0);else r+=String.fromCharCode((31&a)<<6|63&e.getUint8(++o));else r+=String.fromCharCode(a)}
return r}
function o(e){
var t=new r(e),n=t._parse();if(t._offset!==e.byteLength)throw new Error(e.byteLength-t._offset+" trailing bytes");return n}
r.prototype._array=function(e){
for(var t=new Array(e),n=0;n<e;n++)t[n]=this._parse();return t}
,r.prototype._map=function(e){
for(var t="",n={
}
,r=0;r<e;r++)t=this._parse(),n[t]=this._parse();return n}
,r.prototype._str=function(e){
var t=i(this._view,this._offset,e);return this._offset+=e,t}
,r.prototype._bin=function(e){
var t=this._buffer.slice(this._offset,this._offset+e);return this._offset+=e,t}
,r.prototype._parse=function(){
var e,t=this._view.getUint8(this._offset++),n=0,r=0,i=0,o=0;if(t<192)return t<128?t:t<144?this._map(15&t):t<160?this._array(15&t):this._str(31&t);if(t>223)return-1*(255-t+1);switch(t){
case 192:return null;case 194:return!1;case 195:return!0;case 196:return n=this._view.getUint8(this._offset),this._offset+=1,this._bin(n);case 197:return n=this._view.getUint16(this._offset),this._offset+=2,this._bin(n);case 198:return n=this._view.getUint32(this._offset),this._offset+=4,this._bin(n);case 199:return n=this._view.getUint8(this._offset),r=this._view.getInt8(this._offset+1),this._offset+=2,[r,this._bin(n)];case 200:return n=this._view.getUint16(this._offset),r=this._view.getInt8(this._offset+2),this._offset+=3,[r,this._bin(n)];case 201:return n=this._view.getUint32(this._offset),r=this._view.getInt8(this._offset+4),this._offset+=5,[r,this._bin(n)];case 202:return e=this._view.getFloat32(this._offset),this._offset+=4,e;case 203:return e=this._view.getFloat64(this._offset),this._offset+=8,e;case 204:return e=this._view.getUint8(this._offset),this._offset+=1,e;case 205:return e=this._view.getUint16(this._offset),this._offset+=2,e;case 206:return e=this._view.getUint32(this._offset),this._offset+=4,e;case 207:return i=this._view.getUint32(this._offset)*Math.pow(2,32),o=this._view.getUint32(this._offset+4),this._offset+=8,i+o;case 208:return e=this._view.getInt8(this._offset),this._offset+=1,e;case 209:return e=this._view.getInt16(this._offset),this._offset+=2,e;case 210:return e=this._view.getInt32(this._offset),this._offset+=4,e;case 211:return i=this._view.getInt32(this._offset)*Math.pow(2,32),o=this._view.getUint32(this._offset+4),this._offset+=8,i+o;case 212:return r=this._view.getInt8(this._offset),this._offset+=1,0===r?void(this._offset+=1):[r,this._bin(1)];case 213:return r=this._view.getInt8(this._offset),this._offset+=1,[r,this._bin(2)];case 214:return r=this._view.getInt8(this._offset),this._offset+=1,[r,this._bin(4)];case 215:return r=this._view.getInt8(this._offset),this._offset+=1,0===r?(i=this._view.getInt32(this._offset)*Math.pow(2,32),o=this._view.getUint32(this._offset+4),this._offset+=8,new Date(i+o)):[r,this._bin(8)];case 216:return r=this._view.getInt8(this._offset),this._offset+=1,[r,this._bin(16)];case 217:return n=this._view.getUint8(this._offset),this._offset+=1,this._str(n);case 218:return n=this._view.getUint16(this._offset),this._offset+=2,this._str(n);case 219:return n=this._view.getUint32(this._offset),this._offset+=4,this._str(n);case 220:return n=this._view.getUint16(this._offset),this._offset+=2,this._array(n);case 221:return n=this._view.getUint32(this._offset),this._offset+=4,this._array(n);case 222:return n=this._view.getUint16(this._offset),this._offset+=2,this._map(n);case 223:return n=this._view.getUint32(this._offset),this._offset+=4,this._map(n)}
throw new Error("Could not parse")}
,e.exports=o}
,function(e,t,n){
"use strict";function r(e,t,n){
for(var r=0,i=0,o=n.length;i<o;i++)r=n.charCodeAt(i),r<128?e.setUint8(t++,r):r<2048?(e.setUint8(t++,192|r>>6),e.setUint8(t++,128|63&r)):r<55296||r>=57344?(e.setUint8(t++,224|r>>12),e.setUint8(t++,128|r>>6&63),e.setUint8(t++,128|63&r)):(i++,r=65536+((1023&r)<<10|1023&n.charCodeAt(i)),e.setUint8(t++,240|r>>18),e.setUint8(t++,128|r>>12&63),e.setUint8(t++,128|r>>6&63),e.setUint8(t++,128|63&r))}
function i(e){
for(var t=0,n=0,r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}
function o(e,t,n){
var r=typeof n,s=0,a=0,u=0,c=0,h=0,f=0;if("string"===r){
if((h=i(n))<32)e.push(160|h),f=1;else if(h<256)e.push(217,h),f=2;else if(h<65536)e.push(218,h>>8,h),f=3;else{
if(!(h<4294967296))throw new Error("String too long");e.push(219,h>>24,h>>16,h>>8,h),f=5}
return t.push({
_str:n,_length:h,_offset:e.length}
),f+h}
if("number"===r)return Math.floor(n)===n&&isFinite(n)?n>=0?n<128?(e.push(n),1):n<256?(e.push(204,n),2):n<65536?(e.push(205,n>>8,n),3):n<4294967296?(e.push(206,n>>24,n>>16,n>>8,n),5):(u=n/Math.pow(2,32)>>0,c=n>>>0,e.push(207,u>>24,u>>16,u>>8,u,c>>24,c>>16,c>>8,c),9):n>=-32?(e.push(n),1):n>=-128?(e.push(208,n),2):n>=-32768?(e.push(209,n>>8,n),3):n>=-2147483648?(e.push(210,n>>24,n>>16,n>>8,n),5):(u=Math.floor(n/Math.pow(2,32)),c=n>>>0,e.push(211,u>>24,u>>16,u>>8,u,c>>24,c>>16,c>>8,c),9):(e.push(203),t.push({
_float:n,_length:8,_offset:e.length}
),9);if("object"===r){
if(null===n)return e.push(192),1;if(Array.isArray(n)){
if((h=n.length)<16)e.push(144|h),f=1;else if(h<65536)e.push(220,h>>8,h),f=3;else{
if(!(h<4294967296))throw new Error("Array too large");e.push(221,h>>24,h>>16,h>>8,h),f=5}
for(s=0;s<h;s++)f+=o(e,t,n[s]);return f}
if(n instanceof Date){
var l=n.getTime();return u=Math.floor(l/Math.pow(2,32)),c=l>>>0,e.push(215,0,u>>24,u>>16,u>>8,u,c>>24,c>>16,c>>8,c),10}
if(n instanceof ArrayBuffer){
if((h=n.byteLength)<256)e.push(196,h),f=2;else if(h<65536)e.push(197,h>>8,h),f=3;else{
if(!(h<4294967296))throw new Error("Buffer too large");e.push(198,h>>24,h>>16,h>>8,h),f=5}
return t.push({
_bin:n,_length:h,_offset:e.length}
),f+h}
if("function"==typeof n.toJSON)return o(e,t,n.toJSON());var p=[],d="",v=Object.keys(n);for(s=0,a=v.length;s<a;s++)d=v[s],"function"!=typeof n[d]&&p.push(d);if((h=p.length)<16)e.push(128|h),f=1;else if(h<65536)e.push(222,h>>8,h),f=3;else{
if(!(h<4294967296))throw new Error("Object too large");e.push(223,h>>24,h>>16,h>>8,h),f=5}
for(s=0;s<h;s++)d=p[s],f+=o(e,t,d),f+=o(e,t,n[d]);return f}
if("boolean"===r)return e.push(n?195:194),1;if("undefined"===r)return e.push(212,0,0),3;throw new Error("Could not encode")}
function s(e){
var t=[],n=[],i=o(t,n,e),s=new ArrayBuffer(i),a=new DataView(s),u=0,c=0,h=-1;n.length>0&&(h=n[0]._offset);for(var f,l=0,p=0,d=0,v=t.length;d<v;d++)if(a.setUint8(c+d,t[d]),d+1===h){
if(f=n[u],l=f._length,p=c+h,f._bin)for(var y=new Uint8Array(f._bin),g=0;g<l;g++)a.setUint8(p+g,y[g]);else f._str?r(a,p,f._str):void 0!==f._float&&a.setFloat64(p,f._float);u++,c+=l,n[u]&&(h=n[u]._offset)}
return s}
e.exports=s}
,function(e,t,n){
"use strict";var r=this&&this.__extends||function(){
var e=Object.setPrototypeOf||{
__proto__:[]}
instanceof Array&&function(e,t){
e.__proto__=t}
||function(e,t){
for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
;return function(t,n){
function r(){
this.constructor=t}
e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}
}
();Object.defineProperty(t,"__esModule",{
value:!0}
);var i=n(6),o=function(e){
function t(){
return null!==e&&e.apply(this,arguments)||this}
return r(t,e),t.prototype.add=function(e){
return this.registerListener(e)}
,t}
(i.OnceSignal);t.Signal=o}
,function(e,t,n){
"use strict";function r(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}
Object.defineProperty(t,"__esModule",{
value:!0}
);var i=function(){
function e(e,t){
for(var n=0;n<t.length;n++){
var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}
}
return function(t,n,r){
return n&&e(t.prototype,n),r&&e(t,r),t}
}
(),o=n(25).createBackoff,s="undefined"!=typeof WebSocket?WebSocket:n(26),a=function(){
function e(t,n){
var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{
}
;r(this,e),this.url=t,this.protocols=n,this.reconnectEnabled=!0,this.listeners={
}
,this.backoff=o(i.backoff||"exponential",i),this.backoff.onReady=this.onBackoffReady.bind(this),(void 0===i.connect||i.connect)&&this.open()}
return i(e,[{
key:"open",value:function(){
var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isReconnect=e;var t=this.ws&&this.ws.binaryType;this.ws=new s(this.url,this.protocols),this.ws.onclose=this.onCloseCallback.bind(this),this.ws.onerror=this.onErrorCallback.bind(this),this.ws.onmessage=this.onMessageCallback.bind(this),this.ws.onopen=this.onOpenCallback.bind(this),t&&(this.ws.binaryType=t)}
}
,{
key:"onBackoffReady",value:function(e,t){
this.open(!0)}
}
,{
key:"onCloseCallback",value:function(e){
!this.isReconnect&&this.listeners.onclose&&this.listeners.onclose.apply(null,arguments),this.reconnectEnabled&&e.code<3e3&&this.backoff.backoff()}
}
,{
key:"onErrorCallback",value:function(){
this.listeners.onerror&&this.listeners.onerror.apply(null,arguments)}
}
,{
key:"onMessageCallback",value:function(){
this.listeners.onmessage&&this.listeners.onmessage.apply(null,arguments)}
}
,{
key:"onOpenCallback",value:function(){
this.listeners.onopen&&this.listeners.onopen.apply(null,arguments),this.isReconnect&&this.listeners.onreconnect&&this.listeners.onreconnect.apply(null,arguments),this.isReconnect=!1}
}
,{
key:"close",value:function(e,t){
void 0===e&&(e=1e3),this.reconnectEnabled=!1,this.ws.close(e,t)}
}
,{
key:"send",value:function(e){
this.ws.send(e)}
}
,{
key:"bufferedAmount",get:function(){
return this.ws.bufferedAmount}
}
,{
key:"readyState",get:function(){
return this.ws.readyState}
}
,{
key:"binaryType",get:function(){
return this.ws.binaryType}
,set:function(e){
this.ws.binaryType=e}
}
,{
key:"extensions",get:function(){
return this.ws.extensions}
,set:function(e){
this.ws.extensions=e}
}
,{
key:"protocol",get:function(){
return this.ws.protocol}
,set:function(e){
this.ws.protocol=e}
}
,{
key:"onclose",set:function(e){
this.listeners.onclose=e}
,get:function(){
return this.listeners.onclose}
}
,{
key:"onerror",set:function(e){
this.listeners.onerror=e}
,get:function(){
return this.listeners.onerror}
}
,{
key:"onmessage",set:function(e){
this.listeners.onmessage=e}
,get:function(){
return this.listeners.onmessage}
}
,{
key:"onopen",set:function(e){
this.listeners.onopen=e}
,get:function(){
return this.listeners.onopen}
}
,{
key:"onreconnect",set:function(e){
this.listeners.onreconnect=e}
,get:function(){
return this.listeners.onreconnect}
}
]),e}
();a.CONNECTING=s.CONNECTING,a.OPEN=s.OPEN,a.CLOSING=s.CLOSING,a.CLOSED=s.CLOSED,t.default=a}
,function(e,t,n){
"use strict";function r(e,t){
return new i(o[e],t)}
function i(e,t){
this.func=e,this.attempts=0,this.delay=void 0!==t.initialDelay?t.initialDelay:100}
Object.defineProperty(t,"__esModule",{
value:!0}
),t.createBackoff=r;var o={
exponential:function(e,t){
return Math.floor(Math.random()*Math.pow(2,e)*t)}
,fibonacci:function(e,t){
var n=1;if(e>n)for(var r=1,n=2,i=2;i<e;i++){
var o=r+n;r=n,n=o}
return Math.floor(Math.random()*n*t)}
}
;i.prototype.backoff=function(){
setTimeout(this.onReady,this.func(++this.attempts,this.delay))}
}
,function(e,t){
}
,function(e,t,n){
"use strict";function r(e,t){
t.headers=e.headers||{
}
,t.statusMessage=e.statusText,t.statusCode=e.status,t.data=e.response}
function i(e,t,n){
return new Promise(function(i,o){
n=n||{
}
;var s,a,u,c,h=new XMLHttpRequest,f=n.headers||{
}
;h.timeout=n.timeout,h.ontimeout=h.onerror=function(e){
e.timeout="timeout"==e.type,o(e)}
,h.open(e,t),h.onload=function(){
for(c=h.getAllResponseHeaders().trim().split(/[\r\n]+/),r(h,h);u=c.shift();)u=u.split(": "),h.headers[u.shift().toLowerCase()]=u.join(": ");if((u=h.headers["content-type"])&&~u.indexOf("application/json"))try{
h.data=JSON.parse(h.data,n.reviver)}
catch(e){
return r(h,e),o(e)}
(h.status>=400?o:i)(h)}
,(a=n.body)&&/Array|Object/.test(a.constructor)&&(f["content-type"]="application/json",a=JSON.stringify(a));for(s in f)h.setRequestHeader(s,f[s]);h.send(a)}
)}
Object.defineProperty(t,"__esModule",{
value:!0}
),t.send=i,n.d(t,"get",function(){
return o}
),n.d(t,"post",function(){
return s}
),n.d(t,"patch",function(){
return a}
),n.d(t,"del",function(){
return u}
),n.d(t,"put",function(){
return c}
);var o=i.bind(i,"GET"),s=i.bind(i,"POST"),a=i.bind(i,"PATCH"),u=i.bind(i,"DELETE"),c=i.bind(i,"PUT")}
,function(e,t,n){
"use strict";var r=this&&this.__awaiter||function(e,t,n,r){
return new(n||(n=Promise))(function(i,o){
function s(e){
try{
u(r.next(e))}
catch(e){
o(e)}
}
function a(e){
try{
u(r.throw(e))}
catch(e){
o(e)}
}
function u(e){
e.done?i(e.value):new n(function(t){
t(e.value)}
).then(s,a)}
u((r=r.apply(e,t||[])).next())}
)}
,i=this&&this.__generator||function(e,t){
function n(e){
return function(t){
return r([e,t])}
}
function r(n){
if(i)throw new TypeError("Generator is already executing.");for(;u;)try{
if(i=1,o&&(s=2&n[0]?o.return:n[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,n[1])).done)return s;switch(o=0,s&&(n=[2&n[0],s.value]),n[0]){
case 0:case 1:s=n;break;case 4:return u.label++,{
value:n[1],done:!1}
;case 5:u.label++,o=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(s=u.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){
u=0;continue}
if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){
u.label=n[1];break}
if(6===n[0]&&u.label<s[1]){
u.label=s[1],s=n;break}
if(s&&u.label<s[2]){
u.label=s[2],u.ops.push(n);break}
s[2]&&u.ops.pop(),u.trys.pop();continue}
n=t.call(e,u)}
catch(e){
n=[6,e],o=0}
finally{
i=s=0}
if(5&n[0])throw n[1];return{
value:n[0]?n[1]:void 0,done:!0}
}
var i,o,s,a,u={
label:0,sent:function(){
if(1&s[0])throw s[1];return s[1]}
,trys:[],ops:[]}
;return a={
next:n(0),throw:n(1),return:n(2)}
,"function"==typeof Symbol&&(a[Symbol.iterator]=function(){
return this}
),a}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var o=function(){
function e(e){
this.endpoint=e.replace("ws","http")}
return e.prototype.register=function(){
return r(this,void 0,void 0,function(){
return i(this,function(e){
switch(e.label){
case 0:return this.check(),[4,this.registerServiceWorker()];case 1:return e.sent(),[4,this.requestNotificationPermission()];case 2:return e.sent(),[2]}
}
)}
)}
,e.prototype.registerServiceWorker=function(){
return r(this,void 0,void 0,function(){
return i(this,function(e){
switch(e.label){
case 0:return[4,navigator.serviceWorker.register(this.endpoint+"/push")];case 1:return[2,e.sent()]}
}
)}
)}
,e.prototype.requestNotificationPermission=function(){
return r(this,void 0,void 0,function(){
var e;return i(this,function(t){
switch(t.label){
case 0:return[4,window.Notification.requestPermission()];case 1:if("granted"!==(e=t.sent()))throw new Error("Permission not granted for Notification");return[2]}
}
)}
)}
,e.prototype.check=function(){
if(!("serviceWorker"in navigator))throw new Error("No Service Worker support!");if(!("PushManager"in window))throw new Error("No Push API Support!")}
,e}
();t.Push=o}
,function(e,t,n){
"use strict";var r=this&&this.__importStar||function(e){
if(e&&e.__esModule)return e;var t={
}
;if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var i=n(30),o=r(n(33)),s=r(n(0)),a=function(){
function e(){
this.api=new i.StateContainer({
}
)}
return e.prototype.getState=function(){
return this.api.state}
,e.prototype.setState=function(e){
this.previousState=new Uint8Array(e),this.api.set(s.decode(this.previousState))}
,e.prototype.patch=function(e){
this.previousState=new Uint8Array(o.apply(this.previousState,e)),this.api.set(s.decode(this.previousState))}
,e.prototype.teardown=function(){
this.api.removeAllListeners()}
,e}
();t.FossilDeltaSerializer=a}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(31);t.StateContainer=r.StateContainer}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(32),i=function(){
function e(e){
this.listeners=[],this.matcherPlaceholders={
":id":/^([a-zA-Z0-9\-_]+)$/,":number":/^([0-9]+)$/,":string":/^(\w+)$/,":axis":/^([xyz])$/,":*":/(.*)/}
,this.state=e,this.reset()}
return e.prototype.set=function(e){
var t=r.compare(this.state,e);return this.state=e,this.checkPatches(t,this.listeners,this.defaultListener),t}
,e.prototype.registerPlaceholder=function(e,t){
this.matcherPlaceholders[e]=t}
,e.prototype.listen=function(e,t,n){
var i,o=this;"function"==typeof e?(i=[],t=e):i=e.split("/"),t.length>1&&console.warn(".listen() accepts only one parameter.");var s={
callback:t,rawRules:i,rules:i.map(function(e){
return"string"==typeof e?0===e.indexOf(":")?o.matcherPlaceholders[e]||o.matcherPlaceholders[":*"]:new RegExp("^"+e+"$"):e}
)}
;return 0===i.length?this.defaultListener=s:this.listeners.push(s),n&&this.checkPatches(r.compare({
}
,this.state),[s]),s}
,e.prototype.removeListener=function(e){
for(var t=this.listeners.length-1;t>=0;t--)this.listeners[t]===e&&this.listeners.splice(t,1)}
,e.prototype.removeAllListeners=function(){
this.reset()}
,e.prototype.checkPatches=function(e,t,n){
for(var r=0,i=t.length;r<i;r++)for(var o=t[r],s=e.length-1;s>=0;s--){
var a=o&&this.getPathVariables(e[s],o);a&&(o.callback({
path:a,rawPath:e[s].path,operation:e[s].operation,value:e[s].value}
),e[s].matched=!0)}
if(n)for(var s=e.length-1;s>=0;s--)e[s].matched||n.callback(e[s])}
,e.prototype.getPathVariables=function(e,t){
if(e.path.length!==t.rules.length)return!1;for(var n={
}
,r=0,i=t.rules.length;r<i;r++){
var o=e.path[r].match(t.rules[r]);if(!o||0===o.length||o.length>2)return!1;":"===t.rawRules[r].substr(0,1)&&(n[t.rawRules[r].substr(1)]=o[1])}
return n}
,e.prototype.reset=function(){
this.listeners=[]}
,e}
();t.StateContainer=i}
,function(e,t,n){
"use strict";function r(e,t){
var n=[];return s(e,t,n,[]),n}
function i(e,t){
var n=e.slice();return n.push(t),n}
function o(e){
if(Array.isArray(e)){
for(var t=new Array(e.length),n=0;n<t.length;n++)t[n]=""+n;return t}
if(Object.keys)return Object.keys(e);var r=[];for(var i in e)e.hasOwnProperty(i)&&r.push(i);return r}
function s(e,t,n,r){
for(var a=o(t),u=o(e),c=!1,h=u.length-1;h>=0;h--){
var f=u[h],l=e[f];if(!t.hasOwnProperty(f)||void 0===t[f]&&void 0!==l&&!1===Array.isArray(t))n.push({
operation:"remove",path:i(r,f)}
),c=!0;else{
var p=t[f];"object"==typeof l&&null!=l&&"object"==typeof p&&null!=p?s(l,p,n,i(r,f)):l!==p&&n.push({
operation:"replace",path:i(r,f),value:p,previousValue:l}
)}
}
if(c||a.length!=u.length)for(var h=a.length-1;h>=0;h--){
var f=a[h];if(!e.hasOwnProperty(f)&&void 0!==t[f]){
var p=t[f],d=i(r,f);"object"==typeof p&&null!=p&&s({
}
,p,n,d),n.push({
operation:"add",path:d,value:p}
)}
}
}
Object.defineProperty(t,"__esModule",{
value:!0}
),t.compare=r}
,function(e,t){
!function(t,n){
void 0!==e&&e.exports?e.exports=n():t.fossilDelta=n()}
(this,function(){
"use strict";function e(){
this.a=0,this.b=0,this.i=0,this.z=new Array(s)}
function t(e){
this.a=e,this.pos=0}
function n(){
this.a=[]}
function r(e){
var t,n;for(t=1,n=64;e>=n;t++,n<<=6);return t}
function i(e){
for(var t=0,n=0,r=0,i=0,o=0,s=e.length;s>=16;)t=t+e[o+0]|0,n=n+e[o+1]|0,r=r+e[o+2]|0,i=i+e[o+3]|0,t=t+e[o+4]|0,n=n+e[o+5]|0,r=r+e[o+6]|0,i=i+e[o+7]|0,t=t+e[o+8]|0,n=n+e[o+9]|0,r=r+e[o+10]|0,i=i+e[o+11]|0,t=t+e[o+12]|0,n=n+e[o+13]|0,r=r+e[o+14]|0,i=i+e[o+15]|0,o+=16,s-=16;for(;s>=4;)t=t+e[o+0]|0,n=n+e[o+1]|0,r=r+e[o+2]|0,i=i+e[o+3]|0,o+=4,s-=4;switch(i=((i+(r<<8)|0)+(n<<16)|0)+(t<<24)|0,s){
case 3:i=i+(e[o+2]<<8)|0;case 2:i=i+(e[o+1]<<16)|0;case 1:i=i+(e[o+0]<<24)|0}
return i>>>0}
var o={
}
,s=16;e.prototype.init=function(e,t){
var n,r,i=0,o=0;for(n=0;n<s;n++)r=e[t+n],i=i+r&65535,o=o+(s-n)*r&65535,this.z[n]=r;this.a=65535&i,this.b=65535&o,this.i=0}
,e.prototype.next=function(e){
var t=this.z[this.i];this.z[this.i]=e,this.i=this.i+1&s-1,this.a=this.a-t+e&65535,this.b=this.b-s*t+this.a&65535}
,e.prototype.value=function(){
return(65535&this.a|(65535&this.b)<<16)>>>0}
;var a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".split("").map(function(e){
return e.charCodeAt(0)}
),u=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,-1,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,-1,-1,-1,-1,36,-1,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,-1,-1,-1,63,-1];return t.prototype.haveBytes=function(){
return this.pos<this.a.length}
,t.prototype.getByte=function(){
var e=this.a[this.pos];if(++this.pos>this.a.length)throw new RangeError("out of bounds");return e}
,t.prototype.getChar=function(){
return String.fromCharCode(this.getByte())}
,t.prototype.getInt=function(){
for(var e,t=0;this.haveBytes()&&(e=u[127&this.getByte()])>=0;)t=(t<<6)+e;return this.pos--,t>>>0}
,n.prototype.toArray=function(){
return this.a}
,n.prototype.putByte=function(e){
this.a.push(255&e)}
,n.prototype.putChar=function(e){
this.putByte(e.charCodeAt(0))}
,n.prototype.putInt=function(e){
var t,n,r=[];if(0===e)return void this.putChar("0");for(t=0;e>0;t++,e>>>=6)r.push(a[63&e]);for(n=t-1;n>=0;n--)this.putByte(r[n])}
,n.prototype.putArray=function(e,t,n){
for(var r=t;r<n;r++)this.a.push(e[r])}
,o.create=function(t,o){
var a,u=new n,c=o.length,h=t.length,f=-1;if(u.putInt(c),u.putChar("\n"),h<=s)return u.putInt(c),u.putChar(":"),u.putArray(o,0,c),u.putInt(i(o)),u.putChar(";"),u.toArray();var l=Math.ceil(h/s),p=new Array(l),d=new Array(l);for(a=0;a<p.length;a++)p[a]=-1;for(a=0;a<d.length;a++)d[a]=-1;var v,y=new e;for(a=0;a<h-s;a+=s)y.init(t,a),v=y.value()%l,p[a/s]=d[v],d[v]=a/s;for(var g,_,m,b,w,O=0;O+s<c;)for(b=0,w=0,y.init(o,O),a=0,m=0;;){
var C=250;for(v=y.value()%l,_=d[v];_>=0&&C-- >0;){
var A,S,I,E,P,R,k,j;for(g=_*s,E=0,R=g,k=O+a;R<h&&k<c&&t[R]===o[k];E++,R++,k++);for(E--,P=1;P<g&&P<=a&&t[g-P]===o[O+a-P];P++);P--,S=g-P,A=E+P+1,I=a-P,j=r(a-P)+r(A)+r(S)+3,A>=j&&A>m&&(m=A,b=g-P,w=I),_=p[_]}
if(m>0){
w>0&&(u.putInt(w),u.putChar(":"),u.putArray(o,O,O+w),O+=w),O+=m,u.putInt(m),u.putChar("@"),u.putInt(b),u.putChar(","),b+m-1>f&&(f=b+m-1),m=0;break}
if(O+a+s>=c){
u.putInt(c-O),u.putChar(":"),u.putArray(o,O,O+c-O),O=c;break}
y.next(o[O+a+s]),a++}
return O<c&&(u.putInt(c-O),u.putChar(":"),u.putArray(o,O,O+c-O)),u.putInt(i(o)),u.putChar(";"),u.toArray()}
,o.outputSize=function(e){
var n=new t(e),r=n.getInt();if("\n"!==n.getChar())throw new Error("size integer not terminated by '\\n'");return r}
,o.apply=function(e,r,o){
var s,a=0,u=new t(r),c=e.length,h=r.length;if(s=u.getInt(),"\n"!==u.getChar())throw new Error("size integer not terminated by '\\n'");for(var f=new n;u.haveBytes();){
var l,p;switch(l=u.getInt(),u.getChar()){
case"@":if(p=u.getInt(),u.haveBytes()&&","!==u.getChar())throw new Error("copy command not terminated by ','");if((a+=l)>s)throw new Error("copy exceeds output file size");if(p+l>c)throw new Error("copy extends past end of input");f.putArray(e,p,p+l);break;case":":if((a+=l)>s)throw new Error("insert command gives an output larger than predicted");if(l>h)throw new Error("insert count exceeds size of delta");f.putArray(u.a,u.pos,u.pos+l),u.pos+=l;break;case";":var d=f.toArray();if((!o||!1!==o.verifyChecksum)&&l!==i(d))throw new Error("bad checksum");if(a!==s)throw new Error("generated size does not match predicted size");return d;default:throw new Error("unknown delta operator")}
}
throw new Error("unterminated delta")}
,o}
)}
,function(e,t,n){
"use strict";Object.defineProperty(t,"__esModule",{
value:!0}
);var r=n(14),i=function(){
function e(){
}
return e.prototype.setState=function(e){
this.state.decode(e)}
,e.prototype.getState=function(){
return this.state}
,e.prototype.patch=function(e){
this.state.decode(e)}
,e.prototype.teardown=function(){
}
,e.prototype.handshake=function(e){
if(this.state){
(new r.Reflection).decode(e)}
else this.state=r.Reflection.decode(e)}
,e}
();t.SchemaSerializer=i}
,function(e,t,n){
"use strict";function r(e){
for(var t=0,n=0,r=0,i=e.length;r<i;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}
function i(e,t,n){
for(var r=0,i=0,o=n.length;i<o;i++)r=n.charCodeAt(i),r<128?e[t++]=r:r<2048?(e[t++]=192|r>>6,e[t++]=128|63&r):r<55296||r>=57344?(e[t++]=224|r>>12,e[t++]=128|r>>6&63,e[t++]=128|63&r):(i++,r=65536+((1023&r)<<10|1023&n.charCodeAt(i)),e[t++]=240|r>>18,e[t++]=128|r>>12&63,e[t++]=128|r>>6&63,e[t++]=128|63&r)}
function o(e,t){
e.push(t)}
function s(e,t){
e.push(t)}
function a(e,t){
e.push(t),e.push(t>>8)}
function u(e,t){
e.push(t),e.push(t>>8)}
function c(e,t){
e.push(t),e.push(t>>8),e.push(t>>16),e.push(t>>24)}
function h(e,t){
var n=t>>24,r=t>>16,i=t>>8,o=t;e.push(o),e.push(i),e.push(r),e.push(n)}
function f(e,t){
var n=Math.floor(t/Math.pow(2,32));h(e,t>>>0),h(e,n)}
function l(e,t){
var n=t/Math.pow(2,32)>>0;h(e,t>>>0),h(e,n)}
function p(e,t){
v(e,t)}
function d(e,t){
y(e,t)}
function v(e,t){
O[0]=t,c(e,w[0])}
function y(e,t){
C[0]=t,c(e,w[b?0:1]),c(e,w[b?1:0])}
function g(e,t){
return s(e,t?1:0)}
function _(e,t){
t||(t="");var n=r(t),o=0;if(n<32)e.push(160|n),o=1;else if(n<256)e.push(217),s(e,n),o=2;else if(n<65536)e.push(218),u(e,n),o=3;else{
if(!(n<4294967296))throw new Error("String too long");e.push(219),h(e,n),o=5}
return i(e,e.length,t),o+n}
function m(e,t){
return isNaN(t)?(console.error("trying to encode a NaN value. will be encoded as `0`."),m(e,0)):isFinite(t)?Math.floor(t)===t&&isFinite(t)?t>=0?t<128?(s(e,t),1):t<256?(e.push(204),s(e,t),2):t<65536?(e.push(205),u(e,t),3):t<4294967296?(e.push(206),h(e,t),5):(e.push(207),l(e,t),9):t>=-32?(e.push(t),1):t>=-128?(e.push(208),o(e,t),2):t>=-32768?(e.push(209),a(e,t),3):t>=-2147483648?(e.push(210),c(e,t),5):(e.push(211),f(e,t),9):(e.push(203),y(e,t),9):m(e,t>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER)}
Object.defineProperty(t,"__esModule",{
value:!0}
),t.utf8Write=i,t.int8=o,t.uint8=s,t.int16=a,t.uint16=u,t.int32=c,t.uint32=h,t.int64=f,t.uint64=l,t.float32=p,t.float64=d;var b=!0,w=new Int32Array(2),O=new Float32Array(w.buffer),C=new Float64Array(w.buffer);t.writeFloat32=v,t.writeFloat64=y,t.boolean=g,t.string=_,t.number=m}
,function(e,t,n){
"use strict";function r(e,t,n){
for(var r="",i=0,o=t,s=t+n;o<s;o++){
var a=e[o];if(0!=(128&a))if(192!=(224&a))if(224!=(240&a)){
if(240!=(248&a))throw new Error("Invalid byte "+a.toString(16));i=(7&a)<<18|(63&e[++o])<<12|(63&e[++o])<<6|(63&e[++o])<<0,i>=65536?(i-=65536,r+=String.fromCharCode(55296+(i>>>10),56320+(1023&i))):r+=String.fromCharCode(i)}
else r+=String.fromCharCode((15&a)<<12|(63&e[++o])<<6|(63&e[++o])<<0);else r+=String.fromCharCode((31&a)<<6|63&e[++o]);else r+=String.fromCharCode(a)}
return r}
function i(e,t){
return o(e,t)<<24>>24}
function o(e,t){
return e[t.offset++]}
function s(e,t){
return a(e,t)<<16>>16}
function a(e,t){
return e[t.offset++]|e[t.offset++]<<8}
function u(e,t){
return e[t.offset++]|e[t.offset++]<<8|e[t.offset++]<<16|e[t.offset++]<<24}
function c(e,t){
return u(e,t)>>>0}
function h(e,t){
return d(e,t)}
function f(e,t){
return v(e,t)}
function l(e,t){
var n=c(e,t);return u(e,t)*Math.pow(2,32)+n}
function p(e,t){
var n=c(e,t);return c(e,t)*Math.pow(2,32)+n}
function d(e,t){
return I[0]=u(e,t),E[0]}
function v(e,t){
return I[S?0:1]=u(e,t),I[S?1:0]=u(e,t),P[0]}
function y(e,t){
return o(e,t)>0}
function g(e,t){
var n,i=e[t.offset++];i<192?n=31&i:217===i?n=o(e,t):218===i?n=a(e,t):219===i&&(n=c(e,t));var s=r(e,t.offset,n);return t.offset+=n,s}
function _(e,t){
var n=e[t.offset];return n<192&&n>160||217===n||218===n||219===n}
function m(e,t){
var n=e[t.offset++];return n<128?n:202===n?d(e,t):203===n?v(e,t):204===n?o(e,t):205===n?a(e,t):206===n?c(e,t):207===n?p(e,t):208===n?i(e,t):209===n?s(e,t):210===n?u(e,t):211===n?l(e,t):n>223?-1*(255-n+1):void 0}
function b(e,t){
var n=e[t.offset];return n<128||n>=202&&n<=211}
function w(e,t){
return e[t.offset]<160}
function O(e,t){
return e[t.offset]===A.NIL}
function C(e,t){
return e[t.offset]===A.INDEX_CHANGE}
Object.defineProperty(t,"__esModule",{
value:!0}
);var A=n(15);t.int8=i,t.uint8=o,t.int16=s,t.uint16=a,t.int32=u,t.uint32=c,t.float32=h,t.float64=f,t.int64=l,t.uint64=p;var S=!0,I=new Int32Array(2),E=new Float32Array(I.buffer),P=new Float64Array(I.buffer);t.readFloat32=d,t.readFloat64=v,t.boolean=y,t.string=g,t.stringCheck=_,t.number=m,t.numberCheck=b,t.arrayCheck=w,t.nilCheck=O,t.indexChangeCheck=C}
,function(e,t,n){
"use strict";var r=this&&this.__extends||function(){
var e=function(t,n){
return(e=Object.setPrototypeOf||{
__proto__:[]}
instanceof Array&&function(e,t){
e.__proto__=t}
||function(e,t){
for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
)(t,n)}
;return function(t,n){
function r(){
this.constructor=t}
e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}
}
(),i=this&&this.__decorate||function(e,t,n,r){
var i,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,n,s):i(t,n))||s);return o>3&&s&&Object.defineProperty(t,n,s),s}
;Object.defineProperty(t,"__esModule",{
value:!0}
);var o=n(17),s=n(1),a=n(2),u=n(3),c=new o.Context,h=function(e){
function t(){
return null!==e&&e.apply(this,arguments)||this}
return r(t,e),i([o.type("string",c)],t.prototype,"name",void 0),i([o.type("string",c)],t.prototype,"type",void 0),i([o.type("uint8",c)],t.prototype,"referencedType",void 0),t}
(s.Schema);t.ReflectionField=h;var f=function(e){
function t(){
var t=null!==e&&e.apply(this,arguments)||this;return t.fields=new a.ArraySchema,t}
return r(t,e),i([o.type("uint8",c)],t.prototype,"id",void 0),i([o.type([h],c)],t.prototype,"fields",void 0),t}
(s.Schema);t.ReflectionType=f;var l=function(e){
function t(){
var t=null!==e&&e.apply(this,arguments)||this;return t.types=new a.ArraySchema,t}
return r(t,e),t.encode=function(e){
var n=e.constructor,r=new t;r.rootType=n._typeid;var i=n._context.types;for(var o in i){
var s=new f;s.id=Number(o),function(e,t){
for(var n in t){
var i=new h;i.name=n;var o=void 0;if("string"==typeof t[n])o=t[n];else{
var s="function"==typeof t[n],a=Array.isArray(t[n]),u=!a&&t[n].map,c=void 0;s?(o="ref",c=t[n]):a?(o="array","string"==typeof t[n][0]?o+=":"+t[n][0]:c=t[n][0]):u&&(o="map","string"==typeof t[n].map?o+=":"+t[n].map:c=t[n].map),i.referencedType=c?c._typeid:255}
i.type=o,e.fields.push(i)}
r.types.push(e)}
(s,i[o]._schema)}
return r.encodeAll()}
,t.decode=function(e){
var n=new o.Context,i=new t;i.decode(e);var c=i.types.reduce(function(e,t){
return e[t.id]=function(e){
function t(){
return null!==e&&e.apply(this,arguments)||this}
return r(t,e),t}
(s.Schema),e}
,{
}
);i.types.forEach(function(e,t){
e.fields.forEach(function(t){
var r=c[e.id];if(void 0!==t.referencedType){
var i=c[t.referencedType];i||(i=t.type.split(":")[1]),0===t.type.indexOf("array")?o.type([i],n)(r.prototype,t.name):0===t.type.indexOf("map")?o.type({
map:i}
,n)(r.prototype,t.name):"ref"===t.type&&o.type(i,n)(r.prototype,t.name)}
else o.type(t.type,n)(r.prototype,t.name)}
)}
);var h=c[i.rootType],f=new h;for(var l in h._schema){
var p=h._schema[l];if("string"!=typeof p){
var d="function"==typeof p,v=Array.isArray(p),y=!v&&p.map;f[l]=v?new a.ArraySchema:y?new u.MapSchema:d?new p:void 0}
}
return f}
,i([o.type([f],c)],t.prototype,"types",void 0),i([o.type("uint8",c)],t.prototype,"rootType",void 0),t}
(s.Schema);t.Reflection=l}
])}
);