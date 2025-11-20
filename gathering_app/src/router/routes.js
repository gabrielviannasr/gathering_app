const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // HOME PRINCIPAL
      {
        path: '',
        name: 'home',
        component: () => import('pages/home/HomePage.vue')
      },

      // HOME → Confras
      // {
      //   path: 'confras',
      //   name: 'confras',
      //   component: () => import('pages/home/gatherings/GatheringListPage.vue')
      // },

      // HOME → Eventos
      // {
      //   path: 'eventos',
      //   name: 'eventos',
      //   component: () => import('pages/home/events/EventListPage.vue')
      // },

      // HOME → Jogadores
      {
        path: 'jogadores',
        name: 'jogadores',
        component: () => import('pages/home/players/PlayerListPage.vue')
      },

      // HOME → Formatos
      {
        path: 'formatos',
        name: 'formatos',
        component: () => import('pages/home/formats/FormatListPage.vue')
      }

      // // HOME → Rodadas (redireciona para eventos)
      // {
      //   path: 'rodadas',
      //   name: 'rodadas',
      //   component: () => import('pages/home/events/EventListPage.vue')
      // },

      // // HOME → Rank (idem)
      // {
      //   path: 'rank',
      //   name: 'rank',
      //   component: () => import('pages/home/events/EventListPage.vue')
      // }
    ]
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
