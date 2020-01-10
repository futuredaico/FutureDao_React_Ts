import { observable, action } from 'mobx';
import * as Api from '../api/moloch.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochInfo, IProjectMember, IDiscussList, IDiscussReplyList, IFundList } from '../interface/molochinfo.interface';
// import { toMyNumber, toNonExponential } from '@/utils/numberTool';

class MolochInfo
{
  @observable public menuNum = 1; // 菜单切换 1为项目详情，2为留言，3为治理，4为成员
  @observable public isShowUpdateInfo = false; // 是否显示更新日志详情
  @observable public projInfo: IMolochInfo | null = null; // 项目详情
  @observable public projId: string = ''; // 项目ID
  @observable public projMemberList: IProjectMember[] = []; // 项目团队列表  
  @observable public memberPage:number = 1; // 成员当前页
  @observable public memberPageSize:number = 15; // 成员每页显示个数
  @observable public projDiscussPage: number = 1; // 项目评论当前页
  @observable public projDiscussPageSize: number = 20; // 项目评论每页条数  
  @observable public projUpdateCount: number = 0; // 项目更新日志总数
  @observable public projDiscussList: IDiscussList[] = []; // 项目评论列表
  @observable public isShowManagerInfo = false; // 是否显示治理详情
  @observable public fundTotalList:IFundList|null = null; // 项目所有资产列表
  /**
   * 获取项目基本详情
   */
  @action public getMolochProjInfo = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMolochProjInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projInfo = result[0].data||null;
    // if(this.projInfo){
    //   this.projInfo.valuePerShare = this.projInfo.shares?toNonExponential(toMyNumber(this.projInfo.fundTotal).div(this.projInfo.shares).value):"0";
    // }
    
    return true;
  }
  /**
   * 获取多资产
   */
  @action public getMolochFundTotal = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMolochFundTotal(projId,1,10);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.fundTotalList = result[0].data||null;
    console.log(this.fundTotalList)
    // if(this.projInfo){
    //   this.projInfo.valuePerShare = this.projInfo.shares?toNonExponential(toMyNumber(this.projInfo.fundTotal).div(this.projInfo.shares).value):"0";
    // }
    
    return true;
  }
  /**
   * 获取成员信息
   */
  @action public getMemberData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMemberList(this.projId, this.memberPage, this.memberPageSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projMemberList = result[0].data.list;
    return true;
  }
  /**
   * 获取项目评论列表
   */
  @action public getMolochDiscussList = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getMolochDiscussList(this.projId, this.projDiscussPage, this.projDiscussPageSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }

    const list = result[0].data.list.map((item: IDiscussList) =>
    {
      return {
        ...item,
        isShowReply: false,
        childredList: []
      }
    })
    this.projDiscussList = list;
    return true;
  }
  /**
   * 获取项目评论回复列表
   */
  @action public getMolochDiscussReplyList = async (childId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getMolochDiscussChildList(childId, this.projDiscussPage, this.projDiscussPageSize);
    } catch (e)
    {
      return [];
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return []
    }
    const list = result[0].data.list.map((item: IDiscussReplyList) =>
    {
      return {
        ...item,
        isShowReply: false
      }
    })
    return list;
  }
  /**
   * 发表项目评论
   */
  @action public sendMolochDiscuss = async (prevousId: string, discussStr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.sendMolochDiscussToProj( this.projId, prevousId, discussStr);
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
   * 项目评论点赞
   */
  @action public sendMolochZan = async (discussId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.sendMolochZanProj( this.projId, discussId);
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
}

export default new MolochInfo();