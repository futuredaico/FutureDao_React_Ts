import { observable, action } from 'mobx';
import * as Api from '../api/index.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochProposalStore } from '../interface/index.interface';
// import {TransactionReceipt} from 'web3-core'
// import MetamasktTool from '@/utils/metamasktool';
// import metamaskwallet from '@/store/metamaskwallet';
import { AbiItem } from 'web3-utils';
import { Web3Contract } from '@/utils/web3Contract';
import Moloch from '@/utils/Moloch';
// import metamaskwallet from '@/store/metamaskwallet';

class MolochProposal implements IMolochProposalStore
{
  @observable public fundHash: string = ''; // 贡献资金的hash
  @observable public fundSymbol: string = ''; // 贡献资金的简称

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
    this.fundHash = result[0].data.fundHash || '';
    this.fundSymbol = result[0].data.fundSymbol || '';
    return true;
  }
  /**
   * 发起提案
   */
  @action public applyProposal = async (addr: string, giveNum: number, requireNum: number, des: string, myaddr: string,confrimCall:any) =>
  {
    // moloch：0x2df40cccfb741e6bca684544821aaaccef217e46
    // usdt:0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7
    const contractHash = '0x2df40cccfb741e6bca684544821aaaccef217e46';
    console.log([addr, giveNum, requireNum, des]);
    console.log({ from: myaddr, to: contractHash, value: giveNum })
    try
    {
      const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
      const erc20Contract = new Web3Contract(abi,"0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7");
      const result = erc20Contract.contractSend("approve",[myaddr,20],{from:myaddr})
      const txid = await result.onTransactionHash();
      console.log(txid);
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[],contractHash);
      const submitRes = molochContract.contractSend("submitProposal", [addr,giveNum, requireNum, des], { from: myaddr })
      submitRes.onConfrim()
      .then(res=>{confrimCall()})
      const subtxid = await submitRes.onTransactionHash();
      console.log(subtxid);
      return true
      // await MetamasktTool.contractSend(contractHash, 'approve', [addr,giveNum, requireNum, des], { from: myaddr })
      // await MetamasktTool.contractSend(contractHash, 'submitProposal', [addr,giveNum, requireNum, des], { from: myaddr })
    } catch (e)
    {
      return false;
    }
  }
}

export default new MolochProposal();