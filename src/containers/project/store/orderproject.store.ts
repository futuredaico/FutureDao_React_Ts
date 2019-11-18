import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import { CodeType } from '@/store/interface/common.interface';
import common from '@/store/common';
import project from './project.store';
import { IOrderProjectList, IOrderProjectDetail } from '../interface/orderproject.interface';
class OrderProject
{
    @observable public orderMenu:number = 0;
    @observable public isShowOprojInfo: boolean = false; // 是否显示详情页
    @observable public orderProjCount: number = 0;  // 列表总数
    @observable public orderProjPage: number = 1;  
    @observable public orderProjPageSize: number = 5;
    @observable public orderProjList:IOrderProjectList[] = [];   // 订单列表
    @observable public orderProjDetail:IOrderProjectDetail|null = null; // 订单详情
    @observable public exportLink:string = '';
    @observable public buyName:string = '';   // 买家名称
    @observable public orderStr:string= '';   // 订单编号
    @observable public sendType:number= 0;    // 订单类型（传入接口的）
    @observable public orderType:string = '0' // 订单类型，（示）
    /**
     * 获取订单列表
     */
    @action public getOrderProjectList = async (sendFlag:number,buyName:string,orderStr:string,sendType:number) =>
    {
        let result: any = [];
        try
        {
            result = await Api.getProjOrderList(common.userId, common.token,project.projId, this.orderProjPage, this.orderProjPageSize,sendFlag,buyName,orderStr,sendType);
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
    /**
     * 导出收货人信息
     */
    @action public exportFile = async (projId: string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.exportOrderFile(common.userId, common.token, projId);
        } catch (e)
        {

            return false;
        }
        if (result[0].resultCode !== CodeType.success)
        {
            return false
        }
        this.exportLink = result[0].data.fileUrl || '';
        return true;
    }
    /**
     * 发货
     */
    @action public sendGoods = async (projId: string,orderId:string,note:string) =>
    {
        let result: any = [];
        try
        {
            result = await Api.confirmSendGoods(common.userId, common.token, projId,orderId,note);
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

export default new OrderProject();