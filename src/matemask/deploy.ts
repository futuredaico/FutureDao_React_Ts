import AppManager from './contractJson/AppManager';
import { AbiItem } from "web3-utils";
import { webLink } from "./webLink";
import { IProjectInfoDocument, IContractAddressMgr } from './index.interface.js';

const ContractName = {
  AppManager: "AppManager",
  Co: "Co",
  FdToken: "FdToken",
  GovernShareManager: "GovernShareManager",
  TradeFundPool: "TradeFundPool",
  VoteApplyFund: "Vote_ApplyFund",
  VoteClearing: "Vote_Clearing"
};

const DeployContractFlag = {
  Executing: "4",
  Done: "5",
  Deploying: "6"
};


export default class deploy {
  private address: string;
  constructor(_address: string) {
    this.address = _address;
  }
  public async deployContract(_contractName: string, _sender: string, ..._arguments: any[]) {
    // const abi: JSON[] = ContractJson.get(_contractName).abi;
    const abi: AbiItem[] = AppManager.abi as AbiItem[];
    // const bytecode = ContractJson.get(_contractName).bytecode;
    const bytecode = AppManager.bytecode;
    const contract = new webLink.web3.eth.Contract(abi);
    const ins = await contract
      .deploy({ data: bytecode, arguments: _arguments })
      .send({
        from: _sender,
        gas: 5500000
      });
    return ins.options.address;
  };
  public async createDaicoContract(_projectInfoD: IProjectInfoDocument): Promise<IContractAddressMgr> {
    const contractAddressMgr = new IContractAddressMgr();
    contractAddressMgr.AppManagerAddress = await this.deployContract(ContractName.AppManager, this.address);
    console.log(`AppManagerAddress:${contractAddressMgr.AppManagerAddress}`);
    contractAddressMgr.CoAddress = await this.deployContract(ContractName.Co, this.address, contractAddressMgr.AppManagerAddress, 1000 * Math.pow(10, 9), 0);
    console.log(`CoAddress:${contractAddressMgr.CoAddress}`);
    contractAddressMgr.FdTokenAddress = await this.deployContract(ContractName.FdToken, this.address, contractAddressMgr.AppManagerAddress, _projectInfoD.tokenName, 8, _projectInfoD.tokenSymbol);
    console.log(`FdTokenAddress:${contractAddressMgr.FdTokenAddress}`);
    contractAddressMgr.GovernAddress = await this.deployContract(ContractName.GovernShareManager, this.address, contractAddressMgr.AppManagerAddress, contractAddressMgr.FdTokenAddress);
    console.log(`GovernAddress${contractAddressMgr.GovernAddress}`);
    contractAddressMgr.TradeAddress = await this.deployContract(ContractName.TradeFundPool, this.address, contractAddressMgr.AppManagerAddress, contractAddressMgr.FdTokenAddress, 0, 0, contractAddressMgr.CoAddress);
    console.log(`TradeAddress${contractAddressMgr.TradeAddress}`);
    return contractAddressMgr;
  }

  public async startJob(data) {
    try {
      data.deployContractFlag = DeployContractFlag.Deploying;
      ///// 开始发合约啦
      if (data.type === "daico") {
        console.log(`开始创建daico系列合约:${data.projId}`);
        const contractAddresses = await this.createDaicoContract(data);
        data.contractAddresses = contractAddresses;
        data.deployContractFlag = DeployContractFlag.Done;
        await data.save();
        console.log(`完成创建daico系列合约:${data.projId}`);
      }
      else if (data.type === "gen") {
        console.log(`开始创建gen系列合约:${data.projId}`);
        const contractAddresses = await this.createDaicoContract(data);
        data.contractAddresses = contractAddresses;
        data.deployContractFlag = DeployContractFlag.Done;
        await data.save();
        console.log(`完成创建gen系列合约:${data.projId}`);
      }
    } catch (e) {
      console.log(e);
      data.deployContractFlag = DeployContractFlag.Executing;
      await data.save();
    }
  }
}