import { RcFile } from "antd/lib/upload";

export interface ICommonStore
{
  language: string,
  message: any,
  network: string,
  userInfo: IUserInfo | null,
  token: string,
  userId: string,
  footer: boolean,
  isVerifyEmail:boolean,
  uploadFile: (file: RcFile) => Promise<boolean>,
  loginFutureDao: (email: string, pwd: string) => Promise<boolean>,
  logoutFutureDao: () => void,
  getLoginStatus: () => void,
  getUserInfo: () => void,
  openNotificationWithIcon: (type: string, message: string, des: string) => void
}
export interface ICommonProps
{
  common: ICommonStore
}
export interface IExtendsEditorProps
{
  onHandleChangeSource: (content: string) => Promise<boolean>,
}
export interface IUploadResult
{
  fileName: string,
  fileUrl: string,
}

export enum CodeType
{
  success = "00000",              // 请求返回正常
  invalidUsername = "10200",      // 不合法用户名
  usernameHasRegisted = "10201",  // 用户名已注册
  invalidEmail = "10202",         // 不合法的邮箱
  emailHasRegisted = "10203",     // 邮箱已注册
  invalidPasswordLen = "10204",   // 不合法的密码
  passwordError = "10205",        // 密码错误
  invalidVerifyCode = "10206",    // 不合法的验证码
  invalidLoginInfo = "10207",     // 无效的登录信息(即用户名/邮箱/密码错误)
  notFindUserInfo = "10208",      // 没有找到用户信息
  invalidAccessToken = "10209",   // 无效token
  expireAccessToken = "10210",    // token过期
  headIconNotUpload = "10211",    // 头像未上传
  RepeatProjNameOrProjTitle = "10212", // 重复的项目名称或项目标题
  HaveNotPermissionModifyProj = "10213", // 没有权限修改项目
  HaveNotPermissionInviteMember = "10214",// 没有权限邀请成员
  UserNotRegistered = "10215", // 不合法的用户id
  HaveNotPermissionCreateUpdate = "10216", // 没有权限创建项目更新
  HaveNotPermissionQueryProjInfo = "10217", // 没有权限查看项目信息
  HaveNotPermissionModifyTeamRole = "10218", // 没有权限修改成员角色
}
export enum EmailVerify{
  detailStringEmailNotVerify = "10219",   // 邮箱未验证
  detailStringEmailVerifying = "10220",   // 邮箱验证中
  detailStringEmailVerifySucc = "10221", // 邮箱验证成功 
  detailStringEmailVerifyFail = "10222", // 邮箱验证失败
}
export interface IUserInfo
{
  username: string,
  email: string,
  headIconUrl: string, // 头像
  brief: string,  // 个人简介
  emailVerifyState:string, // 邮箱验证状态
}

export enum ProjectState
{
  Readying = "reading",  // 准备中
  IdeaPub = "ideapub",   // 创意发布
  CrowdFunding = "crowdfunding",  // 众筹中
  Trading = "trading",       // 交易中
  ClearUp = "clearup",       // 清退
}

export enum ProjSubState
{
  // 一级/二级关系
  // * 准备中: 无状态/审核中/审核失败
  // * 众筹中: 无状态/预热中 
  Init = "init",          // 初始状态: 无状态
  Auditing = "auditing",      // 审核中
  AuditFailed = "auditfailed",   // 审核失败
  Preheating = "preheating",    // 预热中
}