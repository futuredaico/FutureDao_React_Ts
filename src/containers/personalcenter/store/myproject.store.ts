import { observable, action } from 'mobx';
import * as Api from '../api/person.api';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';
import { IProjManagerList, IProjAttentionList } from '../interface/myproject.interface';
class MyProject
{
    @observable public manageCount: number = 0;  // 管理列表总数
    @observable public manageList: IProjManagerList[] = []; // 管理列表
    @observable public managerPage: number = 1;// 管理列表当前页
    @observable public managerPageSize: number = 5; // 管理列表每页条数
    @observable public attentionCount: number = 0;// 关注列表总数
    @observable public attentionList: IProjAttentionList[] = []; // 关注列表
    @observable public attentionPage: number = 1;// 关注列表当前页
    @observable public attentionPageSize: number = 6;// 关注列表每页条数


    /**
     * 获取管理列表
     */
    @action public getManagerData = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getManagerList(common.userId, common.token, this.managerPage,this.managerPageSize);
        } catch (e)
        {
            this.manageCount = 0;
            this.manageList= [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false            
        }
        this.manageCount = result[0].data.count||0;
        this.manageList= result[0].data.list||[];
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
            result = await Api.getAttentionList(common.userId, common.token, this.attentionPage,this.attentionPageSize);
        } catch (e)
        {
            this.attentionCount = 0;
            this.attentionList= [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false            
        } 
        this.attentionCount = result[0].data.count||0;
        this.attentionList= result[0].data.list||[];
        return true;
    }
}

export default new MyProject();