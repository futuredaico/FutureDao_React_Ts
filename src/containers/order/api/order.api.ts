import request from 'utils/request';
/**
 * 获取回报详情的基本信息
 * @param rewardId 礼包ID
 */
export const getRewardInfo = (rewardId:string) =>
{
    const opts = {
        method: 'queryRewardDetail',
        params: [rewardId]
    }
    return request(opts);
}