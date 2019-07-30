import { observable, action } from 'mobx'
import { ICreateContent } from '../interface/createproject.interface';
import * as Api from '../api/project.api'
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
class CreateProject
{
  @observable public step = 1;
  @observable public stepOneStatus = 1;// 基础信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepTwoStatus = 0; // 详细信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public stepThreeStatus = 0; // 详细信息完成状态，0不可编辑，1正在编辑，2已编辑完成，3为常规可编辑
  @observable public createContent: ICreateContent = {
    projId: '',
    projName: '',
    projTitle: '',
    projType: '',
    projCoverUrl: '',
    projBrief: '',
    videoBriefUrl: '',
    projDetail: '',
    connectEmail: '',
    officialWeb: '',
    community: ''
  }

  @action public createProject = async () =>
  {
    let result: any = [];
    const params: string[] = [
      common.userId,
      common.token,
      this.createContent.projName,
      this.createContent.projTitle,
      this.createContent.projType,
      this.createContent.projCoverUrl,
      this.createContent.projBrief,
      this.createContent.videoBriefUrl,
      this.createContent.projDetail,
      this.createContent.connectEmail,
      this.createContent.officialWeb,
      this.createContent.community
    ]
    try
    {
      result = await Api.createProj(params);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.createContent.projId = result[0].data.projId
    return true;
  }
  @action public modifyProject = async (params: string[]) =>
  {
    let result: any = [];

    try
    {
      result = await Api.modifyProj(params);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    return true;
  }
  @action public getProject = async (projId:string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProj(common.userId,common.token,projId);
    } catch (e)
    {
      return false;
    }
    console.log(result)
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.createContent = result[0].data;
    this.stepTwoStatus=3;
    this.stepThreeStatus=3;
    if(this.createContent.projDetail){
      this.stepTwoStatus=2
    }
    if(this.createContent.connectEmail){
      this.stepThreeStatus=2
    }
    return true;
  }
}

export default new CreateProject();