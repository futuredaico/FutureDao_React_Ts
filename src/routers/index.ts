import asyncComponent from '@/components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [  
  // {
  //   component: asyncComponent(() => import('../containers/address/addressinfo')),
  //   path: '/address/:address',
  // },
  // {
  //   component: asyncComponent(() => import('../containers/myaccount/layout')),
  //   path: '/myaccount',
  //   children:[
  //     {
  //       component: asyncComponent(() => import('../containers/myaccount/setting')),
  //       path: '/myaccount/setting',
  //     },
  //   ]
  // },
  {
    component: asyncComponent(()=> import('../containers/project')),
    path:'/createproject'
  },
  {
    component: asyncComponent(() => import('../containers/notfound')),
    path: '/:any',
  },
  {
    component: asyncComponent(() => import('../containers/home')),
    exact: true,
    path: '/',
  },
];

