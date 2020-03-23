
import { RouteComponentProps } from "react-router";

export interface IFinancingStore {
  isStartContract:boolean, 
  contractList:IContractAddress[];
  getContractList:()=>Promise<boolean>
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
    projName:string,
    molochHash:string
}