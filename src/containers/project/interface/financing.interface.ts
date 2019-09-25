import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { IProjectStore } from "./project.interface";

export interface IFinancingStore {
  step: number,
  stepOneStatus: number,
  stepTwoStatus: number,
  stepThreeStatus: number,
}


export interface IFinancingProps extends RouteComponentProps<{ projectId: string }> {
  project:IProjectStore,
  financing: IFinancingStore,
  common: ICommonStore,
  intl: any
}
