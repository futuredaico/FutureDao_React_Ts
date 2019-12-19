import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";
// import { TransactionReceipt } from "web3-core";
export interface IMolochProposalStore
{
  fundHash:string,
  fundSymbol:string,
  getFundData:(projectId:string)=>Promise<boolean>,
  applyProposal:(addr:string,giveNum:number,requireNum:number,des:string,myaddr:string,confrimCall:any)=>Promise<boolean>,
}


export interface IMolochProposalProps extends RouteComponentProps<{ projectId: string }>
{
  common: ICommonStore,
  index: IMolochProposalStore,
  metamaskwallet:IMetaMastWalletStore,
  intl: any
}