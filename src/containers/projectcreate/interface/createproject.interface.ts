import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";

export interface IProjectStore {
  isEdit: boolean,
  menuNum: number,
  projId: string,
  updateId: string,
  deleteMember: (projId: string) => Promise<boolean>
}

export interface ICreateProjectStore {
  step: number,
  stepOneStatus: number,
  stepTwoStatus: number,
  stepThreeStatus: number,
  createContent: ICreateContent,
  searchList: IMemberList[],
  teamList: ITeamList[],
  createProject: () => Promise<boolean>,
  modifyStepOne: (params: string[]) => Promise<boolean>,
  modifyStepTwo: (params: string[]) => Promise<boolean>,
  modifyStepThree: (params: string[]) => Promise<boolean>,
  getProject: (projId: string) => Promise<boolean>,
  getTeamList: () => Promise<boolean>,
  searchMemberList: (memberEmail: string) => Promise<boolean>,
  inviteMember: (memberId: string) => Promise<boolean>,
  deleteMember: (memberId: string) => Promise<boolean>,
  commitProjectAudit: () => Promise<boolean>,
}


export interface ICreateProjectProps extends RouteComponentProps<{ projectId: string }> {
  project: IProjectStore,
  createproject: ICreateProjectStore,
  common: ICommonStore,
  intl: any
}

export interface ICreateContent {
  projId: string,       // 项目ID
  projName: string,     // 项目名称
  projTitle: string,    // 项目标题
  projType: string,     // 项目类型
  projConverUrl: string, // 项目封面
  projBrief: string,    // 项目简介
  projVideoUrl: string,// 视频介绍
  projDetail: string,   // 项目详情
  connectEmail: string, // 邮箱
  officialWeb: string,  // 官网
  community: string,    // 社区
  projState: string,    // 项目阶段状态
  projSubState: string, // 项目提交审核状态
  role: string          // 项目担任角色
}

export interface IMemberList {
  userId: string,
  username: string,
  email: string,
  headIconUrl: string
}

export interface ITeamList {
  userId: string,
  username: string,
  headIconUrl: string,
  role: string,// admin或member
  authenticationState: string // not为未认证，person为个人认证，company为企业认证
}