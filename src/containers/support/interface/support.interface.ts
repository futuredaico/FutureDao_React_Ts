import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface ISupportStore {
    menuNum:number,
    projId:string,
    // sendUpdateZanInfo:()=>Promise<boolean>,
  }
  
  
  export interface ISupportProps extends RouteComponentProps<{ projectId: string }>{
    support:ISupportStore,
    common:ICommonStore,
    intl:any
  }
