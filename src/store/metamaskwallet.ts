// 存储全局变量
import { observable, action } from 'mobx';
import { IMetaMastWalletStore } from './interface/metamaskwallet.interface';
import Web3 from 'web3';
import common from './common'

class MetaMastWallet implements IMetaMastWalletStore
{
  @observable public metamaskAddress: string = ""; // 获取MetaMask钱包上登陆的地址
  @observable public isLoadMetaMask: boolean = false; // 检测是否有MetaMask钱包
  @observable public isLoginMetaMaskFlag: number = 0;// 默认不显示,1表示未检查到MetaMask钱包,2为未登录钱包
  @observable public web3: Web3;

  
  // 获取MetaMask钱包上正在处于什么样的网络状态
  // 连接MetaMask钱包
  @action public inintWeb3 = async () =>
  {
    // 第一步 检测MetaMask钱包是否存在
    if(this.isLoadMetaMask){
      // 
      if (window['ethereum']) {
        try {
          await ethereum.enable();
          this.web3 = new Web3(ethereum);
          console.log('ethereum')
          console.log(this.web3)
          await this.initAccount();          
        } catch (error) {
          // User denied account access...
          return false
        }
      }
      // Legacy dapp browsers...
      else if (window['web3']) {
        this.web3 = new Web3(web3.currentProvider);
        console.log('web3')
        console.log(this.web3)
        await this.initAccount();
        // Acccounts always exposed
      }
      // Non-dapp browsers...
      else
      {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return false
      }
     
    }else{
      if (common.language === 'zh')
      {
          common.openNotificationWithIcon('error', "操作失败", "未检测到MetaMask钱包，请安装钱包后再刷新页面重试");
      } else
      {
          common.openNotificationWithIcon('error', "Operation failed", "未检测到MetaMask钱包，请安装钱包后再刷新页面重试");
      }
      this.metamaskAddress = '';
      this.isLoginMetaMaskFlag = 1;
      return false
    }
    return true;
  }
  // 获取MetaMask钱包上登陆的地址
  @action public initAccount = () =>
  {
    return new Promise<string>((r, j) =>
    {
      // console.log(this.web3.eth.getAccounts);
      this.web3.eth.getAccounts((err, account) =>
      {
        // console.log(account);
        this.metamaskAddress = account[0];
        this.isLoginMetaMaskFlag = 0;
        console.log(this.metamaskAddress)
        // web3Tool.invoke();
        r(this.metamaskAddress)
      })
    })
  }
  @action public getMetamaskBalance = async ()=>{
    const balance = await this.web3.eth.getBalance(this.metamaskAddress);
    // const dai = await this.web3.d
    console.log(balance)
    return balance;
  }
}

// 外部使用require
export default new MetaMastWallet();
