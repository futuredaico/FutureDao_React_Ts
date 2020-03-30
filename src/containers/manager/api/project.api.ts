import request from 'utils/request';
/**
 * 查询项目信息
 * @param projId 项目id
 */
export const getProj = (projId:string) =>
{
    const opts = {
        method: 'queryProj',
        params: [projId]
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
 * 查询成员
 * @param memberEmail 成员邮箱 
 * @param page 当前页码
 * @param pageSize 每页显示条数
 */
// export const searchMember = (page:number,pageSize:number) =>
// {
//     const opts = {
//         method: 'queryMember',
//         params: [page,pageSize]
//     }
//     return request(opts);
// }
/**
 * 获取成员列表
 * @param projId 项目id
 * @param page 
 * @param pageSize 
 */
export const getMember = (projId:string,page:number,pageSize:number) =>
{
    const opts = {
        method: 'queryMemberList',
        params: [projId,page,pageSize]
    }
    return request(opts);
}
/**
 * 邀请成员
 * @param memberId 新成员地址
 * @param type 角色，取值：admin管理员，member成员
 * @param projId 项目id
 */
export const inviteMember = (memberId:string,type:string,projId:string) =>
{
    const opts = {
        method: 'inviteMember',
        params: [memberId,type,projId]
    }
    return request(opts);
}
/**
 * 删除成员
 * @param memberId 被删成员地址
 * @param projId 项目id 
 */
export const deleteMember = (memberId:string,projId:string) =>
{
    const opts = {
        method: 'deleteMember',
        params: [memberId,projId]
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
// export const modifyRole = (userId:string,token:string,projId:string,memberId:string,role:string) =>
// {
//     const opts = {
//         method: 'modifyUserRole',
//         params: [userId,token,projId,memberId,role]
//     }
//     return request(opts);
// }
/**
 * 发布更新
 * @param projId 项目id
 * @param updateTitle 发布更新标题
 * @param updateDetail 发布更新内容
 */
export const sendUpdate = (projId:string,updateTitle:string,updateDetail:string) =>
{
    const opts = {
        method: 'createUpdate',
        params: [projId,updateTitle,updateDetail]
    }
    return request(opts);
}
/**
 * 查询更细列表接口
 * @param projId 项目id
 * @param page 分页索引
 * @param size 分页大小
 */
export const getUpdateList = (projId:string,page:number,size:number)=>{
    const opts= {
        method:'queryUpdateList',
        params:[projId,page,size]
    }
    return request(opts);
}
/**
 * 根据更新ID查询项目更新日志
 * @param token 访问令牌
 * @param projId 项目ID
 * @param proUpdateId 项目更新ID
 */
export const getUpdateInfoById = (projId:string,proUpdateId:string) =>
{
    const opts = {
        method: 'queryUpdate',
        params: [projId,proUpdateId]
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
export const modifyUpdate = (projId:string,proUpdateId:string,title:string,detail:string) =>
{
    const opts = {
        method: 'modifyUpdate',
        params: [projId,proUpdateId,title,detail]
    }
    return request(opts);
}
/**
 * 删除更新
 * @param projId 项目id
 * @param updateId 更新id
 */
export const deleteUpdate = (projId:string,updateId:string) =>
{
    const opts = {
        method: 'deleteUpdate',
        params: [projId,updateId]
    }
    return request(opts);
}

/**
 * 删除项目
 * @param projId 项目id
 */
export const deleteProject = (projId:string) =>
{
    const opts = {
        method: 'deleteProj',
        params: [projId]
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
export const setReward = (userId:string,token:string,projId:string,name:string,tel:string,backinfo:string) =>
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
/**
 * 启动融资
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const startFinance = (userId:string,token:string,projId:string)=>{
    const opts = {
        method: 'startFinance',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 更改并提交储备金比例
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 * @param ratio 比例
 */
export const saveReserveFundRatio = (userId:string,token:string,projId:string,ratio:string)=>{
    const opts = {
        method: 'saveReserveFundRatio',
        params: [userId,token,projId,ratio]
    }
    return request(opts);
}
/**
 * 确认发货
 * @param userId 用户Id
 * @param token 访问令牌
 * @param projId 项目ID
 * @param orderId 订单ID
 * @param note 说明
 */
export const confirmSendGoods = (userId:string,token:string,projId:string,orderId:string,note:string)=>{
    const opts = {
        method: 'confirmDeliverBuyOrder',
        params: [userId,token,projId,orderId,note]
    }
    return request(opts);
}
/**
 * 查询项目订单列表
 * @param userId 用户Id
 * @param token 访问令牌
 * @param projId 项目ID
 * @param page 当前页
 * @param pageSize 行数
 * @param sendFlag 发货与否，0为待发货，1为已发货
 * @param buyName 买家姓名
 * @param orderStr 订单编号
 * @param sendType 发放方式，0为虚拟发放，1为实物发放
 */
export const getProjOrderList = (userId:string,token:string,projId:string,page:number,pageSize:number,sendFlag:number,buyName:string,orderStr:string,sendType:number)=>{
    const opts = {
        method: 'queryProjBuyOrderList',
        params: [userId,token,projId,page,pageSize,sendFlag,buyName,orderStr,sendType]
    }
    return request(opts);
}
/**
 * 获取项目订单详情
 * @param userId 用户Id
 * @param token 访问令牌
 * @param projId 项目ID
 * @param orderId 订单ID
 */
export const getProjOrderDetail = (userId:string,token:string,projId:string,orderId:string)=>{
    const opts = {
        method: 'queryProjBuyOrder',
        params: [userId,token,projId,orderId]
    }
    return request(opts);
}
/**
 * 导出联系人信息
 * @param userId 用户Id
 * @param token 访问令牌
 * @param projId 项目ID 
 */
export const exportOrderFile = (userId:string,token:string,projId:string)=>{
    const opts = {
        method: 'exportOrderInfo',
        params: [userId,token,projId]
    }
    return request(opts);
}
/**
 * 项目融资时查询参与中的项目组织信息
 * @param page 分页索引
 * @param size 分页大小
 */
export const getReserverAddress = (page:number,size:number)=>{
    const opts = {
        method: 'queryJoinOrgAddressList',
        params: [page,size]
    }
    return request(opts);
}
export const saveFContractInfo = (page:number,size:number)=>{
    const opts = {
        method: 'saveFContractInfo',
        params: [page,size]
    }
    return request(opts);
}

// export const getReserverAddress = (page:number,size:number)=>{
//     const opts = {
//         method: 'queryJoinOrgAddressList',
//         params: [page,size]
//     }
//     return request(opts);
// }
