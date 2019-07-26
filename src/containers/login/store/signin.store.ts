import { observable, action } from 'mobx';
import * as Api from '../api/login.api';
import { CodeType } from '@/store/interface/common.interface';
class SignIn
{
    @observable public usernameCode = '';
    @observable public emailCode = '';
    @observable public pwdCode = ''

    /**
     * 检测用户名
     */
    @action public checkUsername = async (username: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.checkUsername(username);
        } catch (e)
        {
            this.usernameCode = '';
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            this.usernameCode = result[0].resultCode;
            return false
        }
        return true;
    }
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
            this.emailCode = '';
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            this.emailCode = result[0].resultCode;
            return false           
        }
        return true;
    }
    /**
     * 注册
     */
    @action public registerUser = async (username: string, email: string, pwd: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.register(username, email, pwd);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            if (result[0].resultCode === CodeType.invalidUsername || result[0].resultCode === CodeType.usernameHasRegisted)
            {
                this.usernameCode = result[0].resultCode
            }
            else if (result[0].resultCode === CodeType.invalidEmail || result[0].resultCode === CodeType.emailHasRegisted)
            {
                this.emailCode = result[0].resultCode
            }
            else
            {
                this.pwdCode = result[0].resultCode
            }
            return false
        }
        return true;
    }
}

export default new SignIn();