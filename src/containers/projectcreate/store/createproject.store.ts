import { observable, action } from 'mobx'
import { ICreateContent, ICreateProjectStore } from '../interface/createproject.interface';
// import * as Api from '../api/project.api'
// import common from '@/store/common';
import { Web3Contract } from '@/utils/web3Contract';
import { AbiItem } from "web3-utils";
import metamaskwallet from '@/store/metamaskwallet';
import Moloch from '@/utils/Moloch';
import { toMyNumber } from '@/utils/numberTool';
import { saveContractInfo } from '../api/project.api';
class CreateProject implements ICreateProjectStore {
  @observable public createStatus = 0; // 创建项目的状态 0 是编辑状态 1是发布中 2是发布成功 3是发布失败
  @observable public projectID = "";     // 创建项目成功后得到的项目ID
  @observable public createContent: ICreateContent = {
    version: '',                // 版本
    projectName: '',            // 项目名称
    projectBrief: '',           // 项目简介
    projectDetail: '',          // 文本编辑内容 详情
    projectConverUrl: '',          // 项目封面URL
    officialWebUrl: '',
    approvedToken: '',          // 允许交易的token
    approvedTokenSymbol: '',
    approvedDecimals: 0,
    periodDuration: (process.env.REACT_APP_SERVER_ENV === 'DEV') ? 120 : 17280,         // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
    votingPeriodLength: 5,     // 投票有多少个区间段
    gracePeriodLength: 5,      // 公示有多少个区间段
    abortWindow: 2,            // 撤回投票的窗口期
    proposalDeposit: 0,        // 提议的押金
    dilutionBound: 3,          // 如果出现大规模混乱，投赞成票的选民将有义务支付最高乘数
    processingReward: 0,       // 处理提案的人所得到的奖励
  }
  /**
   * 创建项目
   */
  @action public createProject = async () => {
    try {
      await metamaskwallet.inintWeb3(); // 初始化 web3
      const abi = Moloch.abi as AbiItem[];
      const bytecode = Moloch.bytecode;
      const summoner = metamaskwallet.metamaskAddress;
      const asset = await this.getTokenInfo(this.createContent.approvedToken);  // 获得 资产信息 单位 简称
      const decimals = Math.pow(10, parseFloat(asset.decimals));  // 单位 (8位 100000000 )
      this.createContent.proposalDeposit = toMyNumber(this.createContent.proposalDeposit).mul(decimals).value;
      this.createContent.processingReward = toMyNumber(this.createContent.processingReward).mul(decimals).value;
      this.createContent.approvedDecimals = parseFloat(asset.decimals)
      this.createContent.approvedTokenSymbol = asset.symbol;
      // 部署合约
      const deployResult = await Web3Contract.deployContract(
        abi, bytecode, metamaskwallet.metamaskAddress,
        summoner,
        this.createContent.approvedToken,
        this.createContent.periodDuration,
        this.createContent.votingPeriodLength,
        this.createContent.gracePeriodLength,
        this.createContent.abortWindow,
        this.createContent.proposalDeposit,
        this.createContent.dilutionBound,
        this.createContent.processingReward
      );
      // 得到交易id 判断已经进入加载状态，修改状态 createStatus = 1
      const txid = await deployResult.onTransactionHash();
      this.createStatus = 1;
      console.log('txid', txid);
      const newContactInstance = await deployResult.promise;  // 合约部署成功后获得新的合约对象
      const contractAddress = newContactInstance.options.address;
      const newContract = new Web3Contract(abi, contractAddress, newContactInstance);
      const guildBankAddress = await newContract.contractCall("guildBank"); // 获得 bank合约hash
      const result = await saveContractInfo(this.createContent, summoner, contractAddress, guildBankAddress); // 上传项目信息给服务端
      console.log(result);
      if (result && result[ 0 ] && result[ 0 ].resultCode === "00000") {
        this.projectID = result[ 0 ].data.projId;
        this.createStatus = 2;
      }
      else {
        this.createStatus = 3;
        return false;
      }
    } catch (e) {
      // 判断异常是不是用户拒绝了交易 Metamask 错误码 4001
      if (e.code === 4001) {
        this.createStatus = 0;
      } else {
        this.createStatus = 3;
      }
      return false;
    }
    return true;
  }

  @action public getTokenInfo = async (token: string) => {
    await metamaskwallet.inintWeb3();
    const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
    const contract = new Web3Contract(abi, token);
    const symbol = await contract.contractCall("symbol");
    const decimals = await contract.contractCall("decimals");
    return { symbol, decimals }
  }

}

export default new CreateProject();