import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IOrderStore {
    orderMenu:number,
    projId:string,
    // sendUpdateZanInfo:()=>Promise<boolean>,
  }
  
  
  export interface IOrderProps extends RouteComponentProps<{ projectId: string }>{
    order:IOrderStore,
    common:ICommonStore,
    intl:any
  }
