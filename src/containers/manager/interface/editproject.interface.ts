import { RouteComponentProps } from "react-router";

export interface IEditProjectStore {
  editContent: IEditProjectInfo,  
  // searchList: IMemberList[],
  teamList: ITeamList[],
  teamCount:number,
  teamPage:number,
  teamPageSize:number,
  modifyProject: () => Promise<boolean>,
  getProject: (projId: string) => Promise<boolean>,
  getTeamList: (projId:string) => Promise<boolean>,
  // searchMemberList: (memberEmail: string) => Promise<boolean>,
  inviteMember: (address: string, type: string,projId:string) => Promise<boolean>,
  deleteMember: (address: string,projId:string) => Promise<boolean>,
}


export interface IEditProjectProps extends RouteComponentProps<{ projectId: string }> {
  editproject: IEditProjectStore,
  intl: any
}

// export interface IMemberList {
//   userId: string,
//   username: string,
//   email: string,
//   headIconUrl: string
// }

export interface ITeamList {
  userId: string,
  address:string,
  username: string,
  headIconUrl: string,
  role: string,// admin或member
  isMine:boolean
}
export interface IEditProjectInfo{
  projId:string, // 项目ID
  projName: string,     // 项目名称
  projTitle: string,    // 项目标题  
  projBrief: string,    // 项目简介
  officialWeb: string,  // 官网
  projCoverUrl: string, // 项目封面
  projVideoUrl: string,// 视频介绍
  projDetail: string,   // 项目详情
  role:string // 项目角色
  startFinanceFlag:number // 是否启动融资了 0表示未启动，1表示已启动
}
export enum ProjectRole{
  admin='admin',
  member='member'
}