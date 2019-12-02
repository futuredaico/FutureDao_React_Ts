import { observable, action } from 'mobx';
import * as Api from '../api/home.api'
import { IHomeStore, IMolochProjList } from '../interface/home.interface';
import { CodeType } from '@/store/interface/common.interface';
// import { toThousands } from '@/utils/numberTool'

class Home implements IHomeStore
{
    @observable public projListCount: number = 0;  // 项目总数
    @observable public projList:IMolochProjList[] = []; // 项目列表
    @observable public projListPage:number = 1; // 当前页码
    @observable public projListPageSize:number = 12; // 每页显示条数

    // @action public getProjList = async () =>
    // {
    //   let result: any = [];
    //   try
    //   {
    //     result = await Api.getProjList(this.projListPage,this.projListPageSize);
    //   } catch (e)
    //   {
    //     return false;
    //   }
    //   if (result[0].resultCode !== CodeType.success)
    //   {
    //     return false
    //   }
    //   this.projListCount = result[0].data.count;
    //   this.projList = result[0].data.list;
    //   return true;
    // }
    @action public getMolochProjList = async () =>
    {
      let result: any = [];
      try
      {
        result = await Api.getMolochProjList(this.projListPage,this.projListPageSize);
      } catch (e)
      {
        return false;
      }
      if (result[0].resultCode !== CodeType.success)
      {
        return false
      }
      this.projListCount = result[0].data.count;
      this.projList = result[0].data.list;
      return true;
    }
}
export default new Home();