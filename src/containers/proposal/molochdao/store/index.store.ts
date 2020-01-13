import { observable, action } from 'mobx';
import * as Api from '../api/index.api';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochProposalStore } from '../interface/index.interface';
import { AbiItem } from 'web3-utils';
import { Web3Contract } from '@/utils/web3Contract';
import Moloch from '@/utils/Moloch';
import { toMyNumber } from '@/utils/numberTool';
import metamaskwallet from '@/store/metamaskwallet';

class MolochProposal implements IMolochProposalStore
{
  @observable public proposalMenu:number = 0; // 发起提案的菜单选择，0为首页，1为申请，2为踢出，3为添加代币
  @observable public fundHash: string = ''; // 贡献资金的hash
  @observable public fundSymbol: string = ''; // 贡献资金的简称
  @observable public proposalFee:string = ''; // 押金（手续费）
  @observable public fundDecimals:number=0; // 精度

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
    this.fundDecimals = result[0].data.fundDecimals || 0;
    this.proposalFee = result[0].data.proposalDeposit || '';
    return true;
  }
  
  /**
   * 发起提案V1版
   */
  @action public applyProposal = async (contractHash:string,assetHash:string,addr: string, giveNum: number, requireNum: number, des: string, myaddr: string,sendCall:()=>void,confrimCall:()=>void) =>
  {
    // moloch：0x2df40cccfb741e6bca684544821aaaccef217e46
    // usdt:0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7
    // const contractHash = '0x2df40cccfb741e6bca684544821aaaccef217e46';
    try
    {
      const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
      const erc20Contract = new Web3Contract(abi,assetHash);
      const decimals = Math.pow(10,this.fundDecimals);
      console.log(decimals)
      const giveMoney = toMyNumber(giveNum).mul(decimals);
      const giveMoneyNum = parseFloat(giveMoney.toString()) 
      // metamaskwallet.web3.utils.toBN().toArray();
      console.log('giveMoney:'+giveMoneyNum)
      const money = parseFloat(this.proposalFee.toString())+giveMoneyNum;
      console.log('money:'+money);      
      const giveMoneyArray = metamaskwallet.web3.utils.toBN(giveMoneyNum).toArray();
      const requireArray = metamaskwallet.web3.utils.toBN(requireNum).toArray();
      console.log(addr+"-----"+giveMoneyArray.toString()+"-----"+requireArray.toString()+"-----"+des);
      erc20Contract.contractSend("approve",[contractHash,money],{from:myaddr});
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[],contractHash);
      const submitRes = molochContract.contractSend("submitProposal", [addr,giveMoneyArray, requireArray, des], { from: myaddr });
      submitRes.onTransactionHash().then(()=>{sendCall()})
      submitRes.onConfrim().then(res=>{confrimCall()})      
      return true
    } catch (e)
    {
      console.log(e);
      
      return false;
    }
  }
  /**
   * 发起提案V2版-申请股份
   * @param contractHash 合约的hash
   * @param addr 申请人
   * @param requestShare 申请的股份数量
   * @param lootRequest 申请无表决权的股份数量
   * @param payNum 愿意支付的token数量
   * @param payToken 愿意支付哪种token
   * @param requestNum 索要的资产数量
   * @param requestToken 索要的哪种资产
   * @param details 附带信息（提案标题，提案详情）
   * @param myaddr 当前钱包地址
   */
  @action public applyProposalToGetShares = async (contractHash:string,addr: string, requestShare: number,lootRequest:number, payNum: number,payToken:string,requestNum:number,requestToken:string, details: string, myaddr: string,sendCall:()=>void,confrimCall:()=>void) =>
  {
    try
    {
      // const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
      // const erc20Contract = new Web3Contract(abi,assetHash);
      // const decimals = Math.pow(10,this.fundDecimals);
      // console.log(decimals)
      // const giveMoney = toMyNumber(giveNum).mul(decimals);
      // const giveMoneyNum = parseFloat(giveMoney.toString()) 
      // // metamaskwallet.web3.utils.toBN().toArray();
      // console.log('giveMoney:'+giveMoneyNum)
      // const money = parseFloat(this.proposalFee.toString())+giveMoneyNum;
      // console.log('money:'+money);      
      // const giveMoneyArray = metamaskwallet.web3.utils.toBN(giveMoneyNum).toArray();
      // const requireArray = metamaskwallet.web3.utils.toBN(requireNum).toArray();
      // console.log(addr+"-----"+giveMoneyArray.toString()+"-----"+requireArray.toString()+"-----"+des);
      // erc20Contract.contractSend("approve",[contractHash,money],{from:myaddr});
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[],contractHash);
      const submitRes = molochContract.contractSend("SubmitProposal", [addr,requestShare,lootRequest,payNum,payToken,requestNum,requestToken, details], { from: myaddr });
      submitRes.onTransactionHash().then(()=>{sendCall()})
      submitRes.onConfrim().then(res=>{confrimCall()})      
      return true
    } catch (e)
    {
      console.log(e);
      
      return false;
    }
  }
}

export default new MolochProposal();