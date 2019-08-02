import {action, observable} from 'mobx';
import * as Api from '../api/email.api'
import { CodeType } from '@/store/interface/common.interface';
import { ISimpleInfo } from '../interface/emailcheck.interface';
class EmailCheck{
  @observable public proInfo:ISimpleInfo|null=null;
  @action public verifyRegister = async (username:string,email:string,code:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.verifyRegister(username,email,code);
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
  @action public verifyInvify = async (username:string,email:string,projId:string,code:string,res:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.verifyInvite(username,email,projId,code,res);
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
  @action public getProInfo = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.proInfo = result[0].data
    return true;
  }
}

export default new EmailCheck();