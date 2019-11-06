import { observable, action } from 'mobx';
import * as Api from '../api/person.api';
import {checkEmail} from '../../login/api/login.api';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';
class PersonEdit
{
    @observable public newEmailCode = '';  // 邮箱显示错误码提示
    @observable public newPwdCode = '';   //  密码修改错误码显示

    
    /**
     * 修改用户头像
     */
    @action public updateUserImg = async (imgStr: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.modifyUserIcon(common.userId, common.token, imgStr);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode === CodeType.success)
        {
            if (common.userInfo)
            {
                common.userInfo.headIconUrl = imgStr;
            }
            else
            {
                return false
            }
        } else
        {
            return false
        }
        return true;
    }
    /**
     * 修改用户简介
     */
    @action public updateUserBrief = async (str: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.modifyUserBrief(common.userId, common.token, str);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode === CodeType.success)
        {
            if (common.userInfo)
            {
                common.userInfo.brief = str;
            }
            else
            {
                return false
            }
        } else
        {
            return false
        }
        return true;
    }
    /**
     * 修改用户密码
     */
    @action public updatePwd = async (pwd: string, newPwd: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.modifyPassword(common.userId, common.token, pwd, newPwd);
        } catch (e)
        {
            this.newPwdCode = '';
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            this.newPwdCode = result[0].resultCode;
            return false
        }
        return true;
    }
    /**
     * 修改邮件
     */
    @action public updateUserEmail = async (email: string,pwd:string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.modifyEmail(common.userId, common.token, email,pwd);
        } catch (e)
        {
            this.newEmailCode = '';
            return false;
        }
        if (result[0].resultCode === CodeType.success)
        {
            common.getUserInfo();
        } else
        {
            this.newEmailCode = result[0].resultCode;
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
            result = await checkEmail(email);
        } catch (e)
        {
            this.newEmailCode = '';
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            this.newEmailCode = result[0].resultCode;
            return false           
        }
        return true;
    }
    @action public bindWalletAddress = async (type:string,address:string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.bindAddress(common.userId, common.token, type,address);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode === CodeType.success)
        {
            common.getUserInfo();
        } else
        {
            return false
        }
        return true;
    }
}

export default new PersonEdit();