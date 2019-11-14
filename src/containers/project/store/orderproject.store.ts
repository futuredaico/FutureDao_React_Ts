import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';
import project from './project.store';
class OrderProject
{
    @observable public isShowOprojInfo: boolean = false; // 是否显示详情页
    @observable public orderProjCount: number = 0;  // 列表总数
    @observable public orderProjPage: number = 1;  
    @observable public orderProjPageSize: number = 5;
    @observable public orderProjList = [];   // 订单列表
    @observable public orderProjDetail = null; // 订单详情

    /**
     * 获取订单列表
     */
    @action public getOrderProjectList = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getProjOrderList(common.userId, common.token,project.projId, this.orderProjPage, this.orderProjPageSize);
        } catch (e)
        {
            this.orderProjCount = 0;
            this.orderProjList = [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.orderProjCount = result[0].data.count || 0;
        this.orderProjList = result[0].data.list || [];
        return true;
    }
    /**
     * 获取订单详情
     */
    @action public getOrderProjectDetail = async (projId: string, orderId: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.getProjOrderDetail(common.userId, common.token, projId, orderId);
        } catch (e)
        {

            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.orderProjDetail = result[0].data || null;
        return true;
    }
}

export default new OrderProject();