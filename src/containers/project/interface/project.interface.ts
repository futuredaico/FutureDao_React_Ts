import { ICreateProjectStore } from "./createproject.interface";
import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IProjectStore {
    menuNum:number
  }
  
  
  export interface IProjectProps extends RouteComponentProps{
    project:IProjectStore,
    createproject:ICreateProjectStore,
    common:ICommonStore,
    intl:any
  }