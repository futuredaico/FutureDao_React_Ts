

import { RouteComponentProps } from "react-router";
export interface IForgetStore
{
  forgetEmailCode: string,
  checkEmail:(email: string) =>Promise<boolean>,
  resetPassword:(email: string) =>Promise<boolean>
}

export interface IForgetProps  extends RouteComponentProps
{
  forget: IForgetStore,
  intl: any
}