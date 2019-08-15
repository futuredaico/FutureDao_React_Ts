import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IProjectInfo, IProjectUpdate, IProjectTeam, IProjUpdateInfo, IDiscussList, IDiscussReplyList } from '../interface/projectinfo.interface';
class ProjectInfo
{
  @observable public menuNum = 1; // 菜单切换 1为项目详情，2为留言，3为更新日志
  @observable public isShowUpdateInfo = false; // 是否显示更新日志详情
  @observable public projInfo: IProjectInfo | null = null; // 项目详情
  @observable public projId: string = ''; // 项目ID
  @observable public projTeamList: IProjectTeam[] = []; // 项目团队列表  
  @observable public projDiscussPage: number = 1; // 项目评论当前页
  @observable public projDiscussPageSize: number = 20; // 项目评论每页条数  
  @observable public projUpdateCount: number = 0; // 项目更新日志总数
  @observable public projUpdateList: IProjectUpdate[] = []; // 项目更新日志列表
  @observable public updateId: string = ''; // 更新日志ID
  @observable public updateInfo: IProjUpdateInfo | null = null; // 更新日志详情
  @observable public updateDiscussPage: number = 1; // 更新日志评论当前页
  @observable public updateDiscussPageSize: number = 20; // 更新日志评论每页条数
  @observable public projDiscussList: IDiscussList[] = []; // 项目评论列表
  @observable public projDiscussReplyList: IDiscussReplyList[] = []; // 项目评论列表回复列表
  @observable public updateDiscussList: IDiscussList[] = []; // 更新日志评论列表
  @observable public updateDiscussReplyList: IDiscussReplyList[] = [];

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
    console.log(this.projInfo)
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
   * 获取更新日志
   */
  @action public getUpdateData = async () =>
  {
    let result: any = [];

    try
    {
      result = await Api.getUpdateList(this.projId, 1, 100);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projUpdateCount = result[0].data.count;
    this.projUpdateList = result[0].data.list;
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
   * 获取更新日志详情
   */
  @action public getUpdateInfo = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUpdateInfoById(this.projId, this.updateId, common.userId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.updateInfo = result[0].data;
    return true;
  }
  /**
   * 删除更新日志
   */
  @action public deletUpdateInfo = async () =>
  {
    let result: any = [];
    try
    {
      result = await Api.deleteUpdate(common.userId, common.token, this.projId, this.updateId);
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

    this.projDiscussList = result[0].data.list;
    this.projDiscussList = this.projDiscussList.map((item: IDiscussList) =>
    {
      return {
        ...item,
        isShowReply: false
      }
    })
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
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.projDiscussReplyList = result[0].data.list;
    this.projDiscussReplyList = this.projDiscussReplyList.map((item: IDiscussReplyList) =>
    {
      return {
        ...item,
        isShowReply: false
      }
    })
    return true;
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
   * 获取更新日志评论
   */
  @action public getUpdateDiscussList = async (discussId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUpdateDiscussList(this.projId, discussId, common.userId, this.updateDiscussPage, this.updateDiscussPageSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.updateDiscussList = result[0].data.list;
    return true;
  }
  /**
   * 获取更新日志二级评论
   */
  @action public getUpdateDiscussReplyList = async (childId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUpdateDiscussChildList(childId, common.userId, this.updateDiscussPage, this.updateDiscussPageSize);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.updateDiscussReplyList = result[0].data.list;
    this.updateDiscussReplyList = this.updateDiscussReplyList.map((item: IDiscussReplyList) =>
    {
      return {
        ...item,
        isShowReply: false
      }
    })
    return true;
  }
  /**
   * 发表更新日志评论
   */
  @action public sendUpdateDiscuss = async (prevousId: string, discussStr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.sendDiscussToUpdate(common.userId, common.token, this.projId, this.updateId, prevousId, discussStr);
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
   * 项目更新日志评论点赞
   */
  @action public sendUpdateZan = async (discussId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.sendZanUpdate(common.userId, common.token, this.projId, this.updateId, discussId);
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

export default new ProjectInfo();