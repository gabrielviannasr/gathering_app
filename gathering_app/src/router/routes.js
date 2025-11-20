const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'extrato', name: 'extrato', component: () => import('pages/ExtratoPage.vue') },
      { path: 'carteira', name: 'carteira', component: () => import('pages/CarteiraPage.vue') },
      {
        path: 'relatorios',
        name: 'relatorios',
        component: () => import('pages/RelatoriosPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
