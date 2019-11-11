import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IProjectTransationStore
{
  tradeMenu:number, // 1为资金池，2为买入，3为卖出
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
  buy:(addr:string,count: string,amount:string)=>Promise<boolean>,
  sell:(addr:string,count:string,minamount:string)=>Promise<boolean>,
  computeBuyCountSpendPrice:(count:string)=>string,
  computeSpendPriceBuyCount:(amount:string)=>string,
  computeGetPriceSellCount:(amount:string)=>string,
  computeSellCountGetPriace:(amount:string)=>string
}


export interface IProjectTransationProps extends RouteComponentProps<{ projectId: string }>
{
  transation: IProjectTransationStore,
  common: ICommonStore,
  intl: any
}

export interface IProjectContractInfo
{
  projId: string,
  tokenSymbol: string,    // 项目代币简称
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
  tokenAmt:string,
  shareAmt:string,
  availableAmt:string,  // 可用股数
  lockAmt:string,  // 锁定股数
  chg24h:string,  // 24h涨跌幅
  lastBuyPrice:string,   // 最近买入价
  lastSellPrice:string,  // 最近卖出价
}