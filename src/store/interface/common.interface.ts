import { RcFile } from "antd/lib/upload";

export interface ICommonStore
{
  language: string,
  message: any,
  network: string,
  userInfo:IUserInfo|null, 
  token:string,
  userId:string,
  footer: boolean;
  uploadFile: (file: RcFile) => Promise<boolean>,
  loginFutureDao:(email: string, pwd: string) => Promise<boolean>,
  logoutFutureDao:()=>void,
  getLoginStatus:()=>void,
  getUserInfo:()=>void,
  openNotificationWithIcon:(type:string,message:string,des:string)=>void
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
  UserNotRegistered = "10215", // 邀请用户未注册
}

export interface IUserInfo {
  username:string,
  email:string,
  headIconUrl:string,
  brief:string
}