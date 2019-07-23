
export interface IProjectInfoStore {
    menuNum:number,
    isShowUpdateInfo:boolean
  }
  
  
  export interface IProjectInfoProps {
    projectinfo:IProjectInfoStore,
    intl:any
  }