import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { toMyNumber } from "@/utils/numberTool";
import { IProjectInfo, IProjectTeam, IDiscussList, IDiscussReplyList, IProjAssetPrice, IProjReward, IProjReserveToken, IContractHash } from '../interface/projectinfo.interface';
import transationStore from './transation.store';

class ProjectInfo
{
  @observable public menuNum = 1; // 菜单切换 1为项目详情，2为留言，3为更新日志，4为交易，5为治理
  @observable public isShowUpdateInfo = false; // 是否显示更新日志详情
  @observable public projInfo: IProjectInfo | null = null; // 项目详情
  @observable public projId: string = ''; // 项目ID
  @observable public projTeamList: IProjectTeam[] = []; // 项目团队列表  
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
  @action public getProjInfo = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProjInfo(projId, common.userId);
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
   * 获取项目的合约hash
   */
  @action public getContractHash = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getProjectContractHash(this.projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.hashList = result[0].data
    return true;
  }
  /**
   * 添加关注
   */
  @action public startAttention = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.startAttention(common.userId, common.token, this.projId);
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
   * 取消关注 
   */
  @action public cancelAttention = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.cancelAttention(common.userId, common.token, this.projId);
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
   * 看好
   */
  @action public startSupport = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.startSupport(common.userId, common.token, this.projId);
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
   * 获取团队信息
   */
  @action public getTeamData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getTeamList(this.projId, 1, 100);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projTeamList = result[0].data.list;
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
  /**
   * 获取项目代币的价格
   */
  @action public getTokenPriceData = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getTokenPrice(this.projId);
    } catch (e)
    {
      this.priceInfo = null;
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      this.priceInfo = null
      return false
    }

    this.priceInfo = result[0].data
    return true;
  }
  /**
   * 获取礼包列表
   */
  @action public getRewardData = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getRewardList("8f3728ed73a240b50dfb12d524eac9df");
    } catch (e)
    {
      this.rewardList = [];
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      this.rewardList = [];
      return false
    }
    const list:IProjReward[] = result[0].data.list.map((item)=>{
      const num = transationStore.computeSpendPriceBuyCount(item.price);
      return {
        ...item,
        rewardPrice:parseInt(num,10)
      }
    });
    this.rewardList = list
    return true;
  }
  /**
   * 获取团队预留代币信息
   */
  @action public getReserveTokenData = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getReserveToken(this.projId);
    } catch (e)
    {
      this.reserveData = null;
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      this.reserveData = null;
      return false
    }
    if (result[0].data.length === 0)
    {
      this.reserveData = null;
      return false
    }
    this.reserveData = result[0].data || null;
    return true;
  }

  /**
   * 计算项目代币当前购买价格
   */
  @action public computeCurrentBuyPrice = async () =>
  {
    if (this.projInfo && this.projInfo.hasIssueAmt !== '0')
    {
      // 10^-9*（发行代币数量+0.5）
      const mycount = toMyNumber(this.projInfo.hasIssueAmt);
      const slope = Math.pow(10, -9);  // 斜率
      const price = web3.toBigNumber(mycount.mul(slope)).toString(10)
      this.buyPrice = price.toString();
    } else
    {
      this.buyPrice = '0'
    }
  }
  /**
   * 计算项目代币当前出售价格
   */
  @action public computeCurrentSellPrice = async () =>
  {
    if (this.projInfo && parseFloat(this.projInfo.hasIssueAmt) !== 0 && parseFloat(this.projInfo.fundReservePoolTotal) !== 0)
    {
      // （2*储备金余额）/发行代币数量*（1-1/（2*发行代币数量））
      // 1.（2*储备金余额）/发行代币数量
      const num1 = toMyNumber(this.projInfo.fundReservePoolTotal).mul(2).div(this.projInfo.hasIssueAmt) 
      // 2.（1-1/（2*发行代币数量）
      const num2 = toMyNumber(1).sub(toMyNumber(1).div(toMyNumber(this.projInfo.hasIssueAmt).mul(2)))
      const price = web3.toBigNumber(num1.mul(num2)).toString(10);
      this.sellPrice = price.toString();
    } else
    {
      this.sellPrice = '0'
    }
  }
}

export default new ProjectInfo();