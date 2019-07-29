// 存储全局变量
import { observable, action } from 'mobx';
import { en_US, zh_CN } from '@/language';
import { ICommonStore, CodeType, IUserInfo } from './interface/common.interface';
import { RcFile } from 'antd/lib/upload';
import * as Api from './api/common.api';
import { notification } from 'antd';
// import web3Tool from '@/utils/web3Tool';
// import { ICommonStore } from './interface/common.interface';

let lang = navigator.language;
lang = lang.substr(0, 2);
class Common implements ICommonStore
{

  @observable public language: string = lang;  // 当前语言
  @observable public message: any | null = null;// 当前显示内容
  @observable public network: 'TestNet' | 'MainNet' = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'TestNet' : 'MainNet';  // 当前网络  
  @observable public footer: boolean = true; // 显示页尾
  @observable public userInfo: IUserInfo|null = null; // 当前邮箱
  @observable public userId: string = ''; // 用户id
  @observable public token: string = ''; // 登录token

  // 初始化语言
  @action public initLanguage = () =>
  {
    const sessionLanguage = sessionStorage.getItem('language');
    if (sessionLanguage)
    {
      this.language = sessionLanguage;
    }
    if (this.language === 'zh')
    {
      this.message = zh_CN;
      return;
    }
    this.message = en_US;
  }
  // 设置语言
  @action public setLanguage = (msg: string) =>
  {
    if (msg === 'zh')
    {
      this.message = zh_CN;
      this.language = 'zh'
    } else
    {
      this.message = en_US;
      this.language = 'en'
    }
  }
  // 上传图片，视频
  @action public uploadFile = async (file: RcFile) =>
  {
    // todo
    try
    {
      return await Api.uploadFile(file);
    } catch (e)
    {
      return false;
    }
  }
  // 登录
  @action public loginFutureDao = async (email: string, pwd: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.login(email, pwd);
    } catch (e)
    {
      this.clearUserInfo();
      return false;
    }
    if (result[0].resultCode === CodeType.success)
    {
      this.userId = result[0].data.userId;
      this.token = result[0].data.accessToken;
      sessionStorage.setItem("user", `{"userId":"${this.userId}","token":"${this.token}"}`);
      this.getUserInfo();
    }
    else{
      return false
    }
    return true;
  }
  // 登出
  @action public logoutFutureDao = () =>
  {
    this.clearUserInfo();
    sessionStorage.clear();
  }
  // 清空用户信息
  @action public clearUserInfo = () => {
    this.userInfo = null;
    this.userId = '';
    this.token = '';
  }
  // 获取用户的基本信息
  @action public getUserInfo = async ()=>{
    let result: any = [];
        try
        {
            result = await Api.getUserInfo(this.userId,this.token);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode === CodeType.success)
        {
            this.userInfo = result[0].data
        }else{
          return false
        }
        return true;
  }
  // 刷新后获取保持登录状态
  @action public getLoginStatus = ()=>{
    const loginStr = sessionStorage.getItem('user');
    console.log(loginStr)
    if(loginStr){
      const json = JSON.parse(loginStr);
      console.log(json);
      this.userId= json.userId;
      this.token = json.token;
      this.getUserInfo();
    }
  }

  // 提示弹框
  @action public openNotificationWithIcon = (type:string,message:string,des:string) => {
    notification[type]({
      message: message,
      description:
        des,
    });
  };
}

// 外部使用require
export default new Common();
