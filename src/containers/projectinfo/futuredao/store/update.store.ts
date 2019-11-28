import { observable, action } from 'mobx';
import * as Api from '../../api/project.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IDiscussList, IDiscussReplyList } from '../interface/projectinfo.interface';
import projectinfoStore from './projectinfo.store';
import { IProjectUpdate, IProjUpdateInfo } from '../interface/update.interface';

class ProjectUpdate
{
    @observable public projUpdateList: IProjectUpdate[] = []; // 项目更新日志列表
    @observable public updateId: string = ''; // 更新日志ID
    @observable public updateInfo: IProjUpdateInfo | null = null; // 更新日志详情
    @observable public updateDiscussPage: number = 1; // 更新日志评论当前页
    @observable public updateDiscussPageSize: number = 20; // 更新日志评论每页条数
    @observable public updateDiscussList: IDiscussList[] = []; // 更新日志评论列表

    /**
     * 获取更新日志
     */
    @action public getUpdateData = async () =>
    {
        let result: any = [];

        try
        {
            result = await Api.getUpdateList(projectinfoStore.projId, 1, 100);
        } catch (e)
        {
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        projectinfoStore.projUpdateCount = result[0].data.count;
        this.projUpdateList = result[0].data.list;
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
            result = await Api.getUpdateInfoById(projectinfoStore.projId, this.updateId, common.userId);
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
            result = await Api.deleteUpdate(common.userId, common.token, projectinfoStore.projId, this.updateId);
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
            result = await Api.getUpdateDiscussList(this.updateId, discussId, common.userId, this.updateDiscussPage, this.updateDiscussPageSize);
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
        this.updateDiscussList = list;
        // this.updateDiscussList = result[0].data.list;
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
     * 发表更新日志评论
     */
    @action public sendUpdateDiscuss = async (prevousId: string, discussStr: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.sendDiscussToUpdate(common.userId, common.token, projectinfoStore.projId, this.updateId, prevousId, discussStr);
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
            result = await Api.sendZanUpdate(common.userId, common.token, projectinfoStore.projId, this.updateId, discussId);
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
     * 项目更新日志点赞
     */
    @action public sendUpdateZanInfo = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.sendZanUpdateInfo(common.userId, common.token, projectinfoStore.projId, this.updateId);
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

export default new ProjectUpdate();