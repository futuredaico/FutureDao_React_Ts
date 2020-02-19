import { observable, action } from 'mobx';
import * as Api from '../api/moloch.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochInfo, IProjectMember, IDiscussList, IDiscussReplyList, IFundList, IFundInfo } from '../interface/molochinfo.interface';
import { toMyNumber, toNonExponential } from '@/utils/numberTool';
import { HASH_CONFIG } from '@/config';

class MolochInfo
{
  @observable public menuNum = 1; // 菜单切换 1为项目详情，2为留言，3为治理，4为成员
  @observable public projInfo: IMolochInfo | null = null; // 项目详情
  @observable public projId: string = ''; // 项目ID
  @observable public projMemberList: IProjectMember[] = []; // 项目团队列表(有投票权的）
  @observable public projMemberCount: number = 0; // 团队总数（有投票权的）
  @observable public memberPage: number = 1; // 成员当前页
  @observable public memberPageSize: number = 15; // 成员每页显示个数
  @observable public projDiscussPage: number = 1; // 项目评论当前页
  @observable public projDiscussPageSize: number = 20; // 项目评论每页条数  
  @observable public projUpdateCount: number = 0; // 项目更新日志总数
  @observable public projDiscussList: IDiscussList[] = []; // 项目评论列表
  @observable public isShowManagerInfo = false; // 是否显示治理详情
  @observable public fundTotalList: IFundList | null = null; // 项目所有资产列表
  @observable public projMemberList2: IProjectMember[] = []; // 项目团队列表 （没有投票权的）
  @observable public projMemberCount2: number = 0; // 团队总数（没有投票权的）
  @observable public memberPage2: number = 1; // 成员当前页
  @observable public memberPageSize2: number = 15; // 成员每页显示个数
  @observable public everyFundList: IFundInfo[] = []; // 每种资产的每股价值
  @observable public ethValue: string = ''; // eth的美元价值
  @observable public updateTime:number = 0; // 最新更新时间
  @observable public updatePeople:string = ''; // 最新更新者

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
    this.projInfo = result[0].data || null;
    if (result[0].data.projVersion.includes('1.0'))
    {
      if (this.projInfo)
      {
        this.projInfo.valuePerShare = this.projInfo.shares ? toNonExponential(toMyNumber(this.projInfo.fundTotal).div(this.projInfo.shares).value) : "0";
      }
    } else
    {
      this.getMolochFundTotal(projId);
    }
    return true;
  }
  /**
   * 查询最新更新信息
   */
  @action public getLastUpdateInfo = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getLastUpdate(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.updateTime = result[0].data.lastUpdateTime || 0;
    this.updatePeople = result[0].data.lastUpdatorAddress || '';
    return true;
  }
  /**
   * 获取eth美元价
   */
  @action public getEthValue = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMolochEthPrice();
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.ethValue = result[0].data || null;

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
      result = await Api.getMolochFundTotal(projId, 1, 10);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.getEthValue();
    this.fundTotalList = result[0].data || null;
    this.computeEachAssetValue();
    return true;
  }
  /**
   * 计算每种资产的每股价值
   */
  @action public computeEachAssetValue = () =>
  {
    if (this.fundTotalList)
    {
      let dollarTotal = 0;
      const eachValue = this.fundTotalList.list.map((item: IFundInfo) =>
      {
        if (this.projInfo)
        {
          const eachItem = {
            fundTotal: toNonExponential(toMyNumber(item.fundTotal).div(this.projInfo.shares).value),
            fundHash: item.fundHash,
            fundSymbol: item.fundSymbol
          }
          if (item.fundHash === HASH_CONFIG.ID_WETH)
          {
            dollarTotal = dollarTotal + toMyNumber(item.fundTotal).mul(this.ethValue).value;
          } else if (item.fundHash === HASH_CONFIG.ID_SAI)
          {
            dollarTotal = dollarTotal + parseFloat(item.fundTotal);
          } else if (item.fundHash === HASH_CONFIG.ID_DAI)
          {
            dollarTotal = dollarTotal + parseFloat(item.fundTotal);
          } else if (item.fundHash === HASH_CONFIG.ID_USDF)
          {
            dollarTotal = dollarTotal + parseFloat(item.fundTotal);
          }
          return eachItem
        } else
        {
          return {
            fundTotal: '0',
            fundHash: '',
            fundSymbol: ''
          }
        }
      })
      this.everyFundList = eachValue;
      if (this.projInfo)
      {
        this.projInfo.valuePerShare = this.projInfo.shares ? toNonExponential(toMyNumber(dollarTotal).div(this.projInfo.shares).value) : '0';
      }
    }
  }
  /**
   * 获取成员信息
   */
  @action public getMemberData = async (type: string) =>
  {
    let result: any = [];

    try
    {
      if (type === '1')
      {
        result = await Api.getMemberList(this.projId, this.memberPage, this.memberPageSize, type);
      } else
      {
        result = await Api.getMemberList(this.projId, this.memberPage2, this.memberPageSize2, type);
      }
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    if (type === '1')
    {
      this.projMemberCount = result[0].data.count;
      this.projMemberList = result[0].data.list;
    } else
    {
      this.projMemberCount2 = result[0].data.count;
      this.projMemberList2 = result[0].data.list;
    }
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
      result = await Api.sendMolochDiscussToProj(this.projId, prevousId, discussStr);
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
      result = await Api.sendMolochZanProj(this.projId, discussId);
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