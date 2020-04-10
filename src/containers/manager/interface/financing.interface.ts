
import { RouteComponentProps } from "react-router";
import { IFundList } from "@/containers/projectinfo/molochdao/interface/molochinfo.interface";

export interface IFinancingStore {
  currentProjId:string,
  tradeTotal:number,
  tradeStep:number,
  startStatus:number
  isStartContract:boolean, 
  contractList:IContractAddress[],
  molochId:string,
  assetOption:IFinancingOption[],
  assetList:IFundList|null,
  fContractInfo:IFContractInfo|null,
  deposit:number,
  proposalFee:number,
  getContractList:()=>Promise<boolean>,
  getMolochAsset:(projId:string)=>Promise<boolean>,
  getTokenInfo: (token: string) => Promise<{
    symbol: string;
    decimals: string;
  }>
  startFanincingProject:(receiveAddress:string,assetHash:string,assetSimple:string,ratio:string,tokenName:string,tokenSimpleName:string,everyRatio:string,mixPrice:string,maxPrice:string,priceDecimals:number)=>Promise<boolean>
  setDataToSave:(projId:string,receiveAddress:string,assetHash:string,assetSimple:string,tokenName:string,tokenSimple:string,ratio:string,arrList:string,startAddr:string,contractList:string)=>Promise<boolean>,
  getFContractData:(projId:string)=>Promise<boolean>
}


// export interface IProjectProps extends RouteComponentProps<{ projectId: string }> {
//   project: IProjectStore,
//   createproject: ICreateProjectStore,
//   common: ICommonStore,
//   updateproject: IUpdateProjectStore,
//   intl: any
// }
export interface IFinancingProps extends RouteComponentProps<{ projectId: string }> {
  financing: IFinancingStore,
  intl: any
}
export interface IContractAddress extends IOptionList{
    projId:string,
}
export interface IOptionList{
  id:string,
  name:string,  
}
export interface IFinancingOption extends IOptionList{
  simplename:string
}

export interface IFContractInfo {
  projId:string,
  recvAddress:string, // 接收地址
  fundHash:string, // 融资代币hash
  fundSymbol:string, // 融资代币名称
  fundDecimals:number, // 融资代币精度
  tokenName:string, // 代币名称
  tokenSymbol:string, // 代币符号
  reserveRundRatio:string,  // 储备金比例
  faucetJA:IFaucetJA[], // 水龙头设置
  fundTotal:string, // 已募集资金
  fundReserveTotal:string // 储备资金
}
export interface IFaucetJA {
  percent:string, // 比例
  max:number,
  min:number
}