

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IPersonEditStore
{
  forgetEmailCode: string,
  updateUserImg:(imgStr: string) =>Promise<boolean>,
  updateUserBrief:(str: string) =>Promise<boolean>,
  updatePwd:(pwd: string, newPwd: string)=>Promise<boolean>,
  updateUserEmail:(email: string)=>Promise<boolean>,
}

export interface IPersonEditProps  extends RouteComponentProps
{
  person: IPersonEditStore,
  common:ICommonStore,
  intl: any
}