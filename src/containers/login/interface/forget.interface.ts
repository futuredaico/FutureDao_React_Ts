

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface IForgetStore
{
  forgetEmailCode: string,
  resetPwdCode:string,
  checkEmail: (email: string) => Promise<boolean>,
  resetPassword: (email: string) => Promise<boolean>,
  verifyResetPassword: (username: string, email: string, pwd: string, code: string) => Promise<boolean>,
}

export interface IForgetProps extends RouteComponentProps
{
  forget: IForgetStore,
  common:ICommonStore,
  intl: any
}