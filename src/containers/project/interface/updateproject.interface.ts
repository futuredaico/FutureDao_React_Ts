import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjUpdateInfo } from "@/containers/projectinfo/interface/update.interface";
import { ICreateProjectStore } from "./createproject.interface";
import { IProjectStore } from "./project.interface";

export interface IUpdateProjectStore
{
  updateInfo: IProjUpdateInfo | null,
  sendUpdate: (projId: string, title: string, detail: string) => Promise<boolean>,
  getUpdateInfo: (projId: string,updateId:string) => Promise<boolean>,
  modifyUpdateInfo: (projId: string,updateId:string, title: string, detail: string) => Promise<boolean>,
}


export interface IUpdateProjectProps extends RouteComponentProps<{ projectId: string }>
{
  project:IProjectStore,
  createproject: ICreateProjectStore,
  updateproject: IUpdateProjectStore,
  common: ICommonStore,
  intl: any
}