
import { RouteComponentProps } from "react-router";
import { ICommonStore } from "@/store/interface/common.interface";
export interface ISignInStore {
    usernameCode:string,
    emailCode:string,
    pwdCode:string,
    checkUsername: (username:string) => Promise<boolean>
    registerUser:(username:string,email: string,pwd:string) =>Promise<boolean>
    checkEmail:(email: string) =>Promise<boolean>
  }
  
  export interface ISignInProps extends RouteComponentProps {
    signin:ISignInStore,
    common:ICommonStore
    intl:any
  }