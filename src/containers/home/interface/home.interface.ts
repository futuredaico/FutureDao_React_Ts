import { RouteComponentProps } from 'react-router-dom';
import { ICommonStore } from '@/store/interface/common.interface';
export interface IHomeStore {
    projListCount: number,   
    projList: IProjList[],
    projListPage:number,
    projListPageSize:number,
    getProjList:()=>Promise<boolean>
}
export interface IHomeProps extends RouteComponentProps {
    intl: any,
    home: IHomeStore,
    common:ICommonStore
}

export interface IProjList {
    projId:string,
    projName:string,
    projTitle:string,
    projType:string,
    projConverUrl:string,
    supportCount:number,
    lastUpdateTime:number,
    projState:string,
    projSubState:string,    
}