// 存储全局变量
import { observable, action } from 'mobx';
import { IMetaMastWalletStore } from './interface/metamaskwallet.interface';
import Web3 from 'web3';

class MetaMastWallet implements IMetaMastWalletStore
{
  @observable public metamaskAddress: string = ""; // 获取MetaMask钱包上登陆的地址
  @observable public isLoadMetaMask: boolean = false; // 检测是否有MetaMask钱包
  @observable public isLoginMetaMaskFlag: number = 0;// 默认不显示,1表示未检查到MetaMask钱包,2为未登录钱包
  @observable public web3: Web3;

  // 获取MetaMask钱包上登陆的地址
  // 获取MetaMask钱包上正在处于什么样的网络状态

  @action public inintWeb3 = () =>
  {
    return new Promise<Web3>(resolve =>
    {
      window.addEventListener('load', async () =>
      {
        console.log('load web3');

        // Modern dapp browsers...
        if (window['ethereum'])
        {
          try
          {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            this.web3 = new Web3(ethereum);
            resolve(this.web3);
            // web3.eth.sendTransaction({/* ... */});
          } catch (error)
          {
            // User denied account access...
          }
        }
        // Legacy dapp browsers...
        else if (window['web3'])
        {
          this.web3 = new Web3(web3.currentProvider);
          resolve(this.web3);
          // Acccounts always exposed
        }
        // Non-dapp browsers...
        else
        {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
      })
    })
  }
  @action public initAccount = () =>
  {
    return new Promise<string>((r, j) =>
    {
      console.log(this.web3.eth.getAccounts);
      this.web3.eth.getAccounts((err, account) =>
      {
        // console.log(account);
        this.metamaskAddress = account[0];

        // web3Tool.invoke();
        r(this.metamaskAddress)
      })
    })
  }
}

// 外部使用require
export default new MetaMastWallet();
