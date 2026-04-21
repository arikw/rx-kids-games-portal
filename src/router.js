export const routes = [
  {
    path: '/',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/:locale(en|he)/',
    component: () => import('./pages/[locale]/index.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/en/',
  },
]
