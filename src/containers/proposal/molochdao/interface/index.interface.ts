import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IMetaMaskWalletStore } from "@/store/interface/metamaskwallet.interface";
import { IMolochManagerStore } from "@/containers/projectinfo/molochdao/interface/molochmanager.interface";
import { History } from 'history';
export interface IMolochProposalStore
{
  depositHash:string,
  depositSymbol:string,
  proposalFee:string,
  depositDecimals:number,
  fundList:IFundList[],
  fundCount:number,
  fundOption:IAssetOption[],
  getDepositData:(projectId:string)=>Promise<boolean>,
  getFundList:(projectId:string)=>Promise<boolean>,
  applyProposal:(contractHash:string,assetHash:string,addr:string,giveNum:number,requireNum:number,des:string,myaddr:string,sendCall:()=>void,confrimCall:()=>void)=>Promise<boolean>,
  applyProposalToGetShares:(contractHash:string,addr: string, requestShare: number,lootRequest:number, payNum: number,payToken:string,requestNum:number,requestToken:string, details: string, myaddr: string,sendCall:()=>void,confrimCall:()=>void)=>Promise<boolean>,
  applyProposalToAddToken:(contractHash:string,token:string, details: string, myaddr: string,sendCall:()=>void,confrimCall:()=>void)=>Promise<boolean>,
  applyProposalToKick:(contractHash:string,addr:string, details: string, myaddr: string,sendCall:()=>void,confrimCall:()=>void) =>Promise<boolean>
}


export interface IMolochProposalProps extends RouteComponentProps<{ projectId: string }>
{
  route: {
    [ key: string ]: any
  };
  history: History,
  common: ICommonStore,
  index: IMolochProposalStore,
  metamaskwallet:IMetaMaskWalletStore,
  molochmanager: IMolochManagerStore,
  intl: any
}
export interface IFundList{
  fundHash:string,
  fundSymbol:string,
  fundDecimals:string
}
export interface IAssetOption {
  id:string,
  name:string
}