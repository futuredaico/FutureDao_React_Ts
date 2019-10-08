declare var module: any
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './reset.less';
import { unregister } from './registerServiceWorker';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import storeCommon from '@/store/common';
import Intl from 'intl';
import { observer } from 'mobx-react';
import TeemoWallet from '@/store/teemowallet';
import MetamaskWallet from '@/store/metamaskwallet';

global.Intl = Intl;
window['Intl'] = Intl;
window.addEventListener('Teemo.NEO.READY',()=>{
  TeemoWallet.isLoadTeemo = true;
  // common.initAccountBalance();
});
window.addEventListener('load',()=>{
  MetamaskWallet.isLoadMetaMask = true;
  // common.initAccountBalance();
});

const ObserverRender = observer(() => {
  return (
    <App />
  )
})

if (process.env.NODE_ENV === "development") {
  // common.inintWeb3()
  // .then(web3=>{
  //   console.log(web3);
  //   console.log('web3正常打印');
  //   console.log('Current Address',web3.currentProvider['connection']['selectedAddress']);
    
  //   common.initAccount()
  //   .then(addr=>{
  //     console.log('Current Address',addr);
      ReactDOM.render(
        <AppContainer>
          <LocaleProvider locale={storeCommon.language === 'en' ? en_US : zh_CN}>
            <ObserverRender/>
          </LocaleProvider>
        </AppContainer>,
        document.getElementById('root') as HTMLElement
      );
      if (module.hot) {
        module.hot.accept();
      }
  //   })
  // })
}

if (process.env.NODE_ENV === "production") {
    // common.getSessionAddress();
    // common.initLoginInfo(document.getElementById("root")as HTMLElement);
    // common.inintWeb3()
    // .then(web3=>{
    //   common.initAccount()
    //   .then(addr=>{
    //   console.log('Current Address',addr);
    //   console.log(web3);
      ReactDOM.render(
        <LocaleProvider locale={zh_CN}>
          <ObserverRender/>
        </LocaleProvider>,
        document.getElementById('root') as HTMLElement
      );
  //   })
  // })
}

unregister();
