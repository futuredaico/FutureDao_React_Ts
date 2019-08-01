import asyncComponent from '@/components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [
  // {
  //   component: asyncComponent(() => import('../containers/address/addressinfo')),
  //   path: '/address/:address',
  // },
  {
    component: asyncComponent(() => import('../containers/emailpage/invite')),
    path: '/inviteteam',
  },
  {
    component: asyncComponent(() => import('../containers/emailpage')),
    path: '/email',
  },
  {
    component: asyncComponent(() => import('../containers/login')),
    path: '/load',
    children: [
      {
        component: asyncComponent(() => import('../containers/login/forget')),
        path: '/load/forgetpwd',
      },
      {
        component: asyncComponent(() => import('../containers/login/password')),
        path: '/load/pwdupdate',
      },
      {
        component: asyncComponent(() => import('../containers/login/signin')),
        path: '/load/signin',
      },
      {
        component: asyncComponent(() => import('../containers/login/login')),
        path: '/load/login',
      },
    ]
  },
  {
    component: asyncComponent(() => import('../containers/personalcenter')),
    path: '/personalcenter',
    // children:[
    //   {
    //     path:'/personalcenter/userinfo',
    //     component: asyncComponent(() => import('../containers/personalcenter')),
    //   },
    //   {
    //     path:'/personalcenter/myproject',
    //     component: asyncComponent(() => import('../containers/personalcenter')),
    //   }
    // ]
  },
  {
    component: asyncComponent(() => import('../containers/projectinfo')),
    path: '/projectinfo'
  },
  {
    component: asyncComponent(() => import('../containers/project')),
    path: '/project/:projectId'
  },
  {
    component: asyncComponent(() => import('../containers/project')),
    path: '/project'
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

