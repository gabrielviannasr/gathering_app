// src/router/routes.ts
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/HomePage.vue') },
      {
        path: 'extrato',
        name: 'extrato',
        component: () => import('pages/extrato/ExtratoPage.vue')
      },
      {
        path: 'carteira',
        name: 'carteira',
        component: () => import('pages/carteira/CarteiraPage.vue')
      },
      {
        path: 'relatorios',
        name: 'relatorios',
        component: () => import('pages/relatorios/RelatoriosPage.vue')
      }
    ]
  },

  // rotas internas sem bottom bar
  {
    path: '/app',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      {
        path: 'confras',
        name: 'confras',
        component: () => import('pages/home/gatherings/GatheringListPage.vue'),
        meta: { title: 'Confras' }
      },
      {
        path: 'eventos',
        name: 'eventos',
        component: () => import('pages/home/events/EventListPage.vue'),
        meta: { title: 'Eventos' }
      },
      {
        path: 'jogadores',
        name: 'jogadores',
        component: () => import('pages/home/players/PlayerListPage.vue'),
        meta: { title: 'Jogadores' }
      },
      {
        path: 'formatos',
        name: 'formatos',
        component: () => import('pages/home/formats/FormatListPage.vue'),
        meta: { title: 'Formatos' }
      },
      {
        path: 'rodadas',
        name: 'rodadas',
        component: () => import('pages/home/rounds/RoundEventListPage.vue'),
        meta: { title: 'Eventos / Rodadas' }
      },
      {
        path: 'rank',
        name: 'rank',
        component: () => import('pages/home/rank/RankEventListPage.vue'),
        meta: { title: 'Eventos / Rank' }
      }
    ]
  },

  // 404
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
]

export default routes
