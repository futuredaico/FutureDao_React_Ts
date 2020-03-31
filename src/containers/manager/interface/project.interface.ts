
import { RouteComponentProps } from "react-router";
import { ICommonStore } from '@/store/interface/common.interface';
import { History } from 'history';
import { IEditProjectStore } from './editproject.interface';
import { IUpdateProjectStore } from "./updateproject.interface";
import { IFinancingStore } from "./financing.interface";
import { IMetaMaskWalletStore } from "@/store/interface/metamaskwallet.interface";
import { IRewardStore } from "./reward.interface";

export interface IProjectStore {
  isEdit:boolean,
  menuNum: number,
  projId:string,
  updateId:string,
  deleteProject:(projId:string)=>Promise<boolean>
}


// export interface IProjectProps extends RouteComponentProps<{ projectId: string }> {
//   project: IProjectStore,
//   createproject: ICreateProjectStore,
//   common: ICommonStore,
//   updateproject: IUpdateProjectStore,
//   intl: any
// }
export interface IProjectProps extends RouteComponentProps<{ projectId: string }> {
  route: {
      [key: string]: any
  };
  history: History,
  metamaskwallet:IMetaMaskWalletStore,
  project: IProjectStore,
  editproject: IEditProjectStore,
  common: ICommonStore,
  updateproject:IUpdateProjectStore
  financing: IFinancingStore,
  reward: IRewardStore,
  // orderproject: IOrderProjectStore,
  intl: any
}