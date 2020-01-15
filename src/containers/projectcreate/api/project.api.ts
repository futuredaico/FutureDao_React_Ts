import request from 'utils/request';
import { ICreateContent } from "../interface/createproject.interface"

/**
 * 创建项目
 * @param params 
 */
export const createProj = (params: string[]) => {
    const opts = {
        method: 'createProj',
        params: [ ...params ]
    }
    return request(opts);
}
/**
 * 修改详情信息模块的内容
 * @param params 
 */
export const modifyProjVideo = (params: string[]) => {
    const opts = {
        method: 'modifyProjVideo',
        params: [ ...params ]
    }
    return request(opts);
}
/**
 * 修改团队信息模块的内容
 * @param params 
 */
export const modifyProjEmail = (params: string[]) => {
    const opts = {
        method: 'modifyProjEmail',
        params: [ ...params ]
    }
    return request(opts);
}
/**
 * 修改基础信息模块的内容
 * @param params 
 */
export const modifyProjName = (params: string[]) => {
    const opts = {
        method: 'modifyProjName',
        params: [ ...params ]
    }
    return request(opts);
}
/**
 * 修改项目
 * @param params 
 */
export const modifyProj = (params: string[]) => {
    const opts = {
        method: 'modifyProj',
        params: [ ...params ]
    }
    return request(opts);
}
/**
 * 查询项目信息
 * @param userId 用户id
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getProj = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'queryProj',
        params: [ userId, token, projId ]
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
export const searchMember = (userId: string, token: string, memberEmail: string, page: number, pageSize: number) => {
    const opts = {
        method: 'queryMember',
        params: [ userId, token, memberEmail, page, pageSize ]
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
export const inviteMember = (userId: string, token: string, memberId: string, projId: string) => {
    const opts = {
        method: 'inviteMember',
        params: [ userId, token, memberId, projId ]
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
export const getMember = (userId: string, token: string, projId: string, page: number, pageSize: number) => {
    const opts = {
        method: 'queryProjTeam',
        params: [ userId, token, projId, page, pageSize ]
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
export const modifyRole = (userId: string, token: string, projId: string, memberId: string, role: string) => {
    const opts = {
        method: 'modifyUserRole',
        params: [ userId, token, projId, memberId, role ]
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
export const sendUpdate = (userId: string, token: string, projId: string, updateTitle: string, updateDetail: string) => {
    const opts = {
        method: 'createUpdate',
        params: [ userId, token, projId, updateTitle, updateDetail ]
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
export const getUpdateInfoById = (projId: string, proUpdateId: string, userId: string) => {
    const opts = {
        method: 'queryUpdate',
        params: [ projId, proUpdateId, userId ]
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
export const modifyUpdate = (userId: string, token: string, projId: string, proUpdateId: string, title: string, detail: string) => {
    const opts = {
        method: 'modifyUpdate',
        params: [ userId, token, projId, proUpdateId, title, detail ]
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
export const deleteMember = (userId: string, token: string, projId: string, memberId: string) => {
    const opts = {
        method: 'deleteProjTeam',
        params: [ userId, token, projId, memberId ]
    }
    return request(opts);
}

/**
 * 删除项目
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const deleteProject = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'deleteProj',
        params: [ userId, token, projId ]
    }
    return request(opts);
}
/**
 * 提交项目审核
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const commitProject = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'commitProjAudit',
        params: [ userId, token, projId ]
    }
    return request(opts);
}
/**
 * 发布合约
 * @param params 
 */
