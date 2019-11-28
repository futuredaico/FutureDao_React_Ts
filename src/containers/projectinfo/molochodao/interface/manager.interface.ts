import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IIProjectManagerStore
{
  menuNum: number,
}


export interface IIProjectManagerProps extends RouteComponentProps<{ projectId: string }>
{
  manager: IIProjectManagerStore,
  common: ICommonStore,
  intl: any
}
