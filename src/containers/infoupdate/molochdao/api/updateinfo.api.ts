import request from "@/utils/request";
/**
 * 修改项目详情
 * @param projId 项目ID
 * @param des 简介
 * @param detail 详情
 * @param imgUrl 封面
 * @param website 官网
 */
export const modifyProjInfo = (projId: string,des:string,detail:string,imgUrl:string,website:string) =>
{
    const opts = {
        method: 'modifyProjInfo',
        params: [projId,des,detail,imgUrl,website]
    }
    console.log("params",opts.params)
    return request(opts);
}
