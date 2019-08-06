import request from 'utils/request';

/**
 * 获取项目列表
 * @param page 当前页
 * @param pageSize 每页显示条数
 */
export const getProjList = (page:number,pageSize:number)=>{
  const opts = {
    method:'queryProjList',
    params:[page,pageSize]
  }
  return request(opts)
}