import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { History } from 'history';
import { IMolochInfoStore } from "@/containers/projectinfo/molochdao/interface/molochinfo.interface";
export interface IMolochUpdateInfoStore {
  saveUpdateProject:(projId: string,des:string,detail:string,imgUrl:string,website:string)=>Promise<boolean>
}


export interface IMolochUpdateInfoProps extends RouteComponentProps<{ projectId: string }> {
  route: {
    [key: string]: any
  };
  history: History,
  common: ICommonStore,
  updateinfo: IMolochUpdateInfoStore,
  molochinfo:IMolochInfoStore
  intl: any
}