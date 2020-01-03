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
    component: asyncComponent(() => import('../containers/proposal/molochdao/v1')),
    path: '/sendproposalv1/:projectId',
  },
  {
    component: asyncComponent(() => import('../containers/proposal/molochdao/v2')),
    path: '/sendproposalv2/:projectId',
    children: [
      {
        path: '/sendproposalv2/token/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/v2/addtoken')),
      },
      {
        path: '/sendproposalv2/kick/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/v2/kickmember')),
      },
      {
        path: '/sendproposalv2/apply/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/v2/applyshares')),
      },
      {
        path: '/sendproposalv2/menu/:projectId',
        component: asyncComponent(() => import('../containers/proposal/molochdao/v2/menu')),
      }
    ]
  },
  {
    component: asyncComponent(() => import('../containers/personalcenter')),
    path: '/personalcenter',
    children: [     
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

