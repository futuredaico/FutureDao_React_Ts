webpackJsonp([11],{1188:function(t,e,n){var i=n(1189);"string"===typeof i&&(i=[[t.i,i,""]]);var o={hmr:!1,transform:void 0};n(736)(i,o);i.locals&&(t.exports=i.locals)},1189:function(t,e,n){(t.exports=n(735)(!0)).push([t.i,".email-wrapper{position:relative;min-height:659px}.emailcheck-container{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;width:4rem;min-width:400px;font-size:16px}.emailcheck-container .success-email .success-icon{width:100px;height:114px;margin-bottom:25px}.emailcheck-container .success-email .addr-p{margin-bottom:20px}.emailcheck-container .success-email .to-icon{width:20px;height:20px;margin-top:5px;margin-bottom:5px}.emailcheck-container .success-email .back-home{display:block;margin-top:60px;color:#ff7c5c;text-decoration:underline}.emailcheck-container .fail-email .fail-icon{width:100px;height:100px;margin-bottom:25px}.invite-container{height:-webkit-fill-available;background:#fff}.invite-container .invite-box{width:750px;height:380px;background:#f6f6f6;border-radius:3px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-align:center;font-size:16px}.invite-container .invite-box .invite-p{margin-top:110px;height:100px;margin-bottom:50px}.invite-container .invite-box .invite-p .invite-img{width:30px;height:30px;vertical-align:middle;margin-right:10px;border-radius:50%}.invite-container .invite-box .red-btn{margin-right:20px}.invite-container .invite-box .next-box .next-img{width:40px;height:40px;margin-top:80px;margin-bottom:50px}.invite-container .invite-box .next-box p{margin-bottom:80px}.invite-container .invite-box .next-box a,.invite-container .invite-box .next-box span{color:#8a7fe6!important;font-size:16px;text-decoration:underline}.invite-container .invite-box .next-box span{cursor:pointer}","",{version:3,sources:["D:/Poject/molochDao/src/containers/emailpage/index.less"],names:[],mappings:"AAAA,eACE,kBAAmB,AACnB,gBAAkB,CACnB,AACD,sBACE,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,uCAAyC,AACzC,mCAAqC,AACrC,kCAAoC,AACjC,+BAAiC,AACpC,kBAAmB,AACnB,WAAY,AACZ,gBAAiB,AACjB,cAAgB,CACjB,AACD,mDACE,YAAa,AACb,aAAc,AACd,kBAAoB,CACrB,AACD,6CACE,kBAAoB,CACrB,AACD,8CACE,WAAY,AACZ,YAAa,AACb,eAAgB,AAChB,iBAAmB,CACpB,AACD,gDACE,cAAe,AACf,gBAAiB,AACjB,cAAe,AACf,yBAA2B,CAC5B,AACD,6CACE,YAAa,AACb,aAAc,AACd,kBAAoB,CACrB,AACD,kBAEE,8BAA+B,AAC/B,eAAiB,CAClB,AACD,8BACE,YAAa,AACb,aAAc,AACd,mBAAoB,AACpB,kBAAmB,AACnB,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,uCAAyC,AACzC,mCAAqC,AACrC,kCAAoC,AACjC,+BAAiC,AACpC,kBAAmB,AACnB,cAAgB,CACjB,AACD,wCACE,iBAAkB,AAClB,aAAc,AACd,kBAAoB,CACrB,AACD,oDACE,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,kBAAmB,AACnB,iBAAmB,CACpB,AACD,uCACE,iBAAmB,CACpB,AACD,kDACE,WAAY,AACZ,YAAa,AACb,gBAAiB,AACjB,kBAAoB,CACrB,AACD,0CACE,kBAAoB,CACrB,AAMD,uFAJE,wBAA0B,AAC1B,eAAgB,AAChB,yBAA2B,CAO5B,AALD,6CAIE,cAAgB,CACjB",file:"index.less",sourcesContent:[".email-wrapper {\n  position: relative;\n  min-height: 659px;\n}\n.emailcheck-container {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n     transform: translate(-50%, -50%);\n  text-align: center;\n  width: 4rem;\n  min-width: 400px;\n  font-size: 16px;\n}\n.emailcheck-container .success-email .success-icon {\n  width: 100px;\n  height: 114px;\n  margin-bottom: 25px;\n}\n.emailcheck-container .success-email .addr-p {\n  margin-bottom: 20px;\n}\n.emailcheck-container .success-email .to-icon {\n  width: 20px;\n  height: 20px;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.emailcheck-container .success-email .back-home {\n  display: block;\n  margin-top: 60px;\n  color: #FF7C5C;\n  text-decoration: underline;\n}\n.emailcheck-container .fail-email .fail-icon {\n  width: 100px;\n  height: 100px;\n  margin-bottom: 25px;\n}\n.invite-container {\n  /* autoprefixer: off */\n  height: -webkit-fill-available;\n  background: #fff;\n}\n.invite-container .invite-box {\n  width: 750px;\n  height: 380px;\n  background: #F6F6F6;\n  border-radius: 3px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n     transform: translate(-50%, -50%);\n  text-align: center;\n  font-size: 16px;\n}\n.invite-container .invite-box .invite-p {\n  margin-top: 110px;\n  height: 100px;\n  margin-bottom: 50px;\n}\n.invite-container .invite-box .invite-p .invite-img {\n  width: 30px;\n  height: 30px;\n  vertical-align: middle;\n  margin-right: 10px;\n  border-radius: 50%;\n}\n.invite-container .invite-box .red-btn {\n  margin-right: 20px;\n}\n.invite-container .invite-box .next-box .next-img {\n  width: 40px;\n  height: 40px;\n  margin-top: 80px;\n  margin-bottom: 50px;\n}\n.invite-container .invite-box .next-box p {\n  margin-bottom: 80px;\n}\n.invite-container .invite-box .next-box a {\n  color: #8A7FE6 !important;\n  font-size: 16px;\n  text-decoration: underline;\n}\n.invite-container .invite-box .next-box span {\n  color: #8A7FE6 !important;\n  font-size: 16px;\n  text-decoration: underline;\n  cursor: pointer;\n}\n"],sourceRoot:""}])},1461:function(t,e){t.exports="data:image/png;base64,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"},1462:function(t,e){t.exports="data:image/png;base64,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"},746:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,o=n(0),r=(n.n(o),n(1188)),a=(n.n(r),n(40)),A=n(941),c=n(258),s=n(256),p=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),l=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var A=t.length-1;A>=0;A--)(o=t[A])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},m=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(o,r){function a(t){try{c(i.next(t))}catch(t){r(t)}}function A(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(a,A)}c((i=i.apply(t,e||[])).next())})},h=this&&this.__generator||function(t,e){var n,i,o,r,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:A(0),throw:A(1),return:A(2)},"function"===typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function A(r){return function(A){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,i=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){a=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){a.label=r[1];break}if(6===r[0]&&a.label<o[1]){a.label=o[1],o=r;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(r);break}o[2]&&a.ops.pop(),a.trys.pop();continue}r=e.call(t,a)}catch(t){r=[6,t],i=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,A])}}},u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.state={username:Object(A.a)("username")||"",email:Object(A.a)("email")||"",projId:Object(A.a)("projId")||"",verifyCode:Object(A.a)("verifyCode")||"",verifyRes:null,invateStep:0},e.handleRefuse=function(){return!!e.state.projId&&(e.props.emailcheck.verifyInvify(e.state.username,e.state.email,e.state.projId,e.state.verifyCode,"0"),e.setState({invateStep:2}),!0)},e.handleAgree=function(){return!!e.state.projId&&(e.props.emailcheck.verifyInvify(e.state.username,e.state.email,e.state.projId,e.state.verifyCode,"1"),e.setState({invateStep:1}),!0)},e.handleToGoMyProject=function(){return m(e,void 0,void 0,function(){return h(this,function(t){switch(t.label){case 0:return[4,this.props.common.getLoginStatus()];case 1:return t.sent(),this.props.common.userInfo?this.props.history.push("/personalcenter/myproject"):this.props.history.push("/load/login"),[2]}})})},e}return p(e,t),e.prototype.componentDidMount=function(){this.props.emailcheck.getProInfo(this.state.projId)},e.prototype.componentWillUnmount=function(){this.props.emailcheck.proInfo=null},e.prototype.render=function(){return o.createElement("div",{className:"invite-container"},o.createElement("div",{className:"invite-box"},0===this.state.invateStep&&o.createElement(o.Fragment,null,o.createElement("div",{className:"invite-p"},o.createElement("img",{src:this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.adminHeadIconUrl?this.props.emailcheck.proInfo.adminHeadIconUrl:n(257),alt:"",className:"invite-img"}),o.createElement("strong",null,this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.adminUsername),o.createElement("span",null,"\u9080\u8bf7\u4f60\u52a0\u5165\u9879\u76ee"),o.createElement("strong",null,this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.projName),o.createElement("span",null,"\u7684\u56e2\u961f")),o.createElement(c.a,{text:"\u62d2\u7edd",btnColor:"red-btn",onClick:this.handleRefuse}),o.createElement(c.a,{text:"\u540c\u610f",onClick:this.handleAgree})),1===this.state.invateStep&&o.createElement("div",{className:"next-box"},o.createElement("img",{src:n(1461),alt:"",className:"next-img"}),o.createElement("p",null,"\u4f60\u5df2\u6210\u529f\u52a0\u5165\u9879\u76ee ",o.createElement("strong",null,this.props.emailcheck.proInfo&&this.props.emailcheck.proInfo.projName)),o.createElement("span",{onClick:this.handleToGoMyProject},"\u524d\u5f80\u67e5\u770b")),2===this.state.invateStep&&o.createElement("div",{className:"next-box"},o.createElement("img",{src:n(1462),alt:"",className:"next-img"}),o.createElement("p",null,"\u4f60\u5df2\u62d2\u7edd\u8be5\u9080\u8bf7"),o.createElement("a",{href:"/"},"\u8fd4\u56de\u9996\u9875"))))},e=l([Object(a.b)("emailcheck","common"),a.c],e)}(o.Component);e.default=Object(s.c)(u)},941:function(t,e,n){"use strict";e.a=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);if(null!=n)return unescape(n[2]);return null}}});