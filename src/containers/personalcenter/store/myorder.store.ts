import { observable, action } from 'mobx';
import * as Api from '../api/person.api';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';
import { IOrderDetail } from '../interface/myorder.interface';
class MyOrder
{
    @observable public isShowInfo: boolean = false; // 是否显示详情页
    @observable public orderCount: number = 0;  // 列表总数
    @observable public orderPage: number = 1;  
    @observable public orderPageSize: number = 5;
    @observable public orderList = [];   // 订单列表
    @observable public timeSet: NodeJS.Timer | null = null; // 倒计时定时器
    @observable public orderDetail: IOrderDetail | null = null; // 订单详情

    /**
     * 获取订单列表
     */
    @action public getMyOrderList = async () =>
    {
        let result: any = [];
        try
        {
            result = await Api.getMyorderList(common.userId, common.token, this.orderPage, this.orderPageSize);
        } catch (e)
        {
            this.orderCount = 0;
            this.orderList = [];
            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.orderCount = result[0].data.count || 0;
        this.orderList = result[0].data.list || [];
        return true;
    }
    /**
     * 获取订单详情
     */
    @action public getMyOrderDetail = async (projId: string, orderId: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.getMyorderDetail(common.userId, common.token, projId, orderId);
        } catch (e)
        {

            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.orderDetail = result[0].data || null;
        return true;
    }
}

export default new MyOrder();