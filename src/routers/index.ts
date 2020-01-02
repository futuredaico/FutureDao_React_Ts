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

