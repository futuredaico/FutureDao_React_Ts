import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IUpdateProjectStore {
    sendUpdate:(projId:string,title:string,detail:string) => Promise<boolean>
  }
  
  
  export interface IUpdateProjectProps extends RouteComponentProps{
    updateproject:IUpdateProjectStore,
    common:ICommonStore,
    intl:any
  }