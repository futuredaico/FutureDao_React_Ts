import { observable, action } from 'mobx';
import * as Api from '../api/login.api';
import { CodeType } from '@/store/interface/common.interface';
class ForgetPwd
{
  @observable public forgetEmailCode = '';
  @observable public resetPwdCode ='';
  /**
   * 检测邮箱
   */
  @action public checkEmail = async (email: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.checkEmail(email);
    } catch (e)
    {
      this.forgetEmailCode = '';
      return false;
    }
    this.forgetEmailCode = result[0].resultCode;    
    return true;
  }
  /**
   * 重置密码
   */
  @action public resetPassword = async (email: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.resetPassword(email);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    return true;
  }
  /**
   * 验证重置密码
   */
  @action public verifyResetPassword = async (username:string,email:string,pwd:string,code:string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.verifyReset(username,email,pwd,code);
    } catch (e)
    {
      return false;
    }
    this.resetPwdCode = result[0].resultCode;
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    return true;
  }
}

export default new ForgetPwd();