// 存储全局变量
import { observable, action } from 'mobx';
import { en_US, zh_CN } from '@/language';
import { ICommonStore, CodeType, IUserInfo, EmailVerify } from './interface/common.interface';
import { RcFile } from 'antd/lib/upload';
import * as Api from './api/common.api';
import { notification } from 'antd';

let lang = navigator.language;
lang = lang.substr(0, 2);
class Common implements ICommonStore
{

  @observable public language: string = lang;  // 当前语言
  @observable public message: any | null = null;// 当前显示内容
  @observable public network: 'TestNet' | 'MainNet' = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'TestNet' : 'MainNet';  // 当前网络  
  @observable public footer: boolean = true; // 显示页尾
  @observable public userInfo: IUserInfo | null = null; // 当前邮箱
  @observable public userId: string = ''; // 用户id
  @observable public token: string = ''; // 登录token
  @observable public isVerifyEmail: boolean = false; // 是否验证过邮箱,true为未认证（显示），false为不显示

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
      return null;
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
    else
    {
      return false
    }
    return true;
  }
  // 登出
  @action public logoutFutureDao = () =>
  {
    this.clearUserInfo();
    sessionStorage.clear();
    window.location.href = "/"
  }
  // 清空用户信息
  @action public clearUserInfo = () =>
  {
    this.userInfo = null;
    this.userId = '';
    this.token = '';
    this.isVerifyEmail = false;
  }
  // 获取用户的基本信息
  @action public getUserInfo = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUserInfo(this.userId, this.token);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode === CodeType.success)
    {
      this.userInfo = result[0].data;
      if (result[0].data.emailVerifyState !== EmailVerify.detailStringEmailVerifySucc)
      {
        this.isVerifyEmail = true;
      } else
      {
        this.isVerifyEmail = false;
      }
    } else
    {
      return false
    }
    return true;
  }
  // 刷新后获取保持登录状态
  @action public getLoginStatus = () =>
  {
    const loginStr = sessionStorage.getItem('user');
    console.log(loginStr)
    if (loginStr)
    {
      const json = JSON.parse(loginStr);
      console.log(json);
      this.userId = json.userId;
      this.token = json.token;
      this.getUserInfo();
    }
  }

  // 右上角提示弹框4.5秒消失
  @action public openNotificationWithIcon = (type: string, message: string, des: string) =>
  {
    notification[type]({
      message: message,
      description:
        des,
    });
  };
  // 重新发送验证邮件
  @action public reSendEmail = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.reSendVerify(this.userId, this.token);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode === CodeType.success)
    {
      this.openNotificationWithIcon('success', '操作成功', '邮箱已发送，请注意查看');
    }else{
      this.openNotificationWithIcon('error', '操作失败', '邮箱发送失败，请稍后在试');
    }
    return true
  }
}

// 外部使用require
export default new Common();
