// 存储全局变量
import { observable, action } from 'mobx';
import { en_US, zh_CN } from '@/language';
import { ICommonStore, CodeType, IUserInfo } from './interface/common.interface';
import { RcFile } from 'antd/lib/upload';
import * as Api from './api/common.api';
import { notification } from 'antd';
// import * as Cookie from '@/utils/cookie';
import notificationBtn from '../components/notificationbtn';
import metamaskwallet from './metamaskwallet';
import { MetaMaskNetworkCode } from './interface/metamaskwallet.interface';

let lang = navigator.language;
lang = lang.substr(0, 2);
class Common implements ICommonStore {

  @observable public language: string = lang;  // 当前语言
  @observable public message: any | null = null;// 当前显示内容
  @observable public network: 'TestNet' | 'MainNet' = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'TestNet' : 'MainNet';  // 当前网络  
  @observable public footer: boolean = true; // 显示页尾
  @observable public userInfo: IUserInfo | null = null; // 当前个人用户信息
  @observable public userId: string = ''; // 用户id
  @observable public token: string = ''; // 登录token
  @observable public isLoginoutFlag:boolean = false; // 是否登出

  // 初始化语言
  @action public initLanguage = () => {
    const sessionLanguage = localStorage.getItem('futuredaolang');
    if (sessionLanguage) {
      this.language = sessionLanguage;
    }
    if (this.language === 'zh') {
      this.message = zh_CN;
      return;
    }
    this.message = en_US;
  }
  // 设置语言
  @action public setLanguage = (msg: string) => {
    if (msg === 'zh') {
      this.message = zh_CN;
      this.language = 'zh'
    } else {
      this.message = en_US;
      this.language = 'en'
    }
  }
  // 上传图片
  @action public uploadFile = async (file: RcFile) => {
    // todo
    let result: any = [];
    try {
      result = await Api.uploadFile(file);
    } catch (e) {
      return '';
    }
    return result
  }
  // 上传视频
  @action public uploadVideo = async (file: RcFile) => {
    // todo
    let result: any = [];
    try {
      result = await Api.uploadVideo(file);
    } catch (e) {
      return '';
    }
    return result
  }
  // 登录
  @action public loginFutureDao = async () => {
    const res = await metamaskwallet.inintWeb3();
    console.log("网络状态:"+process.env.REACT_APP_SERVER_ENV)
    // 是主网版本时
    if(process.env.REACT_APP_SERVER_ENV !== 'DEV'){
      // 不是主网网络
      if (metamaskwallet.metamaskNetwork !== MetaMaskNetworkCode.Mainnet) {
        if (this.language === 'en') {
          this.openNotificationWithIcon('error', 'Login failed', 'Please set Metamask to mainnet and try again.');
        } else {
          this.openNotificationWithIcon('error', '登陆失败', '请将Metamask切换至主网后重试');
        }
        return false
      }
    }
    console.log(res)
    if (res) {
      // 获取随机数，进行签名
      let result: any = [];
      try {
        result = await Api.getLoginNonce(metamaskwallet.metamaskAddress);
      } catch (e) {
        return false;
      }
      if (result[0].resultCode === CodeType.success) {
        const data = result[0].data.nonceStr;
        console.log("待签名数据",data);
        console.log("签名地址",metamaskwallet.metamaskAddress)

        metamaskwallet.web3.eth.personal.sign(data, metamaskwallet.metamaskAddress,"password").then((value: string) => {
          //
          console.log("签名结果",value)
          this.loginCheck(value)
        })
      }else{
        if (this.language === 'en') {
          this.openNotificationWithIcon('error', 'Operation fail', 'Requests are too frequent, please try again in 30 seconds');
        } else {
          this.openNotificationWithIcon('error', '操作失败', '请求过于频繁，请30秒之后在试');
        }
      }
      // sign(dataToSign: string, address: string | number, callback?: (error: Error, signature: string) => void): Promise<string>;
    }
    return true;
  }
  // 验证登陆
  @action public loginCheck = async (data: string) => {
    let result: any = [];
    try {
      result = await Api.validateLogin(metamaskwallet.metamaskAddress, data);
    } catch (e) {
      return false;
    }
    console.log(result)
    if (result[0].resultCode === CodeType.success) {
      // this.userId = result[0].data.userId;
      // this.token = result[0].data.accessToken;

      // sessionStorage.setItem("user", `{"userId":"${this.userId}","token":"${this.token}"}`);
      // Cookie.setCookie("user", this.userId);
      // Cookie.setCookie("token", this.token);
      // this.getLoginStatus();
      window.location.reload();
    }
    else {
      return false
    }
    return true
  }
  // 登出
  @action public logoutFutureDao = async() => {
    let result: any = [];
    try {
      result = await Api.loginOut();
    } catch (e) {
      return false;
    }
    console.log(result)
    this.clearUserInfo();
    if(process.env.REACT_APP_SERVER_ENV === 'DEV'){
      window.location.href = '/test'
    }else{
      window.location.href = "/";
    }    
    return true
  }
  // 清空用户信息
  @action public clearUserInfo = () => {
    this.userInfo = null;
    this.userId = '';
    this.token = '';
  }
  // 获取用户的基本信息
  @action public getUserInfo = async () => {
    let result: any = [];
    try {
      result = await Api.getUserInfo();
    } catch (e) {
      return false;
    }
    if (result[0].resultCode === CodeType.success) {
      if (Object.keys(result[0].data).length === 0) {
        this.userInfo = null;
        return false
      }else{
        this.userInfo = result[0].data;
      }
      
    } else {
      this.userInfo = null;
      return false
    }
    return true;
  }
  // 刷新后获取保持登录状态
  @action public getLoginStatus = () => {
    // const loginStr = sessionStorage.getItem('user');
    // const user = Cookie.getCookie("userId");
    // const token = Cookie.getCookie("accessToken");
    // if (user && token) {
    //   // const json = JSON.parse(loginStr);
    //   this.userId = user;
    //   this.token = token;      
    // }
    this.getUserInfo();
  }

  // 右上角提示弹框4.5秒消失
  @action public openNotificationWithIcon = (type: string, message: string, des: string, btnText?: string, callback?: () => void) => {
    const options = {
      message: message,
      description: des,
    }
    if (btnText && callback) {
      options['btn'] = notificationBtn(btnText, callback)
    }
    notification[type](options);
  };
  // 重新发送验证邮件
  @action public reSendEmail = async () => {
    let result: any = [];
    try {
      result = await Api.reSendVerify(this.userId, this.token);
    } catch (e) {
      return false;
    }
    if (result[0].resultCode === CodeType.success) {
      if (this.language === 'en') {
        this.openNotificationWithIcon('success', 'Operation successful', 'Email sent, please check it.');
      } else {
        this.openNotificationWithIcon('success', '操作成功', '邮件已发送，请注意查收');
      }
    } else {
      if (this.language === 'en') {
        this.openNotificationWithIcon('error', 'Operation failed', 'Sending email failed, please retry later');
      } else {
        this.openNotificationWithIcon('error', '操作失败', '邮件发送失败，请稍后再试');
      }
    }
    return true
  }
}

// 外部使用require
export default new Common();
