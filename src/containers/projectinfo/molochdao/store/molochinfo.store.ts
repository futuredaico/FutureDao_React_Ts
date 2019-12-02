import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochInfo, IProjectMember, IDiscussList, IDiscussReplyList, IProjAssetPrice, IProjReward, IProjReserveToken, IContractHash } from '../interface/molochinfo.interface';

class MolochInfo
{
  @observable public menuNum = 1; // 菜单切换 1为项目详情，2为留言，3为更新日志，4为交易，5为治理
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
  @observable public priceInfo: IProjAssetPrice | null = null;
  @observable public rewardList: IProjReward[] = [];
  @observable public reserveData: IProjReserveToken | null = null;
  @observable public buyPrice: string = '0'; // 项目代币当前购买价格
  @observable public sellPrice: string = '0'; // 项目代币当前出售价格
  @observable public hashList:IContractHash[] = [];
  /**
   * 获取项目基本详情
   */
  @action public getMolochProjInfo = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMolochProjInfo(projId, common.userId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projInfo = result[0].data;
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
  @action public getProjDiscussList = async (discussId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getProjDiscussList(this.projId, discussId, common.userId, this.projDiscussPage, this.projDiscussPageSize);
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
  @action public getProjDiscussReplyList = async (childId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getProjDiscussChildList(childId, common.userId, this.projDiscussPage, this.projDiscussPageSize);
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
  @action public sendProjDiscuss = async (prevousId: string, discussStr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.sendDiscussToProj(common.userId, common.token, this.projId, prevousId, discussStr);
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
  @action public sendProZan = async (discussId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.sendZanProj(common.userId, common.token, this.projId, discussId);
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