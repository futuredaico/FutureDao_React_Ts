

import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
import { ITeemoWalletStore } from "@/store/interface/teemowallet.interface";
import { IMetaMastWalletStore } from "@/store/interface/metamaskwallet.interface";
export interface IPersonEditStore
{
  newEmailCode: string,
  newPwdCode:string,
  updateUserImg:(imgStr: string) =>Promise<boolean>,
  updateName:(username: string) =>Promise<boolean>,
  updatePwd:(pwd: string, newPwd: string)=>Promise<boolean>,
  updateUserEmail:(email: string,pwd:string)=>Promise<boolean>,
  // checkEmail:(email: string)=>Promise<boolean>,
  bindWalletAddress:(type:string,address:string)=>Promise<boolean>
}

export interface IPersonProps  extends RouteComponentProps
{
  personedit: IPersonEditStore,
  common:ICommonStore,
  teemowallet:ITeemoWalletStore,
  metamaskwallet:IMetaMastWalletStore,
  intl: any
}