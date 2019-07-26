import { observable, action } from 'mobx';
import * as Api from '../api/person.api';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';
class PersonEdit
{
    @observable public forgetEmailCode = '';
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
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        return true;
    }
    /**
     * 修改邮件
     */
    @action public updateUserEmail = async (email: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.modifyEmail(common.userId, common.token, email);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode === CodeType.success)
        {
            if (common.userInfo)
            {
                common.userInfo.email = email;
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
}

export default new PersonEdit();