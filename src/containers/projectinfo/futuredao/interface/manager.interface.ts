import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IProjectManagerStore
{
  contractShow:IProjectContractInfo|null,
  getContractShowData:(projectId:string)=>Promise<boolean>
}


export interface IProjectManagerProps extends RouteComponentProps<{ projectId: string }>
{
  manager: IProjectManagerStore,
  common: ICommonStore,
  intl: any
}

export interface IProjectContractInfo {
  recvAddress:string,
  recvAddressName:string,
  fundSymbol:string,
  percent:string,
  min:string,
  max:string,
  reserveRundRatio:string,
  fundPoolTotal:string,
  fundReservePoolTota:string
}