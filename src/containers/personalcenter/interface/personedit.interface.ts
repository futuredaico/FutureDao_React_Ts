

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IPersonEditStore
{
  newEmailCode: string,
  newPwdCode:string,
  updateUserImg:(imgStr: string) =>Promise<boolean>,
  updateUserBrief:(str: string) =>Promise<boolean>,
  updatePwd:(pwd: string, newPwd: string)=>Promise<boolean>,
  updateUserEmail:(email: string,pwd:string)=>Promise<boolean>,
  checkEmail:(email: string)=>Promise<boolean>,
}

export interface IPersonProps  extends RouteComponentProps
{
  personedit: IPersonEditStore,
  common:ICommonStore,
  intl: any
}