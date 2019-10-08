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
    return request(opts);
}
/**
 * 修改详情信息模块的内容
 * @param params 
 */
export const modifyProjVideo = (params:string[]) =>
{
    const opts = {
        method: 'modifyProjVideo',
        params: [...params]
    }
    return request(opts);
}
/**
 * 修改团队信息模块的内容
 * @param params 
 */
export const modifyProjEmail = (params:string[]) =>
{
    const opts = {
        method: 'modifyProjEmail',
        params: [...params]
    }
    return request(opts);
}
/**
 * 修改基础信息模块的内容
 * @param params 
 */
export const modifyProjName = (params:string[]) =>
{
    const opts = {
        method: 'modifyProjName',
        params: [...params]
    }
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
 * 根据更新ID查询项目更新日志
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param proUpdateId 项目更新ID
 */
export const getUpdateInfoById = (projId:string,proUpdateId:string,userId:string) =>
{
    const opts = {
        method: 'queryUpdate',
        params: [projId,proUpdateId,userId]
    }
    return request(opts);
}
/**
 * 修改更新日志
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目ID
 * @param proUpdateId 项目更新ID
 * @param title 修改日志的标题
 * @param detail 修改日志的内容
 */
export const modifyUpdate = (userId:string,token:string,projId:string,proUpdateId:string,title:string,detail:string) =>
{
    const opts = {
        method: 'modifyUpdate',
        params: [userId,token,projId,proUpdateId,title,detail]
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
/**
 * 提交项目审核
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const commitProject = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'commitProjAudit',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 发布合约
 * @param params 
 */
export const publishContract = (params:string[]) =>
{
    const opts = {
        method: 'publishContract',
        params: [...params]
    }
    return request(opts);
}
/**
 * 查询合约
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getContractData = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'queryContract',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 设置回报
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id 
 * @param name 联系人姓名
 * @param tel 联系人方式
 * @param backinfo 回报信息
 */
export const setReward = (userId:string,token:string,projId:string,name:string,tel:string,backinfo:[]) =>
{
    const opts = {
        method: 'saveReward',
        params: [userId,token,projId,name,tel,backinfo]
    }
    return request(opts);
}
/**
 * 查询回报
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getRewardData = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'queryReward',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 查询已融资金
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getFinanceFund = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'queryFinanceFund',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 查询储备金比例
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getReserveFund = (userId:string,token:string,projId:string) =>
{
    const opts = {
        method: 'queryReserveFundRatio',
        params: [userId,token,projId]
    }
    return request(opts);
}