webpackJsonp([13],{1289:function(t,n,o){var e=o(1290);"string"===typeof e&&(e=[[t.i,e,""]]);var r={hmr:!1,transform:void 0};o(739)(e,r);e.locals&&(t.exports=e.locals)},1290:function(t,n,o){(t.exports=o(738)(!0)).push([t.i,".notfound-wrapper{text-align:center}.notfound-wrapper img{display:block;width:635px;height:512px;margin:0 auto;margin-top:90px;margin-bottom:30px}","",{version:3,sources:["D:/future-project/FutureDao_React_Ts/src/containers/notfound/index.less"],names:[],mappings:"AAAA,kBACE,iBAAmB,CACpB,AACD,sBACE,cAAe,AACf,YAAa,AACb,aAAc,AACd,cAAe,AACf,gBAAiB,AACjB,kBAAoB,CACrB",file:"index.less",sourcesContent:[".notfound-wrapper {\n  text-align: center;\n}\n.notfound-wrapper img {\n  display: block;\n  width: 635px;\n  height: 512px;\n  margin: 0 auto;\n  margin-top: 90px;\n  margin-bottom: 30px;\n}\n"],sourceRoot:""}])},1291:function(t,n,o){t.exports=o.p+"static/media/notfound.5ad79c77.png"},762:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e,r=o(0),i=(o.n(r),o(1289)),p=(o.n(i),o(260)),a=o(257),s=this&&this.__extends||(e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(t,n)},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),c=function(t){function n(n){var o=t.call(this,n)||this;return o.intrl=o.props.intl.messages,o.handeToGoHome=function(){o.props.history.push("/")},o}return s(n,t),n.prototype.render=function(){return r.createElement("div",{className:"notfound-wrapper"},r.createElement("img",{src:o(1291),alt:"notfound.png"}),r.createElement(p.a,{text:this.intrl.notfound.btn,btnColor:"white-purple",btnSize:"bg-bg-btn",onClick:this.handeToGoHome}))},n}(r.Component);n.default=Object(a.c)(c)}});