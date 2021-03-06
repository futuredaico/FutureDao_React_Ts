import { observable, action } from 'mobx'
import { ICreateContent, ICreateProjectStore } from '../interface/createproject.interface';
// import * as Api from '../api/project.api'
// import common from '@/store/common';
import { Web3Contract } from '@/utils/web3Contract';
import { AbiItem } from "web3-utils";
import metamaskwallet from '@/store/metamaskwallet';
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
    emergencyExitWait: 0,       // 如果在此之后仍未处理提案，则直接跳过
    bailoutWait: 0,              // 返还资产等待区间段
    approvedTokens: [],
    createTime: "",
    approvedTokensHash: []
  }
  /**
   * 创建项目
   */
  @action public createProject = async () => {
    try {
      // const 
      // await metamaskwallet.inintWeb3(); // 初始化 web3
      const moloch = this.createContent.version === "1.0" ? require("utils/contractFiles/Moloch.json") : require("utils/contractFiles/Moloch2.json");
      const abi = moloch.abi as AbiItem[];
      const bytecode = moloch.bytecode;
      const summoner = metamaskwallet.metamaskAddress;
      this.createContent.approvedTokens = new Array(this.createContent.approvedTokensHash.length);
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < this.createContent.approvedTokensHash.length; index++) {
        const hash = this.createContent.approvedTokensHash[ index ];
        const asset = await this.getTokenInfo(hash);  // 获得 资产信息 单位 简称
        this.createContent.approvedTokens[ index ] = { hash, symbol: asset.symbol, decimals: parseFloat(asset.decimals) };
      }
      const decimals = Math.pow(10, (this.createContent.approvedTokens[ 0 ].decimals));  // 单位 (8位 100000000 )
      this.createContent.proposalDeposit = toMyNumber(this.createContent.proposalDeposit).mul(decimals).value;
      this.createContent.processingReward = toMyNumber(this.createContent.processingReward).mul(decimals).value;
      this.createContent.approvedDecimals = (this.createContent.approvedTokens[ 0 ].decimals)
      this.createContent.approvedTokenSymbol = this.createContent.approvedTokens[ 0 ].symbol;
      // this.createContent.approvedTokens = [ { hash: this.createContent.approvedTokensHash[ 0 ], symbol: asset.symbol, decimals: asset.decimals } ]
      const variableArray = this.createContent.version === "1.0" ? [ this.createContent.abortWindow ] : [ this.createContent.emergencyExitWait, this.createContent.bailoutWait ]
      // 部署合约
      const deployResult = await Web3Contract.deployContract(
        abi, bytecode, metamaskwallet.metamaskAddress,
        summoner,
        this.createContent.version === "1.0" ? this.createContent.approvedTokensHash[ 0 ] : this.createContent.approvedTokensHash,
        this.createContent.periodDuration,
        this.createContent.votingPeriodLength,
        this.createContent.gracePeriodLength,
        ...variableArray,   // 解构参数
        metamaskwallet.web3.utils.toBN(this.createContent.proposalDeposit).toArray(), // 将number类型通过 bignumber转换成 uint256类型
        this.createContent.dilutionBound,
        metamaskwallet.web3.utils.toBN(this.createContent.processingReward).toArray() // 将number类型通过 bignumber转换成 uint256类型
      );
      // 得到交易id 判断已经进入加载状态，修改状态 createStatus = 1
      const txid = await deployResult.onTransactionHash();
      this.createStatus = 1;
      const newContactInstance = await deployResult.promise;  // 合约部署成功后获得新的合约对象
      const contractAddress = newContactInstance.options.address;
      const newContract = new Web3Contract(abi, contractAddress, newContactInstance);
      const guildBankAddress = await newContract.contractCall("guildBank"); // 获得 bank合约hash
      console.log("transactionBlockTimeout", newContactInstance.transactionBlockTimeout);
      console.log("transactionConfirmationBlocks", newContactInstance.transactionConfirmationBlocks);
      console.log("transactionPollingTimeout", newContactInstance.transactionPollingTimeout);
      const txinfo = await metamaskwallet.web3.eth.getTransaction(txid);
      if (txinfo.blockHash) {
        const blockInfo = await metamaskwallet.web3.eth.getBlock(txinfo.blockHash)
        this.createContent.createTime = blockInfo.timestamp.toString();
        console.log("block timestamp", blockInfo.timestamp);
      }

      const result = await saveContractInfo(this.createContent, summoner, contractAddress, guildBankAddress, txid); // 上传项目信息给服务端
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

  @action public getTokenInfo = async (token: string): Promise<{ symbol: string, decimals: string }> => {
    await metamaskwallet.inintWeb3(); // 初始化 web3
    const abi = require("utils/contractFiles/ERC20.json") as AbiItem[];
    const contract = new Web3Contract(abi, token);
    const symbol = await contract.contractCall("symbol");
    const decimals = await contract.contractCall("decimals");
    return { symbol, decimals }
  }

}

export default new CreateProject();