
import { RouteComponentProps } from "react-router";
import { IFundList } from "@/containers/proposal/molochdao/interface/index.interface";

export interface IFinancingStore {
  isStartContract:boolean, 
  contractList:IContractAddress[],
  molochId:string,
  assetList:IFundList|null,
  getContractList:()=>Promise<boolean>,
  getMolochAsset:(projId:string)=>Promise<boolean>
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
export interface IContractAddress{
    id:string,
    name:string,
    projId:string,
}