import { observable, action } from 'mobx';
import * as Api from '../api/moloch.api';
import common from '@/store/common';
import { CodeType } from '@/store/interface/common.interface';
import { IMolochProposalList, IMolochProposalDetail, IVoteInfo, IContractInfo, IContractHash } from '../interface/molochmanager.interface';
import { Web3Contract } from '@/utils/web3Contract';
import { AbiItem } from 'web3-utils';
import Moloch from '@/utils/Moloch';
import metamaskwallet from '@/store/metamaskwallet';

class IMolochManager
{
  @observable public proposalMenuNum: string = '1'; // 菜单切换 1为正式提案，0为预发布提案
  @observable public proposalPage: number = 1;
  @observable public proposalPageSize: number = 10;
  @observable public proposalList: IMolochProposalList[] = []; // 提案列表
  @observable public proposalCount: number = 0; // 提案总数
  @observable public proposalInfo: IMolochProposalDetail | null = null; // 提案详情
  @observable public proposalIndex: string = ""; // 提案索引
  @observable public proposalBalance: number = 0; // 当前地址的项目占股数量
  @observable public proposalAddress: string = ''; // 委托人给谁了
  @observable public upAddress: string = ''; // 被谁委托了
  @observable public upBalance: number = 0; // 委托人的股数
  @observable public contractInfo: IContractInfo | null = null;// 合约相关数据
  @observable public voteInfo: IVoteInfo = {
    voteCount: '0',
    voteType: '',
    balance: '0'
  }

