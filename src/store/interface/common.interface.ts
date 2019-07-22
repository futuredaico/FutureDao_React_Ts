import { RcFile } from "antd/lib/upload";

export interface ICommonStore {
  language: string,
  message: any,
  network: string,
  address: string, // 当前地址
  uploadFile:(file:RcFile)=>void
}
export interface ICommonProps{
  common:ICommonStore
}
export interface IExtendsEditorProps {
  onHandleChangeSource: (content: string) => Promise<boolean>,
}
export interface IUploadResult {
  fileName: string,
  fileUrl: string,
}
