import { ICreateProjectStore } from "./createproject.interface";

export interface IProjectStore {
    menuNum:number
  }
  
  
  export interface IProjectProps {
    project:IProjectStore,
    createproject:ICreateProjectStore,
    intl:any
  }