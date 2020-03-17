import { observable, action } from 'mobx';
import * as Api from '../api/person.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMyprojectList } from '../interface/myproject.interface';
class MyProject
{
    @observable public manageCount: number = 0;  // 管理列表总数
    @observable public manageList: IMyprojectList[] = []; // 管理列表
    @observable public managerPage: number = 1;// 管理列表当前页
    @observable public managerPageSize: number = 6; // 管理列表每页条数
    @observable public attentionCount: number = 0;// 关注列表总数
    @observable public attentionList: IMyprojectList[] = []; // 关注列表
    @observable public attentionPage: number = 1;// 关注列表当前页
    @observable public attentionPageSize: number = 6;// 关注列表每页条数
    @observable public joinCount: number = 0;  // 参与列表总数
    @observable public joinList: IMyprojectList[] = []; // 参与列表
    @observable public joinPage: number = 1;// 参与列表当前页
    @observable public joinPageSize: number = 6; // 参与列表每页条数

    /**
     * 参与
     */
    @action public getAtJoinData = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getAtJoinList(this.joinPage, this.joinPageSize);
        } catch (e)
        {
            this.joinCount = 0;
            this.joinList = [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.joinCount = result[0].data.count || 0;
        this.joinList = result[0].data.list || [];
        return true;
    }
    /**
     * 获取管理列表
     */
    @action public getManagerData = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getManagerList(this.managerPage, this.managerPageSize);
        } catch (e)
        {
            this.manageCount = 0;
            this.manageList = [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.manageCount = result[0].data.count || 0;
        this.manageList = result[0].data.list || [];
        return true;
    }
    /**
     * 获取关注列表
     */
    @action public getAttentionData = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getAttentionList(this.attentionPage, this.attentionPageSize);
        } catch (e)
        {
            this.attentionCount = 0;
            this.attentionList = [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.attentionCount = result[0].data.count || 0;
        this.attentionList = result[0].data.list || [];
        return true;
    }
    /**
     * 获取列表计数
     */
    @action public getSomethingCount = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getMangeProjCount();
        } catch (e)
        {
            this.attentionCount = 0;
            this.manageCount = 0;
            this.joinCount = 0;
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.attentionCount = result[0].data.starCount || 0;
        this.manageCount = result[0].data.manageCount || 0;
        this.joinCount = result[0].data.joinCount || 0;
        return true;
    }
}

export default new MyProject();