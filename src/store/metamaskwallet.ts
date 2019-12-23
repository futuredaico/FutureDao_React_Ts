// 存储全局变量
import { observable, action } from 'mobx';
import { IMetaMastWalletStore, MetaMaskNetworkCode } from './interface/metamaskwallet.interface';
import Web3 from 'web3';
import common from './common'
import PersonEdit from '../containers/personalcenter/store/personedit.store';
import { toMyNumber } from '@/utils/numberTool';

class MetaMastWallet implements IMetaMastWalletStore
{
  @observable public metamaskAddress: string = ""; // 获取MetaMask钱包上登陆的地址
  @observable public isLoadMetaMask: boolean = false; // 检测是否有MetaMask钱包
  @observable public isLoginMetaMaskFlag: number = 0;// 默认不显示,1表示未检查到MetaMask钱包,2为未登录钱包
  @observable public web3: Web3;
  @observable public metamaskNetwork: string = '' // 当前钱包的网络状态,1为主网，3为Ropsten测试链,4为Rinkeby测试链，42为Kovan测试链，5为Goerli测试链


  // 获取MetaMask钱包上正在处于什么样的网络状态
  // 连接MetaMask钱包
  @action public inintWeb3 = async () =>
  {
    // 第一步 检测MetaMask钱包是否存在
    if (window['ethereum'])
    {
      try
      {
        await ethereum.enable();
        this.web3 = new Web3(ethereum);
        console.log('ethereum')
        await this.initAccount();
      } catch (error)
      {
        return false
      }
    }
    else if (window['web3'])
    {
      this.web3 = new Web3(web3.currentProvider);
      console.log('web3')
      await this.initAccount();
    }
    else
    {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      this.canNotDetectWallet();
      return false
    }
    this.getMetamaskNetwork();
    return true;
  }
  // 没有检测到钱包
  @action public canNotDetectWallet = () =>
  {
    if (common.language === 'zh')
    {
      common.openNotificationWithIcon('error', "操作失败", "未检测到MetaMask钱包，请安装钱包后再刷新页面重试");
    } else
    {
      common.openNotificationWithIcon('error', "Operation failed", "Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
    this.metamaskAddress = '';
    // this.isLoginMetaMaskFlag = 1;
  }
  // 获取网络
  @action public getMetamaskNetwork = ()=>{
    this.metamaskNetwork = ethereum.networkVersion;    
  }
  // 切换网络时，切换请求
  @action public changeNetwork = () => {
    this.getMetamaskNetwork()
    // vip注释 这里判断要不要进行切换
    const currentMetaMask = sessionStorage.get('currentMetaMask') || '';
    if (currentMetaMask && currentMetaMask === this.metamaskNetwork) {
      return false;
    }
    // 1为主网，3为Ropsten测试链,4为Rinkeby测试链，42为Kovan测试链，5为Goerli测试链
    let base = '';
    if (this.metamaskNetwork !== MetaMaskNetworkCode.Mainnet) {
      //
      base = '/test'
    }
    const locations = window.location;
    // alert(location.origin);
    // alert(`${locations.pathname}${locations.search}${locations.hash}`)
    // alert(`${location.origin}${base || ''}${locations.pathname.replace('/test','')}${locations.search}${locations.hash}`)
    // vip注释 每次切换的时候存一下当前切的哪个环境
    sessionStorage.setItem('currentMetaMask', this.metamaskNetwork);
    window.location.href = `${location.origin}${base || ''}${locations.pathname.replace('/test', '')}${locations.search}${locations.hash}`;
    return true;
  }
  // 获取MetaMask钱包上登陆的地址
  @action public initAccount = () =>
  {
    return new Promise<string>((r, j) =>
    {
      this.web3.eth.getAccounts((err, account) =>
      {
        this.metamaskAddress = account[0];
        // this.isLoginMetaMaskFlag = 0;
        r(this.metamaskAddress)
      })
    })
  }
  /**
   * 获取eth的余额
   */
  @action public getMetamaskBalance = async () =>
  {
    const balance = await this.web3.eth.getBalance(this.metamaskAddress);
    const num = toMyNumber(balance).mul(Math.pow(10, -18))
    return web3.toBigNumber(num).toString(10)
  }
  /**
   * 校验是否与当前绑定地址一致，若不一致则提示重新绑定
   * 若从未绑定过地址则自动绑定，
   */
  @action public checkIsCurrendBindAddress = async () =>
  {
    console.log(this.metamaskAddress);

    if (common.userInfo)
    {
      console.log(common.userInfo.address)
      if (common.userInfo.address === '')
      {
        // 自动走一下绑定接口
        const res = await PersonEdit.bindWalletAddress('eth', this.metamaskAddress);
        if (res)
        {
          common.openNotificationWithIcon('success', "绑定地址", "绑定地址成功");
        } else
        {
          common.openNotificationWithIcon('error', "绑定地址", "绑定地址失败");
        }
      }
      else if (common.userInfo.address !== this.metamaskAddress.toLocaleLowerCase())
      {
        common.openNotificationWithIcon('info', "与绑定地址不一致", "您使用了新的钱包， 请切换至已绑定的钱包或前往个人中心更改绑定")
        return false
      } else
      {
        return true
      }
    }
    return false
  }
}

// 外部使用require
export default new MetaMastWallet();
