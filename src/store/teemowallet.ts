// 存储全局变量
import { observable, action } from 'mobx';
import { ITeemoWalletStore } from './interface/teemowallet.interface';
import * as Wallet from '@/utils/teemowallet';
import common from './common'

class TeemoWallet implements ITeemoWalletStore
{
    @observable public teemoAddress: string = ""; // 获取Teemo钱包上登录的地址
    @observable public isLoadTeemo: boolean = false; // 检测是否有Teemo钱包
    @observable public isLoginFlag: number = 0;// 默认不显示,1表示未检查到teemo钱包,2为未登录钱包

    // 获取Teemo钱包上登录的地址
    @action public loginTeemo = async () =>
    {
        // 第一步 检测Teemo钱包是否存在
        if (this.isLoadTeemo)
        {
            // 第二步 查看是否登录了Teemo钱包
            const loginFlag: any = await Wallet.getAccount();         
            if (!loginFlag)
            {
                if (common.language === 'zh')
                {
                    common.openNotificationWithIcon('error', "操作失败", "请检查Teemo钱包当前网络状态");
                } else
                {
                    common.openNotificationWithIcon('error', "Operation failed", "请检查Teemo钱包当前网络状态");
                }
                this.teemoAddress = '';
                this.isLoginFlag = 2;
                return false;
            } else
            {
                this.isLoginFlag = 0;
                this.teemoAddress = loginFlag.address;
                return true;
            }
        } else
        {
            if (common.language === 'zh')
            {
                common.openNotificationWithIcon('error', "操作失败", "未检测到Teemo钱包，请安装钱包后再刷新页面重试");
            } else
            {
                common.openNotificationWithIcon('error', "Operation failed", "未检测到Teemo钱包，请安装钱包后再刷新页面重试");
            }
            this.teemoAddress = '';
            this.isLoginFlag = 1;
            return false;
        }
    }
    // 获取Teemo钱包上正在处于什么样的网络状态


}

// 外部使用require
export default new TeemoWallet();
