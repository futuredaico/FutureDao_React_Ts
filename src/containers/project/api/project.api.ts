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
/**
 * 查询成员
 * @param userId 用户ID
 * @param token token
 * @param memberEmail 成员邮箱 
 * @param page 当前页码
 * @param pageSize 每页显示条数
 */
export const searchMember = (userId:string,token:string,memberEmail:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryMember',
        params: [userId,token,memberEmail,page,pageSize]
    }
    return request(opts);
}
/**
 * 邀请成员
 * @param userId 用户id
 * @param token 
 * @param memberId 成员id
 * @param projId 项目id
 */
export const inviteMember = (userId:string,token:string,memberId:string,projId:string) =>
{
    const opts = {
        method: 'inviteMember',
        params: [userId,token,memberId,projId]
    }
    return request(opts);
}
/**
 * 获取成员列表
 * @param userId 用户id
 * @param token 
 * @param projId 项目id
 * @param page 
 * @param pageSize 
 */
export const getMember = (userId:string,token:string,projId:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryProjTeam',
        params: [userId,token,projId,page,pageSize]
    }
    return request(opts);
}
/**
 * 修改成员角色
 * @param userId 用户id
 * @param token 
 * @param projId 项目id 
 * @param userid 成员id
 * @param role 成员角色
 */
export const modifyRole = (userId:string,token:string,projId:string,memberId:string,role:string) =>
{
    const opts = {
        method: 'modifyUserRole',
        params: [userId,token,projId,memberId,role]
    }
    return request(opts);
}
/**
 * 发布更新
 * @param userId 用户Id
 * @param token 访问令牌
 * @param projId 项目id
 * @param updateTitle 发布更新标题
 * @param updateDetail 发布更新内容
 */
export const sendUpdate = (userId:string,token:string,projId:string,updateTitle:string,updateDetail:string) =>
{
    const opts = {
        method: 'createUpdate',
        params: [userId,token,projId,updateTitle,updateDetail]
    }
    return request(opts);
}
/**
 * 
 * @param userId 用户id
 * @param token 访问令牌
 * @param projId 项目id
 * @param memberId 成员id
 */
export const deleteMember = (userId:string,token:string,projId:string,memberId:string) =>
{
    const opts = {
        method: 'deleteProjTeam',
        params: [userId,token,projId,memberId]
    }
    return request(opts);
}

/**
 * 删除项目
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const deleteProject = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'deleteProj',
        params: [userId,token,projId]
    }
    return request(opts);
}