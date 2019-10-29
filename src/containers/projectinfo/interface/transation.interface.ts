import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IProjectTransationStore
{
  projContractInfo: IProjectContractInfo | null, // 合约详情
  historyPrice:IHistoryPrice, // 历史价格的数据
  transList:ITransationList[],// 交易列表
  transCount:number,// 交易总数
  transPage:number,// 当前页
  transPageSize:number, // 每页条数
  hash:string,
  totalSupply:string,
  storeEth:string,
  fndBalances:string,      // fnd的余额
  tokenBalanceInfo:ITokenBanlance,
  getProjContractInfoData: () => Promise<boolean>, // 获取合约详情数据
  getHistoryData:(type:string)=>Promise<boolean>, // 获取历史价格的数据
  getTxListData:(addr:string)=>Promise<boolean>,  // 获取交易记录
  getTokenBalance:(addr:string)=>Promise<boolean>, // 获取奖金池的数据  
  buy:(amount: string)=>void,
  sell:(amount: string)=>void,
  getBuyFndCountFromEther:(amount: string)=>Promise<IAssetCount>,
  getPayEtherFromFndCount:(count: string)=>Promise<IAssetPrice>,
  getFndCountFromSellEther:(amount: string)=>Promise<IAssetCount>,
  getSellEtherFromFndCount:(count: string)=>Promise<IAssetPrice>
}


export interface IProjectInfoProps extends RouteComponentProps<{ projectId: string }>
{
  transation: IProjectTransationStore,
  common: ICommonStore,
  intl: any
}

export interface IAssetCount {
  count:string,
  price:string
}
export interface IAssetPrice{
  amount:string,
  price:string
}

export interface IProjectContractInfo
{
  projId: string,
  tokenName: string,    // 项目代币名称
  tokenIssueTotal: string,  // 发行总额
  tokenUnlockNotAmount: string,  // 未解锁总额
  tokenUnlockYesAmount: string,  // 已解锁总额
  fundManagePoolTotal: string,  // 治理池金额
  fundReservePoolTotal: string,  // 储备池总额
  fundReserveRatio: string,  // 存储金比例
  priceRaiseSpeed: string  // 价格增速
}

export interface IHistoryPrice
{
  buyInfo: [],
  sellInfo: [],
  timeInfo: [],
}
export interface ITransationList{
  fundAmt:string,  // 资金
  tokenAmt:string,  //  代币数
  blockNumber:number,     // 区块高度
  transactionHash:string, // 交易ID
  address:string,   // 操作地址
  event:string,   // 操作
  blockTime:number // 交易时间
}
export interface ITokenBanlance{
  tokenAmt:number,
  shareAmt:number,
  availableAmt:number,
  lockAmt:number,
  chg24h:number,
  lastBuyPrice:number,
  lastSellPrice:number,
}