webpackJsonp([13],{740:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var p,t=o(0),a=(o.n(t),o(40)),i=o(790),r=(o.n(i),o(254)),l=o(91),A=this&&this.__extends||(p=function(e,n){return(p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])})(e,n)},function(e,n){function o(){this.constructor=e}p(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),s=this&&this.__decorate||function(e,n,o,p){var t,a=arguments.length,i=a<3?n:null===p?p=Object.getOwnPropertyDescriptor(n,o):p;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,n,o,p);else for(var r=e.length-1;r>=0;r--)(t=e[r])&&(i=(a<3?t(i):a>3?t(n,o,i):t(n,o))||i);return a>3&&i&&Object.defineProperty(n,o,i),i},C=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.intrl=n.props.intl.messages,n.state={projId:""},n}return A(n,e),n.prototype.componentDidMount=function(){this.setState({projId:this.props.match.params.projectId||""})},n.prototype.render=function(){return t.createElement("div",{className:"proposal-content"},t.createElement(l.b,{to:"/proposalv2/apply/"+this.state.projId,className:"type-box-wrapper"},t.createElement("div",{className:"middle-box"},"\u7533\u8bf7\u80a1\u4efd")),t.createElement(l.b,{to:"/proposalv2/kick/"+this.state.projId,className:"type-box-wrapper"},t.createElement("div",{className:"middle-box"},"\u8e22\u51fa\u6210\u5458")),t.createElement(l.b,{to:"/proposalv2/token/"+this.state.projId,className:"type-box-wrapper"},t.createElement("div",{className:"middle-box"},"\u6dfb\u52a0\u652f\u6301\u4ee3\u5e01")))},n=s([Object(a.b)("index","common","metamaskwallet","molochmanager"),a.c],n)}(t.Component);n.default=Object(r.c)(C)},790:function(e,n,o){var p=o(791);"string"===typeof p&&(p=[[e.i,p,""]]);var t={hmr:!1,transform:void 0};o(729)(p,t);p.locals&&(e.exports=p.locals)},791:function(e,n,o){(e.exports=o(728)(!0)).push([e.i,".proposal-page{background:#fff;min-height:659px}.proposal-page .proposal-wrapper{width:750px;margin:0 auto;padding-top:50px}.proposal-page .proposal-top h2{font-size:22px}.proposal-page .proposal-content .type-box-wrapper{margin-top:60px;background:#fff;border:1px solid #e5e5e5;border-radius:3px;margin-right:30px;width:230px;height:190px;display:inline-block;position:relative}.proposal-page .proposal-content .type-box-wrapper .middle-box{font-weight:600;position:absolute;top:50%;left:50%;text-align:center;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.proposal-page .proposal-content .type-box-wrapper:last-child{margin-right:0}.proposal-page .proposal-content .type-box-wrapper:hover{-webkit-box-shadow:0 4px 12px 0 hsla(0,0%,79%,.5);box-shadow:0 4px 12px 0 hsla(0,0%,79%,.5);cursor:pointer}.proposal-page .proposal-content .inline-title{margin-top:60px;margin-bottom:20px}.proposal-page .proposal-content .inline-title strong{font-size:18px}.proposal-page .proposal-content .inline-title .red-type{color:#f1361d;font-size:22px;line-height:24px}.proposal-page .proposal-content .inline-title .tips-text{font-size:12px;color:#b2b2b2}.proposal-page .proposal-content .inline-enter{position:relative}.proposal-page .proposal-content .inline-enter .err-span{color:#f1361d;font-size:12px}.proposal-page .proposal-content .inline-enter .nosize-textarea{resize:none;height:160px!important}.proposal-page .proposal-content .inline-enter .sort-inputtext{width:240px!important}.proposal-page .proposal-content .inline-enter .sort-select{width:140px;display:inline-block;margin-left:15px;vertical-align:top}.proposal-page .proposal-content .inline-enter .ant-input{height:44px;border-radius:3px}.proposal-page .proposal-content .inline-enter .ant-input.err-active{border:1px solid #f1361d}.proposal-page .proposal-content .inline-enter .video-wrapper{position:relative;width:400px}.proposal-page .proposal-content .inline-enter .video-wrapper .video-icon{width:400px;height:250px;background:#000;margin-bottom:10px}.proposal-page .proposal-content .inline-enter .video-wrapper .video-icon video{display:block;max-width:400px;max-height:250px;margin:0 auto}.proposal-page .proposal-content .inline-enter .video-wrapper .video-btn-wrapper{position:absolute;right:0}.proposal-page .proposal-content .inline-enter .video-wrapper .video-btn-wrapper .avatar-uploader{display:inline-block}.proposal-page .proposal-content .inline-enter .video-wrapper .video-btn-wrapper .avatar-uploader .ant-upload{width:80px;height:30px}.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload{width:400px;height:250px}.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload img{width:100%;height:100%}.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload video{max-width:400px;max-height:250px}.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload .ant-upload-text{font-size:16px;font-weight:600;display:inline-block}.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload .small-text{font-size:14px;color:#a0a0a0;display:block;width:300px;margin:0 auto;margin-top:20px}.proposal-page .proposal-content .inline-enter .avatar-uploader.err-active .ant-upload{border:1px solid #f1361d}.proposal-page .proposal-content .inline-enter .textarea-wrapper{width:100%;height:150px;background:#fff;border:1px solid #e5e5e5;border-radius:3px}.proposal-page .proposal-content .inline-enter .textarea-wrapper.err-active{border:1px solid #f1361d}.proposal-page .proposal-content .inline-enter .text-numb{position:absolute;right:15px;top:120px;font-size:14px;color:#b2b2b2}.proposal-page .proposal-content .inline-enter .bf-container{border:1px solid #e5e5e5!important}.proposal-page .proposal-content .inline-enter .bf-container.err-active{border:1px solid #f1361d!important}.proposal-page .proposal-content .inline-enter .bf-controlbar{-webkit-box-shadow:inset 0 -1px 0 0 #e5e5e5!important;box-shadow:inset 0 -1px 0 0 #e5e5e5!important}.proposal-page .proposal-content .inline-enter .bf-content{height:auto;min-height:453px;max-height:953px;overflow:scroll;-webkit-box-sizing:border-box;box-sizing:border-box}.proposal-page .proposal-content .inline-enter .inline-form{display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:20px}.proposal-page .proposal-content .inline-enter .inline-form .form-left{width:180px;line-height:44px}.proposal-page .proposal-content .inline-enter .inline-form .form-left .red-type{color:#f1361d;font-size:16px;line-height:24px}.proposal-page .proposal-content .inline-enter .inline-form .form-right{-webkit-flex:1 1;-ms-flex:1 1;flex:1 1}.proposal-page .proposal-content .inline-enter .inline-table .table-li{height:44px;line-height:44px;display:-webkit-flex;display:-ms-flexbox;display:flex}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-th{-webkit-flex:1 1;-ms-flex:1 1;flex:1 1;color:#b2b2b2}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td{-webkit-flex:1 1;-ms-flex:1 1;flex:1 1;vertical-align:middle}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .people-img{width:30px;height:30px;margin-right:10px;vertical-align:middle;border-radius:50%}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .peo-name{vertical-align:middle}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td.admin-color{color:#8a7fe6}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td.gray-color{color:#b2b2b2}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper{width:90px}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .selected-text{border:none;padding:0}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .selected-text .triangle{position:absolute;right:45px}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .select-box{position:absolute;top:37px}.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .select-box ul .option{line-height:13px}.proposal-page .proposal-content .inline-enter .enter-tips{margin-top:10px;background:#f6f6f6;border-radius:3px;padding:20px;line-height:18px}.proposal-page .proposal-content .inline-enter .smline-span{display:block;margin-bottom:5px}.proposal-page .proposal-content .inline-enter .smline-box{width:360px;display:inline-block;margin-right:30px;margin-bottom:30px}.proposal-page .proposal-content .inline-enter .smline-box .ant-input{width:100%}.proposal-page .proposal-content .inline-enter .smline-box:nth-of-type(2n){margin-right:0}.proposal-page .proposal-content .inline-enter .smline-box:nth-of-type(3),.proposal-page .proposal-content .inline-enter .smline-box:nth-of-type(4){margin-bottom:0;vertical-align:bottom}.proposal-page .proposal-content .inline-enter-btn{text-align:center;margin-top:30px}.proposal-page .proposal-content .inline-btn{margin-top:60px;padding-bottom:90px;text-align:center}","",{version:3,sources:["/Users/yinhuang/demo/FutureDao_React_Ts/src/containers/proposal/molochdao/index.less"],names:[],mappings:"AAAA,eACE,gBAAoB,AACpB,gBAAkB,CACnB,AACD,iCACE,YAAa,AACb,cAAe,AACf,gBAAkB,CACnB,AACD,gCACE,cAAgB,CACjB,AACD,mDACE,gBAAiB,AACjB,gBAAoB,AACpB,yBAA0B,AAC1B,kBAAmB,AACnB,kBAAmB,AACnB,YAAa,AACb,aAAc,AACd,qBAAsB,AACtB,iBAAmB,CACpB,AACD,+DACE,gBAAiB,AACjB,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,kBAAmB,AACnB,uCAAyC,AACzC,mCAAqC,AACrC,kCAAoC,AACpC,8BAAiC,CAClC,AACD,8DACE,cAAgB,CACjB,AACD,yDACE,kDAA0D,AAClD,0CAAkD,AAC1D,cAAgB,CACjB,AACD,+CACE,gBAAiB,AACjB,kBAAoB,CACrB,AACD,sDACE,cAAgB,CACjB,AACD,yDACE,cAAe,AACf,eAAgB,AAChB,gBAAkB,CACnB,AACD,0DACE,eAAgB,AAChB,aAAe,CAChB,AACD,+CACE,iBAAmB,CACpB,AACD,yDACE,cAAe,AACf,cAAgB,CACjB,AACD,gEACE,YAAa,AACb,sBAAyB,CAC1B,AACD,+DACE,qBAAwB,CACzB,AACD,4DACE,YAAa,AACb,qBAAsB,AACtB,iBAAkB,AAClB,kBAAoB,CACrB,AACD,0DACE,YAAa,AACb,iBAAmB,CACpB,AACD,qEACE,wBAA0B,CAC3B,AACD,8DACE,kBAAmB,AACnB,WAAa,CACd,AACD,0EACE,YAAa,AACb,aAAc,AACd,gBAAiB,AACjB,kBAAoB,CACrB,AACD,gFACE,cAAe,AACf,gBAAiB,AACjB,iBAAkB,AAClB,aAAe,CAChB,AACD,iFACE,kBAAmB,AACnB,OAAS,CACV,AACD,kGACE,oBAAsB,CACvB,AACD,8GACE,WAAY,AACZ,WAAa,CACd,AACD,4EACE,YAAa,AACb,YAAc,CACf,AACD,gFACE,WAAY,AACZ,WAAa,CACd,AACD,kFACE,gBAAiB,AACjB,gBAAkB,CACnB,AACD,6FACE,eAAgB,AAChB,gBAAiB,AACjB,oBAAsB,CACvB,AACD,wFACE,eAAgB,AAChB,cAAe,AACf,cAAe,AACf,YAAa,AACb,cAAe,AACf,eAAiB,CAClB,AACD,uFACE,wBAA0B,CAC3B,AACD,iEACE,WAAY,AACZ,aAAc,AACd,gBAAoB,AACpB,yBAA0B,AAC1B,iBAAmB,CACpB,AACD,4EACE,wBAA0B,CAC3B,AACD,0DACE,kBAAmB,AACnB,WAAY,AACZ,UAAW,AACX,eAAgB,AAChB,aAAe,CAChB,AACD,6DACE,kCAAqC,CACtC,AACD,wEACE,kCAAqC,CACtC,AACD,8DACE,sDAAwD,AAChD,6CAAgD,CACzD,AACD,2DACE,YAAa,AACb,iBAAkB,AAClB,iBAAkB,AAClB,gBAAiB,AACjB,8BAA+B,AACvB,qBAAuB,CAChC,AACD,4DACE,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,eAAiB,CAClB,AACD,uEACE,YAAa,AACb,gBAAkB,CACnB,AACD,iFACE,cAAe,AACf,eAAgB,AAChB,gBAAkB,CACnB,AACD,wEACE,iBAAkB,AACd,aAAc,AACV,QAAU,CACnB,AACD,uEACE,YAAa,AACb,iBAAkB,AAClB,qBAAsB,AACtB,oBAAqB,AACrB,YAAc,CACf,AACD,iFACE,iBAAkB,AACd,aAAc,AACV,SAAU,AAClB,aAAe,CAChB,AACD,iFACE,iBAAkB,AACd,aAAc,AACV,SAAU,AAClB,qBAAuB,CACxB,AACD,6FACE,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,sBAAuB,AACvB,iBAAmB,CACpB,AACD,2FACE,qBAAuB,CACxB,AACD,6FACE,aAAe,CAChB,AACD,4FACE,aAAe,CAChB,AACD,iGACE,UAAY,CACb,AACD,gHACE,YAAa,AACb,SAAW,CACZ,AACD,0HACE,kBAAmB,AACnB,UAAY,CACb,AACD,6GACE,kBAAmB,AACnB,QAAU,CACX,AACD,wHACE,gBAAkB,CACnB,AACD,2DACE,gBAAiB,AACjB,mBAAoB,AACpB,kBAAmB,AACnB,aAAc,AACd,gBAAkB,CACnB,AACD,4DACE,cAAe,AACf,iBAAmB,CACpB,AACD,2DACE,YAAa,AACb,qBAAsB,AACtB,kBAAmB,AACnB,kBAAoB,CACrB,AACD,sEACE,UAAY,CACb,AACD,2EACE,cAAgB,CACjB,AAKD,oJACE,gBAAiB,AACjB,qBAAuB,CACxB,AACD,mDACE,kBAAmB,AACnB,eAAiB,CAClB,AACD,6CACE,gBAAiB,AACjB,oBAAqB,AACrB,iBAAmB,CACpB",file:"index.less",sourcesContent:[".proposal-page {\n  background: #FFFFFF;\n  min-height: 659px;\n}\n.proposal-page .proposal-wrapper {\n  width: 750px;\n  margin: 0 auto;\n  padding-top: 50px;\n}\n.proposal-page .proposal-top h2 {\n  font-size: 22px;\n}\n.proposal-page .proposal-content .type-box-wrapper {\n  margin-top: 60px;\n  background: #FFFFFF;\n  border: 1px solid #E5E5E5;\n  border-radius: 3px;\n  margin-right: 30px;\n  width: 230px;\n  height: 190px;\n  display: inline-block;\n  position: relative;\n}\n.proposal-page .proposal-content .type-box-wrapper .middle-box {\n  font-weight: 600;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  text-align: center;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.proposal-page .proposal-content .type-box-wrapper:last-child {\n  margin-right: 0;\n}\n.proposal-page .proposal-content .type-box-wrapper:hover {\n  -webkit-box-shadow: 0 4px 12px 0 rgba(202, 202, 202, 0.5);\n          box-shadow: 0 4px 12px 0 rgba(202, 202, 202, 0.5);\n  cursor: pointer;\n}\n.proposal-page .proposal-content .inline-title {\n  margin-top: 60px;\n  margin-bottom: 20px;\n}\n.proposal-page .proposal-content .inline-title strong {\n  font-size: 18px;\n}\n.proposal-page .proposal-content .inline-title .red-type {\n  color: #F1361D;\n  font-size: 22px;\n  line-height: 24px;\n}\n.proposal-page .proposal-content .inline-title .tips-text {\n  font-size: 12px;\n  color: #B2B2B2;\n}\n.proposal-page .proposal-content .inline-enter {\n  position: relative;\n}\n.proposal-page .proposal-content .inline-enter .err-span {\n  color: #F1361D;\n  font-size: 12px;\n}\n.proposal-page .proposal-content .inline-enter .nosize-textarea {\n  resize: none;\n  height: 160px !important;\n}\n.proposal-page .proposal-content .inline-enter .sort-inputtext {\n  width: 240px !important;\n}\n.proposal-page .proposal-content .inline-enter .sort-select {\n  width: 140px;\n  display: inline-block;\n  margin-left: 15px;\n  vertical-align: top;\n}\n.proposal-page .proposal-content .inline-enter .ant-input {\n  height: 44px;\n  border-radius: 3px;\n}\n.proposal-page .proposal-content .inline-enter .ant-input.err-active {\n  border: 1px solid #F1361D;\n}\n.proposal-page .proposal-content .inline-enter .video-wrapper {\n  position: relative;\n  width: 400px;\n}\n.proposal-page .proposal-content .inline-enter .video-wrapper .video-icon {\n  width: 400px;\n  height: 250px;\n  background: #000;\n  margin-bottom: 10px;\n}\n.proposal-page .proposal-content .inline-enter .video-wrapper .video-icon video {\n  display: block;\n  max-width: 400px;\n  max-height: 250px;\n  margin: 0 auto;\n}\n.proposal-page .proposal-content .inline-enter .video-wrapper .video-btn-wrapper {\n  position: absolute;\n  right: 0;\n}\n.proposal-page .proposal-content .inline-enter .video-wrapper .video-btn-wrapper .avatar-uploader {\n  display: inline-block;\n}\n.proposal-page .proposal-content .inline-enter .video-wrapper .video-btn-wrapper .avatar-uploader .ant-upload {\n  width: 80px;\n  height: 30px;\n}\n.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload {\n  width: 400px;\n  height: 250px;\n}\n.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload img {\n  width: 100%;\n  height: 100%;\n}\n.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload video {\n  max-width: 400px;\n  max-height: 250px;\n}\n.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload .ant-upload-text {\n  font-size: 16px;\n  font-weight: 600;\n  display: inline-block;\n}\n.proposal-page .proposal-content .inline-enter .avatar-uploader .ant-upload .small-text {\n  font-size: 14px;\n  color: #A0A0A0;\n  display: block;\n  width: 300px;\n  margin: 0 auto;\n  margin-top: 20px;\n}\n.proposal-page .proposal-content .inline-enter .avatar-uploader.err-active .ant-upload {\n  border: 1px solid #F1361D;\n}\n.proposal-page .proposal-content .inline-enter .textarea-wrapper {\n  width: 100%;\n  height: 150px;\n  background: #FFFFFF;\n  border: 1px solid #e5e5e5;\n  border-radius: 3px;\n}\n.proposal-page .proposal-content .inline-enter .textarea-wrapper.err-active {\n  border: 1px solid #F1361D;\n}\n.proposal-page .proposal-content .inline-enter .text-numb {\n  position: absolute;\n  right: 15px;\n  top: 120px;\n  font-size: 14px;\n  color: #B2B2B2;\n}\n.proposal-page .proposal-content .inline-enter .bf-container {\n  border: 1px solid #e5e5e5 !important;\n}\n.proposal-page .proposal-content .inline-enter .bf-container.err-active {\n  border: 1px solid #F1361D !important;\n}\n.proposal-page .proposal-content .inline-enter .bf-controlbar {\n  -webkit-box-shadow: inset 0 -1px 0 0 #e5e5e5 !important;\n          box-shadow: inset 0 -1px 0 0 #e5e5e5 !important;\n}\n.proposal-page .proposal-content .inline-enter .bf-content {\n  height: auto;\n  min-height: 453px;\n  max-height: 953px;\n  overflow: scroll;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.proposal-page .proposal-content .inline-enter .inline-form {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 20px;\n}\n.proposal-page .proposal-content .inline-enter .inline-form .form-left {\n  width: 180px;\n  line-height: 44px;\n}\n.proposal-page .proposal-content .inline-enter .inline-form .form-left .red-type {\n  color: #F1361D;\n  font-size: 16px;\n  line-height: 24px;\n}\n.proposal-page .proposal-content .inline-enter .inline-form .form-right {\n  -webkit-flex: 1 1;\n      -ms-flex: 1 1;\n          flex: 1 1;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li {\n  height: 44px;\n  line-height: 44px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-th {\n  -webkit-flex: 1 1;\n      -ms-flex: 1 1;\n          flex: 1 1;\n  color: #B2B2B2;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td {\n  -webkit-flex: 1 1;\n      -ms-flex: 1 1;\n          flex: 1 1;\n  vertical-align: middle;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .people-img {\n  width: 30px;\n  height: 30px;\n  margin-right: 10px;\n  vertical-align: middle;\n  border-radius: 50%;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .peo-name {\n  vertical-align: middle;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td.admin-color {\n  color: #8A7FE6;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td.gray-color {\n  color: #B2B2B2;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper {\n  width: 90px;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .selected-text {\n  border: none;\n  padding: 0;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .selected-text .triangle {\n  position: absolute;\n  right: 45px;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .select-box {\n  position: absolute;\n  top: 37px;\n}\n.proposal-page .proposal-content .inline-enter .inline-table .table-li .table-td .select-wrapper .select-box ul .option {\n  line-height: 13px;\n}\n.proposal-page .proposal-content .inline-enter .enter-tips {\n  margin-top: 10px;\n  background: #F6F6F6;\n  border-radius: 3px;\n  padding: 20px;\n  line-height: 18px;\n}\n.proposal-page .proposal-content .inline-enter .smline-span {\n  display: block;\n  margin-bottom: 5px;\n}\n.proposal-page .proposal-content .inline-enter .smline-box {\n  width: 360px;\n  display: inline-block;\n  margin-right: 30px;\n  margin-bottom: 30px;\n}\n.proposal-page .proposal-content .inline-enter .smline-box .ant-input {\n  width: 100%;\n}\n.proposal-page .proposal-content .inline-enter .smline-box:nth-of-type(2n) {\n  margin-right: 0;\n}\n.proposal-page .proposal-content .inline-enter .smline-box:nth-of-type(3) {\n  margin-bottom: 0;\n  vertical-align: bottom;\n}\n.proposal-page .proposal-content .inline-enter .smline-box:nth-of-type(4) {\n  margin-bottom: 0;\n  vertical-align: bottom;\n}\n.proposal-page .proposal-content .inline-enter-btn {\n  text-align: center;\n  margin-top: 30px;\n}\n.proposal-page .proposal-content .inline-btn {\n  margin-top: 60px;\n  padding-bottom: 90px;\n  text-align: center;\n}\n"],sourceRoot:""}])}});