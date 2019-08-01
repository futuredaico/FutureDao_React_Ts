import { ICreateProjectStore } from "./createproject.interface";
import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IUpdateProjectStore } from "./updateproject.interface";

export interface IProjectStore {
  menuNum: number
}


export interface IProjectProps extends RouteComponentProps<{ projectId: string }> {
  project: IProjectStore,
  createproject: ICreateProjectStore,
  common: ICommonStore,
  updateproject: IUpdateProjectStore,
  intl: any
}