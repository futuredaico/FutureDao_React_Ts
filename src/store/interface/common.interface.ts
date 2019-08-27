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
  isVerifyEmail: boolean,
  uploadFile: (file: RcFile) => Promise<string>,
  loginFutureDao: (email: string, pwd: string) => Promise<boolean>,
  logoutFutureDao: () => void,
  getLoginStatus: () => void,
  getUserInfo: () => void,
  openNotificationWithIcon: (type: string, message: string, des: string) => void,
  reSendEmail: () => void,
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
  success = "00000",
  invalidUsername = "10200",      // 不合法用户名
  usernameHasRegisted = "10201",  // 用户名已注册
  invalidEmail = "10202",         // 不合法的邮箱
  emailHasRegisted = "10203",     // 邮箱已注册
  invalidPasswordLen = "10204",   // 不合法的密码
  passwordError = "10205",        // 密码错误
  invalidVerifyCode = "10206",    // 不合法的验证码
  invalidLoginInfo = "10207",     // 无效的登录信息(即用户名/邮箱/密码错误)
  notFindUserInfo = "10208",      // 没有找到用户信息
  invalidAccessToken = "10209",      // 无效token
  expireAccessToken = "10210",       // token过期
  headIconNotUpload = "10211",       // 头像未上传
  projBriefNotUpload = "10212",      // 项目封面未上传
  projVideoNotUpload = "10213",      // 项目视频未上传
  T_RepeatProjNameOrProjTitle = "10230",      // 重复的项目名称或项目标题
  T_HaveNotPermissionCreateProj = "10231",    // 没有权限[创建]项目
  T_HaveNotPermissionDeleteProj = "10232",    // 没有权限[删除]项目
  T_HaveNotPermissionModifyProj = "10233",    // 没有权限[修改]项目
  T_HaveNotPermissionQueryProj = "10234",     // 没有权限[查询]项目
  T_HaveNotPermissionCreateUpdate = "10235",  // 没有权限[创建]项目更新
  T_HaveNotPermissionDeleteUpdate = "10236",  // 没有权限[删除]项目更新
  T_HaveNotPermissionModifyUpdate = "10237",  // 没有权限[修改]项目更新
  T_HaveNotPermissionQueryUpdate = "10238",   // 没有权限[查询]项目更新
  T_InvalidTargetUserId = "10239",
  T_HaveNotPermissionInviteTeamMember = "102341", // 没有权限[创建/邀请]项目成员
  T_HaveNotPermissionDeleteTeamMember = "102342", // 没有权限[删除]项目成员
  T_HaveNotPermissionModifyTeamMember = "102343", // 没有权限[修改(角色)]项目成员
  T_HaveNotPermissionQueryTeamMember = "102344",  // 没有权限[查询]项目成员
  T_HaveNotPermissionDeleteTeamAdmin = "102345",  // 没有权限删除项目团队管理员
  T_HaveNotPermissionDeleteYourSelf = "102346",   // 没有权限删除项目团队成员自己

}
export enum EmailVerify
{
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
  emailVerifyState: string, // 邮箱验证状态
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
  Modify = "modify",      // 修改中
  Auditing = "auditing",      // 审核中
  AuditFailed = "auditfailed",   // 审核失败
  Preheating = "preheating",    // 预热中
}
export enum ProjType
{
  GAME = "game",  // 游戏
  COMIC = "comic", // 动漫
  MOVIE = "movie", // 电影
  OTHER = "other", // 其他
}