// import { RouteComponentProps } from "react-router";
// import { ICommonStore } from "@/store/interface/common.interface";
// import { ICreateProjectStore } from "./createproject.interface";
// import { IProjectStore } from "./project.interface";

export interface IUpdateProjectStore
{
  updateType:number,
  updateInfo: IUpdateInfo | null,
  updatePage:number,
  updateSize:number,
  updateCount:number,
  updateList:IUpdateList[],
  sendUpdate: (projId: string, title: string, detail: string) => Promise<boolean>,
  getUpdateInfo: (projId: string,updateId:string) => Promise<boolean>,
  modifyUpdateInfo: (projId: string,updateId:string, title: string, detail: string) => Promise<boolean>,
  getUpdateList:(projId: string) => Promise<boolean>,
  deleteUpdate:(projId:string,updateId:string)=>Promise<boolean>
}


// export interface IUpdateProjectProps extends RouteComponentProps<{ projectId: string }>
// {
//   project:IProjectStore,
//   createproject: ICreateProjectStore,
//   updateproject: IUpdateProjectStore,
//   common: ICommonStore,
//   intl: any
// }
export interface IUpdateList{
  projId:string
  updateId:string,
  updateTitle:string,
  updateDetail:string,
  lastUpdateTime:number,  
}
export interface IUpdateInfo extends IUpdateList{
  username:string,
  heanIconUrl:string,
  isMember:boolean,
}