  /**
   * 获取提案列表
   */
  @action public getMolochProposalList = async (projId: string) =>
  {
    let result: any = [];
    const addr = common.userInfo ? common.userInfo.address : '';
    try
    {
      result = await Api.getProposalList(projId, this.proposalPage, this.proposalPageSize, addr,this.proposalMenuNum);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.proposalCount = result[0].data.count || 0;
    this.proposalList = result[0].data.list || []
    return true;
  }

  /**
   * 获取提案详情
   */
  @action public getMolochProposalDetail = async (projId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getProposalDetail(projId, this.proposalIndex);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.proposalInfo = result[0].data || null;
    if (this.proposalInfo)
    {
      // this.proposalInfo.proposalDetail = result[0].data.proposalDetail.replace(/\\n/gi, "<br/>").replace(/↵/gi,"<br/>");
      this.proposalInfo.proposalDetail = result[0].data.proposalDetail.replace(/(\\n|\n)/gi, "<br/>").
        replace(/((https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/gi, '<a href="$1" target="_blank">$1</a>')
      console.log(this.proposalInfo.proposalDetail)
    }

    return true;
  }
  /**
   * 获取委托人，股份数量
   */
  @action public getTokenBalance = async (projId: string, addr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getTokenBalance(projId, addr);
    } catch (e)
    {
      this.proposalBalance = 0;
      this.proposalAddress = ''
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.proposalBalance = result[0].data.balance || 0;
    this.proposalAddress = result[0].data.newDelegateKey || ''

    return true;
  }
  /**
   * 获取该提案的投票详情
   */
  @action public getVoteData = async (projId: string, proposalIndex: string, addr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getVoteInfo(projId, proposalIndex, addr);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.voteInfo = result[0].data
    return true;
  }
  /**
   * 获取项目合约相关数据
   */
  @action public getContractInfo = async (projId: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getContractInfo(projId);
    } catch (e)
    {
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.contractInfo = result[0].data || null;
    return true;
  }
  /**
   * 获取委托人的地址，股数
   */
  @action public getUpStreamData = async (projId: string, addr: string) =>
  {
    let result: any = [];
    try
    {
      result = await Api.getUpStreamInfo(projId, addr);
    } catch (e)
    {
      this.upBalance = 0;
      this.upAddress = ''
      return false;
    }
    if (result[0].resultCode !== CodeType.success)
    {
      return false
    }
    this.upBalance = result[0].data.upBalance || 0;
    this.upAddress = result[0].data.upAddress || '';
    return true
  }
  /**
   * 权限委托
   */
  @action public changeDelegateKey = async (addr: string, myaddr: string) =>
  {
    // moloch：0x2df40cccfb741e6bca684544821aaaccef217e46
    // usdt:0x38e5ccf55d19e54e8c4fbf55ff81462727ccf4e7
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[], contractHash);
      const submitRes = molochContract.contractSend("updateDelegateKey", [addr], { from: myaddr });
      console.log(submitRes)
      await submitRes.onTransactionHash();
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 投赞同票
   */
  @action public applyYesVote = async (proposalIndex: string, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {

      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[], contractHash);
      const res = await molochContract.contractCall("getCurrentPeriod");
      console.log("赞同票")
      console.log(JSON.stringify(res));
      const res2 = await molochContract.contractCall("proposalQueue",[index]);
      console.log(res2)
      const submitRes = molochContract.contractSend("submitVote", [indexArr, 1], { from: myaddr });
      console.log(submitRes)
      await submitRes.onTransactionHash();
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 投反对票
   */
  @action public applyNoVote = async (proposalIndex: string, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {
      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[], contractHash);
      console.log("反对票")
      const res = await molochContract.contractCall("getCurrentPeriod");
      console.log(JSON.stringify(res));
      const res2 = await molochContract.contractCall("proposalQueue",[index]);
      console.log(res2)
      const submitRes = molochContract.contractSend("submitVote", [indexArr, 2], { from: myaddr })
      console.log(submitRes)
      await submitRes.onTransactionHash();
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 处理提案
   */
  @action public processProposal = async (proposalIndex: string, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    console.log(contractHash)
    try
    {
      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      console.log(indexArr.toString())
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[], contractHash);
      const submitRes = molochContract.contractSend("processProposal", [indexArr], { from: myaddr });
      const subtxid = await submitRes.onTransactionHash();
      console.log(subtxid)
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 退出股数
   */
  @action public quitShares = async (value: number, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {
      const valueArr =  metamaskwallet.web3.utils.toBN(value).toArray();
      const molochContract = new Web3Contract(Moloch.abi as AbiItem[], contractHash);
      const submitRes = molochContract.contractSend('ragequit', [valueArr], { from: myaddr });
      const subtxid = await submitRes.onTransactionHash();
      console.log(subtxid);
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 发布正式提案--V2版
   */
  @action public sponsorProposal = async (proposalIndex: string, myaddr: string,assetHash:string,depositNum:string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    console.log(contractHash)
    try
    {
      // 数据转换
      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      console.log(indexArr.toString())
      // 先aprove押金      
      const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
      const erc20Contract = new Web3Contract(abi,assetHash);      
      erc20Contract.contractSend("approve",[contractHash,depositNum],{from:myaddr});
      // 批准正式提案
      const molochv2Abi = require('@/utils/contractFiles/Moloch2.json').abi as AbiItem[];
      const molochContract = new Web3Contract(molochv2Abi, contractHash);
      const submitRes = molochContract.contractSend("sponsorProposal", [indexArr], { from: myaddr });
      const subtxid = await submitRes.onTransactionHash();
      console.log(subtxid)
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 投赞同票
   */
  @action public applyYesVoteV2 = async (proposalIndex: string, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {

      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      const molochv2Abi = require('@/utils/contractFiles/Moloch2.json').abi as AbiItem[];
      const molochContract = new Web3Contract(molochv2Abi, contractHash);
      const res = await molochContract.contractCall("getCurrentPeriod");
      console.log("赞同票")
      console.log(JSON.stringify(res));
      const res2 = await molochContract.contractCall("proposalQueue",[index]);
      console.log(res2)
      const submitRes = molochContract.contractSend("submitVote", [indexArr, 1], { from: myaddr });
      console.log(submitRes)
      await submitRes.onTransactionHash();
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 投反对票
   */
  @action public applyNoVoteV2 = async (proposalIndex: string, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {
      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      const molochv2Abi = require('@/utils/contractFiles/Moloch2.json').abi as AbiItem[];
      const molochContract = new Web3Contract(molochv2Abi, contractHash);
      console.log("反对票")
      const res = await molochContract.contractCall("getCurrentPeriod");
      console.log(JSON.stringify(res));
      const res2 = await molochContract.contractCall("proposalQueue",[index]);
      console.log(res2)
      const submitRes = molochContract.contractSend("submitVote", [indexArr, 2], { from: myaddr })
      console.log(submitRes)
      await submitRes.onTransactionHash();
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 处理提案
   */
  @action public processProposalV2 = async (proposalIndex: string, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    console.log(contractHash)
    try
    {
      const index = parseInt(proposalIndex, 10);
      const indexArr = metamaskwallet.web3.utils.toBN(index).toArray();
      console.log(indexArr.toString())
      const molochv2Abi = require('@/utils/contractFiles/Moloch2.json').abi as AbiItem[];
      const molochContract = new Web3Contract(molochv2Abi, contractHash);
      const submitRes = molochContract.contractSend("processProposal", [indexArr], { from: myaddr });
      const subtxid = await submitRes.onTransactionHash();
      console.log(subtxid)
    } catch (e)
    {
      return false;
    }
    return true
  }
  /**
   * 退出股数
   */
  @action public quitSharesV2 = async (value: number, myaddr: string) =>
  {
    if (!this.contractInfo)
    {
      return false
    }
    let contractHash = '';
    this.contractInfo.contractHashs.map((item: IContractHash) =>
    {
      if (item.name === 'moloch')
      {
        contractHash = item.hash
      }
    })
    if (!contractHash)
    {
      return false
    }
    try
    {
      const valueArr =  metamaskwallet.web3.utils.toBN(value).toArray();
      const molochv2Abi = require('@/utils/contractFiles/Moloch2.json').abi as AbiItem[];
      const molochContract = new Web3Contract(molochv2Abi, contractHash);
      const submitRes = molochContract.contractSend('ragequit', [valueArr], { from: myaddr });
      const subtxid = await submitRes.onTransactionHash();
      console.log(subtxid);
    } catch (e)
    {
      return false;
    }
    return true
  }
}

export default new IMolochManager();