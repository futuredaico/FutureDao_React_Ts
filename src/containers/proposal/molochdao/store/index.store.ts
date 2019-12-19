import { observable, action } from 'mobx';
import * as Api from '../api/index.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochProposalStore } from '../interface/index.interface';
import MetamasktTool from '@/utils/metamasktool';

class MolochProposal implements IMolochProposalStore
{
  @observable public fundHash:string = ''; // 贡献资金的hash
  @observable public fundSymbol:string = ''; // 贡献资金的简称
  
  /**
   * 获取项目基本详情
   */
  @action public getFundData = async (projId: string) =>
  {
    let result: any = [];

    try
    {
      result = await Api.getMoloProjAssetInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.fundHash = result[0].data.fundHash||'';
    this.fundSymbol = result[0].data.fundSymbol||'';
    return true;
  }
  /**
   * 发起提案
   */
  @action public applyProposal = async (addr:string,giveNum:number,requireNum:number,des:string,myaddr:string)=>{
      //
      const contractHash = '0x2df40cccfb741e6bca684544821aaaccef217e46';
        try {
        await MetamasktTool.contractSend( contractHash, 'submitProposal', [addr,giveNum,requireNum,des],{from:myaddr})
        } catch (e) {
        return false;
        }
        return true
  }
}

export default new MolochProposal();