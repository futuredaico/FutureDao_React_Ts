import request from 'utils/request';

/**
 * 创建项目
 * @param params 
 */
export const createProj = (params:string[]) =>
{
    const opts = {
        method: 'createProj',
        params: [...params]
    }
    console.log(opts.params)
    return request(opts);
}
/**
 * 修改项目
 * @param params 
 */
export const modifyProj = (params:string[]) =>
{
    const opts = {
        method: 'modifyProj',
        params: [...params]
    }
    console.log(opts.params)
    return request(opts);
}
/**
 * 查询项目信息
 * @param userId 用户id
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getProj = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'queryProj',
        params: [userId,token,projId]
    }
    return request(opts);
}