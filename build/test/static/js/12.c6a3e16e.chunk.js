webpackJsonp([12],{1270:function(n,t,o){var e=o(1271);"string"===typeof e&&(e=[[n.i,e,""]]);var r={hmr:!1,transform:void 0};o(729)(e,r);e.locals&&(n.exports=e.locals)},1271:function(n,t,o){(n.exports=o(728)(!0)).push([n.i,".notfound-wrapper{text-align:center}.notfound-wrapper img{display:block;width:635px;height:512px;margin:0 auto;margin-top:90px;margin-bottom:30px}","",{version:3,sources:["/Users/yinhuang/demo/FutureDao_React_Ts/src/containers/notfound/index.less"],names:[],mappings:"AAAA,kBACE,iBAAmB,CACpB,AACD,sBACE,cAAe,AACf,YAAa,AACb,aAAc,AACd,cAAe,AACf,gBAAiB,AACjB,kBAAoB,CACrB",file:"index.less",sourcesContent:[".notfound-wrapper {\n  text-align: center;\n}\n.notfound-wrapper img {\n  display: block;\n  width: 635px;\n  height: 512px;\n  margin: 0 auto;\n  margin-top: 90px;\n  margin-bottom: 30px;\n}\n"],sourceRoot:""}])},1272:function(n,t,o){n.exports=o.p+"static/media/notfound.5ad79c77.png"},747:function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e,r=o(0),i=(o.n(r),o(1270)),p=(o.n(i),o(256)),s=o(254),a=this&&this.__extends||(e=function(n,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var o in t)t.hasOwnProperty(o)&&(n[o]=t[o])})(n,t)},function(n,t){function o(){this.constructor=n}e(n,t),n.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),c=function(n){function t(t){var o=n.call(this,t)||this;return o.intrl=o.props.intl.messages,o.handeToGoHome=function(){o.props.history.push("/")},o}return a(t,n),t.prototype.render=function(){return r.createElement("div",{className:"notfound-wrapper"},r.createElement("img",{src:o(1272),alt:"notfound.png"}),r.createElement(p.a,{text:this.intrl.notfound.btn,btnColor:"white-purple",btnSize:"bg-bg-btn",onClick:this.handeToGoHome}))},t}(r.Component);t.default=Object(s.c)(c)}});