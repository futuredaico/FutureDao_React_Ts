import { RouteComponentProps } from 'react-router-dom';
import { ICommonStore } from '@/store/interface/common.interface';
export interface IHomeStore {
    projListCount: number,   
    projList: IMolochProjList[],
    projListPage:number,
    projListPageSize:number,
    // getProjList:()=>Promise<boolean>
    getMolochProjList:()=>Promise<boolean>
}
export interface IHomeProps extends RouteComponentProps {
    intl: any,
    home: IHomeStore,
    common:ICommonStore
}

// export interface IProjList {
//     projId:string,
//     projName:string,
//     projTitle:string,
//     projType:string,
//     projCoverUrl:string,
//     supportCount:number,
//     lastUpdateTime:number,
//     projState:string,
//     projSubState:string,    
// }
export interface IMolochProjList {
    projId:string,
    projName:string, // 标题
    projType:string, // future 或moloch 类型
    projBrief:string,  // 简介
    projCoverUrl:string,  // 封面
    projState:string, // ideapub // 状态 Moloch无
    shares:number, // 股数
    members:number // 成员数
}