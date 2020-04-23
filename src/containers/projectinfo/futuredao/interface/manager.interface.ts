import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IProjectManagerStore
{
  contractShow:IProjectContractInfo|null,
  proposalList:IProjProposalList[],
  proposalCount:number,
  proposalPage:number,
  proposalSize:number,
  getContractShowData:(projectId:string)=>Promise<boolean>,
  getProposalList:(projId:string)=>Promise<boolean>
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
  fundReservePoolTotal:string
}
export interface IProjProposalList{
  index:string,
  proposalType:string,
  ratio:string,
  minValue:string,
  maxValue:string,
  startTime:string,
  proposalState:string,
  voteYesCount:number,
  voteNotCount:number,
  hasVote:boolean
}