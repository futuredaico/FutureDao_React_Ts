import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IMetaMaskWalletStore } from "@/store/interface/metamaskwallet.interface";
import { History } from 'history';
import { IFContractInfo } from "@/containers/manager/interface/financing.interface";
export interface IFutureProposalStore {
  assetSymble:string,
  assetHash:string,
  assetDecimals:number,
  fContractInfo:IFContractInfo|null,
  getAssetData: (projectId: string) => Promise<boolean>,
  getFContractInfoData: (projectId: string) => Promise<boolean>,
}


export interface IFutureProposalProps extends RouteComponentProps<{ projectId: string }> {
  route: {
    [key: string]: any
  };
  history: History,
  common: ICommonStore,
  future: IFutureProposalStore,
  metamaskwallet: IMetaMaskWalletStore,
  intl: any
}