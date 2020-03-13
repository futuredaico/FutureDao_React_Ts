import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { History } from 'history';
import { IMolochInfo } from "@/containers/projectinfo/molochdao/interface/molochinfo.interface";
import { IMolochManagerStore } from "@/containers/projectinfo/molochdao/interface/molochmanager.interface";
export interface IMolochUpdateInfoStore {
  projInfo: IMolochInfo | null,
  saveUpdateProject:(projId: string,des:string,detail:string,imgUrl:string,website:string)=>Promise<boolean>,
  getMolochProjInfo: (projId: string) => Promise<boolean>,
}


export interface IMolochUpdateInfoProps extends RouteComponentProps<{ projectId: string }> {
  route: {
    [key: string]: any
  };
  history: History,
  common: ICommonStore,
  updateinfo: IMolochUpdateInfoStore,
  molochmanager:IMolochManagerStore,
  intl: any
}