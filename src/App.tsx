import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider, observer } from "mobx-react";
import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import Layout from './containers/layout/index';
import routes from './routers';
import store from "./store";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import enCN from 'antd/es/locale-provider/en_US';

const antdLocal = {
  zh: zhCN,
  en: enCN
}

addLocaleData([...en, ...zh]);
// 初始化请求



store['common'].initLanguage();
store['common'].getLoginStatus();
const ObserverRender = observer(() => {
  let locale = 'en';
  
  if (store['common'].language === 'zh') {
    locale = 'zh';
  }

  return (
    <IntlProvider
      key={locale}
      locale={locale}
      messages={store['common'].message}
    >
      <LocaleProvider locale={antdLocal[locale]}>
        {
          renderRoutes(routes)
        }
      </LocaleProvider>
    </IntlProvider>
  )
});

export default () => {
  if (process.env.REACT_APP_SERVER_ENV === 'DEV') {
    return (
      <Provider {...store}>
        <BrowserRouter basename="test">
          <Layout>
            <Switch>
              <ObserverRender />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
  return (
    <Provider {...store}>
      <BrowserRouter >
        <Layout>
          <Switch>
            <ObserverRender />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};
