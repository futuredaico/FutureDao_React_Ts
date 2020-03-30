
import { RouteComponentProps } from "react-router";
import { IFundList } from "@/containers/projectinfo/molochdao/interface/molochinfo.interface";

export interface IFinancingStore {
  tradeTotal:number,
  tradeStep:number,
  startStatus:number
  isStartContract:boolean, 
  contractList:IContractAddress[],
  molochId:string,
  assetOption:IFinancingOption[],
  assetList:IFundList|null,
  getContractList:()=>Promise<boolean>,
  getMolochAsset:(projId:string)=>Promise<boolean>,
  getTokenInfo: (token: string) => Promise<{
    symbol: string;
    decimals: string;
  }>
  startFanincingProject:(assetHash:string,ratio:number,tokenName:string,tokenSimpleName:string,everyRatio:number,mixPrice:number,maxPrice:number)=>Promise<boolean>
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
