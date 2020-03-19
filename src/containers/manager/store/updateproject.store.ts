import { action, observable } from 'mobx';
import * as Api from '../api/project.api'
import { CodeType } from '@/store/interface/common.interface';
import { IUpdateInfo, IUpdateList } from '../interface/updateproject.interface';

class CreateProject
{
  @observable public updateType: number = 1; // 1表示管理列表，2表示查看更新,3表示修改更新,4表示发布更新
  @observable public updateInfo: IUpdateInfo | null = null;
  @observable public updatePage: number = 1;
  @observable public updateSize: number = 15;
  @observable public updateCount: number = 0;
  @observable public updateList: IUpdateList[] = [];

  /**
   * 获取更新日志列表
   */
  @action public getUpdateList = async (projId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUpdateList(projId, this.updatePage, this.updateSize);
    } catch (e)
    {
      this.updateCount = 0;
      this.updateList = []
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.updateCount = result[0].data.count || 0;
    this.updateList = result[0].data.list || [];
    return true;
  }
  /**
   * 发布更新
   */
  @action public sendUpdate = async (projId: string, title: string, detail: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.sendUpdate(projId, title, detail);
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
   * 获取更新日志详情
   */
  @action public getUpdateInfo = async (projId: string, updateId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUpdateInfoById(projId, updateId);
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
   * 修改更新日志详情
   */
  @action public modifyUpdateInfo = async (projId: string, updateId: string, title: string, detail: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.modifyUpdate(projId, updateId, title, detail);
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
   * 删除更新
   */
  @action public deleteUpdate = async (projId: string, updateId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.deleteUpdate(projId, updateId);
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

export default new CreateProject();