import { observable, action } from 'mobx'
import { ICreateContent, ICreateProjectStore } from '../interface/createproject.interface';
// import * as Api from '../api/project.api'
// import common from '@/store/common';
import { Web3Contract } from '@/utils/web3Contract';
import { AbiItem } from "web3-utils";
import metamaskwallet from '@/store/metamaskwallet';
import Moloch from '@/utils/Moloch';
import { toMyNumber } from '@/utils/numberTool';
class CreateProject implements ICreateProjectStore {
  @observable public createStatus = 0; // 创建项目的状态 0 是编辑状态 1是发布中 2是发布成功 3是发布失败
  @observable public createContent: ICreateContent = {
    version: '',                // 版本
    projectName: '',            // 项目名称
    projectBrief: '',           // 项目简介
    projectDetail: '',          // 文本编辑内容 详情
    projConverUrl: '',          // 项目封面URL
    approvedToken: '',          // 允许交易的token
    periodDuration: 120,         // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
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
      const res = await metamaskwallet.inintWeb3();
      console.log(res);
      this.createStatus = 1;
      console.log(this.createStatus);
      const abi = Moloch.abi as AbiItem[];
      const bytecode = Moloch.bytecode;
      const summoner = metamaskwallet.metamaskAddress;
      const asset = await this.getTokenInfo(this.createContent.approvedToken);
      const decimals = Math.pow(10, parseFloat(asset.decimals));
      // console.log(metamaskwallet.web3.utils.toBN('1'));
      // console.log(metamaskwallet.web3.utils.toBN(1));
      // console.log(metamaskwallet.web3.utils.toBN(1).mul(metamaskwallet.web3.utils.toBN(1000)));

      // console.log(metamaskwallet.web3.utils.toBN(1).muln(100));
      // console.log(metamaskwallet.web3.utils.toBN(1).muln(100000000)); // 乘以100000000会失败

      const proposalDeposit = toMyNumber(this.createContent.proposalDeposit).mul(decimals);
      const processingReward = toMyNumber(this.createContent.processingReward).mul(decimals);

      const newContractInstance = await Web3Contract.deployContract(
        abi, bytecode, metamaskwallet.metamaskAddress,
        summoner,
        this.createContent.approvedToken,
        this.createContent.periodDuration,
        this.createContent.votingPeriodLength,
        this.createContent.gracePeriodLength,
        this.createContent.abortWindow,
        proposalDeposit.value,
        this.createContent.dilutionBound,
        processingReward.value
      );
      console.log(newContractInstance.options.address);
      this.createStatus = 2;
      // result = await Api.createProj(params);
    } catch (e) {
      this.createStatus = 3;
      return false;
    }
    // if (result[ 0 ].resultCode !== CodeType.success) {
    //   return false
    // }
    // this.createContent.projId = result[ 0 ].data.projId
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