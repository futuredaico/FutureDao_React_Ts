import { observable, action } from 'mobx';
import * as Api from '../api/project.api';
import * as MolochApi from '@/containers/projectinfo/molochdao/api/moloch.api';
import { CodeType } from '@/store/interface/common.interface';
import { IContractAddress, IOptionList } from '../interface/financing.interface';
import { IFundList } from '@/containers/projectinfo/molochdao/interface/molochinfo.interface';
class FinancingManager
{
  @observable public isStartContract: boolean = false;
  @observable public contractList: IContractAddress[] = [
    {
      id: '1',
      name: '其他',
      projId: ''
    }
  ];
  @observable public molochId: string = '';
  @observable public assetList: IFundList | null = null;
  @observable public assetOption:IOptionList[] = [];

  /**
   * 项目融资时查询参与中的项目组织信息
   */
  @action public getContractList = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getReserverAddress(1, 100);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    const list = result[0].data.list;
    const arrList = list.map((item) =>
    {
      return {
        id: item.molochHash,
        name: item.projName + ' (' + item.molochHash + ')',
        projId: item.projId
      }
    })
    this.contractList = [...arrList, ...this.contractList];
    return true;
  }
  /**
   * 获取多资产
   */
  @action public getMolochAsset = async (projId: string) =>
  {
    let result: any = [];
    this.assetList = null;
    try
    {
      result = await MolochApi.getMolochFundTotal(projId, 1, 10);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.assetList = result[0].data || null;
    if(result[0].data.count>0){
      const list = result[0].data.list;
      const arrList = list.map((item) =>
      {
        return {
          id: item.fundHash,
          name: item.fundSymbol.toLocaleUpperCase() + ' (' + item.fundHash + ')'          
        }
      })
      this.assetOption = [...arrList];
      console.log(JSON.stringify(this.assetOption))
    }
    return true;
  }
}

export default new FinancingManager();