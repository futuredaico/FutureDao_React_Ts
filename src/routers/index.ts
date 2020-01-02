import asyncComponent from '@/components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [
  // {
  //   component: asyncComponent(() => import('../containers/address/addressinfo')),
  //   path: '/address/:address',
  // },
  {
    component: asyncComponent(() => import('../containers/home/home')),
    path: '/index',
  },
  {
    component: asyncComponent(() => import('../containers/proposal/molochdao')),
    path: '/sendproposal/:projectId',
    children: [
      {
        path: '/sendproposal/token/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/addtoken')),
      },
      {
        path: '/sendproposal/kick/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/kickmember')),
      },
      {
        path: '/sendproposal/apply/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/applyshares')),
      },
      {
        path: '/sendproposal/menu/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/menu')),
      }
    ]
  },
  {
    component: asyncComponent(() => import('../containers/proposal/futuredao')),
    path: '/proposal/:projectId'
  },
  {
    component: asyncComponent(() => import('../containers/order/order')),
    path: '/order/:projectId'
  },
  {
    component: asyncComponent(() => import('../containers/order')),
    path: '/giftorder/:projectId'
  },
  {
    component: asyncComponent(() => import('../containers/support')),
    path: '/support/:projectId'
  },
  {
    component: asyncComponent(() => import('../containers/emailpage/invite')),
    path: '/inviteteam',
  },
  {
    component: asyncComponent(() => import('../containers/emailpage')),
    path: '/email',
  },
  // {
  //   component: asyncComponent(() => import('../containers/login')),
  //   path: '/load',
  //   children: [
  //     {
  //       component: asyncComponent(() => import('../containers/login/forget')),
  //       path: '/load/forgetpwd',
  //     },
  //     {
  //       component: asyncComponent(() => import('../containers/login/password')),
  //       path: '/load/pwdupdate',
  //     },
  //     {
  //       component: asyncComponent(() => import('../containers/login/signin')),
  //       path: '/load/signin',
  //     },
  //     {
  //       component: asyncComponent(() => import('../containers/login/login')),
  //       path: '/load/login',
  //     },
  //   ]
  // },
  {
    component: asyncComponent(() => import('../containers/personalcenter')),
    path: '/personalcenter',
    children: [
      {
        path: '/personalcenter/myorder',
        component: asyncComponent(() => import('../containers/personalcenter/myorder')),
      },
      {
        path: '/personalcenter/myproject',
        component: asyncComponent(() => import('../containers/personalcenter/myproject')),
      },
      {
        path: '/personalcenter/userinfo',
        component: asyncComponent(() => import('../containers/personalcenter/personedit')),
      }
    ]
  },
  {
    component: asyncComponent(() => import('../containers/projectinfo/molochdao')),
    path: '/molochinfo/:projectId'
  },
  {
    component: asyncComponent(() => import('../containers/projectinfo/futuredao')),
    path: '/projectinfo/:projectId'
  },
  // {
  //   component: asyncComponent(() => import('../containers/project')),
  //   path: '/project',
  //   children: [
  //     {
  //       path: '/moloch/order/:projectId',
  //       component: asyncComponent(() => import('../containers/project/molochdao/order/order')),
  //     },
  //     {
  //       path: '/moloch/financing/:projectId',
  //       component: asyncComponent(() => import('../containers/project/molochdao/financing/financing')),
  //     },
  //     {
  //       path: '/moloch/update/:projectId',
  //       component: asyncComponent(() => import('../containers/project/molochdao/updateproject')),
  //     },
  //     {
  //       path: '/moloch/:projectId',
  //       component: asyncComponent(() => import('../containers/project/molochdao/edit/createproject')),
  //     },
  //     {
  //       path: '/project',
  //       component: asyncComponent(() => import('../containers/project/molochdao/edit/createproject')),
  //     }
  //   ]
  // },
  {
    component: asyncComponent(() => import('../containers/projectcreate')),
    path: '/create',
    children: [
      {
        path: '/create/moloch',
        component: asyncComponent(() => import('../containers/projectcreate/info/molochdao')),
      },
      {
        path: '/create',
        component: asyncComponent(() => import('../containers/projectcreate/info/projects')),
      }
    ]
  },
  // {
  //   component: asyncComponent(() => import('../containers/project')),
  //   path: '/project/:projectId'
  // },
  // {
  //   component: asyncComponent(() => import('../containers/project')),
  //   path: '/project'
  // },
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