export const publishContract = (params: string[]) => {
    const opts = {
        method: 'publishContract',
        params: [ ...params ]
    }
    return request(opts);
}
/**
 * 查询合约
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getContractData = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'queryContract',
        params: [ userId, token, projId ]
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
export const setReward = (userId: string, token: string, projId: string, name: string, tel: string, backinfo: string) => {
    const opts = {
        method: 'saveReward',
        params: [ userId, token, projId, name, tel, backinfo ]
    }
    return request(opts);
}
/**
 * 查询回报
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getRewardData = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'queryReward',
        params: [ userId, token, projId ]
    }
    return request(opts);
}
/**
 * 查询已融资金
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getFinanceFund = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'queryFinanceFund',
        params: [ userId, token, projId ]
    }
    return request(opts);
}
/**
 * 查询储备金比例
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const getReserveFund = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'queryReserveFundRatio',
        params: [ userId, token, projId ]
    }
    return request(opts);
}
/**
 * 启动融资
 * @param userId 用户ID
 * @param token 访问令牌
 * @param projId 项目id
 */
export const startFinance = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'startFinance',
        params: [ userId, token, projId ]
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
export const saveReserveFundRatio = (userId: string, token: string, projId: string, ratio: string) => {
    const opts = {
        method: 'saveReserveFundRatio',
        params: [ userId, token, projId, ratio ]
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
export const confirmSendGoods = (userId: string, token: string, projId: string, orderId: string, note: string) => {
    const opts = {
        method: 'confirmDeliverBuyOrder',
        params: [ userId, token, projId, orderId, note ]
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
export const getProjOrderList = (userId: string, token: string, projId: string, page: number, pageSize: number, sendFlag: number, buyName: string, orderStr: string, sendType: number) => {
    const opts = {
        method: 'queryProjBuyOrderList',
        params: [ userId, token, projId, page, pageSize, sendFlag, buyName, orderStr, sendType ]
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
export const getProjOrderDetail = (userId: string, token: string, projId: string, orderId: string) => {
    const opts = {
        method: 'queryProjBuyOrder',
        params: [ userId, token, projId, orderId ]
    }
    return request(opts);
}
/**
 * 导出联系人信息
 * @param userId 用户Id
 * @param token 访问令牌
 * @param projId 项目ID 
 */
export const exportOrderFile = (userId: string, token: string, projId: string) => {
    const opts = {
        method: 'exportOrderInfo',
        params: [ userId, token, projId ]
    }
    return request(opts);
}

/**
 * 保存 项目信息
 * @param contractContent 合约信息
 * @param summoner 发起人
 * @param molochhash molochdao hash
 * @param bankhash bank hash
 */
export const saveContractInfo = (contractContent: ICreateContent, summoner: string, molochhash: string, bankhash: string, txid: string) => {
    const {
        version,                // 版本
        projectName,            // 项目名称
        projectBrief,           // 项目简介
        projectDetail,          // 文本编辑内容 详情
        projectConverUrl,          // 项目封面URL
        officialWebUrl,         // 官网URL
        // approvedToken,          // 允许交易的token
        // approvedTokenSymbol,
        // approvedDecimals,
        periodDuration,         // 区间段的时间 测试网默认一个区间时段是120秒 2分钟
        votingPeriodLength,     // 投票有多少个区间段
        gracePeriodLength,     // 公示有多少个区间段
        abortWindow,            // 撤回投票的窗口期
        proposalDeposit,        // 提议的押金
        // 目前用不上 dilutionBound,          // 如果出现大规模混乱，投赞成票的选民将有义务支付最高乘数
        processingReward,       // 处理提案的人所得到的奖励
        emergencyExitWait,
        bailoutWait,
        approvedTokens,
        createTime,
    } = contractContent

    const opts = {
        method: 'saveContractInfo',
        params: [
            version,
            projectName,
            projectBrief,
            projectDetail,
            projectConverUrl,
            officialWebUrl,
            // approvedToken,
            // approvedTokenSymbol,
            // approvedDecimals,
            "", "", 0,
            periodDuration,
            votingPeriodLength,
            gracePeriodLength,
            abortWindow,
            proposalDeposit,
            processingReward,
            summoner,
            [
                { name: 'moloch', hash: molochhash },
                { name: 'bank', hash: bankhash }
            ],
            emergencyExitWait,
            bailoutWait,
            createTime,
            approvedTokens,
            txid
        ]
    }
    console.log(opts);

    return request(opts);

}