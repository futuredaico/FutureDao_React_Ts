import request from 'utils/request';
import { RcFile } from 'antd/lib/upload';

export const uploadFile = (file:RcFile)=>{
  const formData = new FormData();
  formData.append('xxxx', file);
  const opts = {
    method:'todo',
    params:formData
  }
  return request(opts)
}