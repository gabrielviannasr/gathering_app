const routes = [
  // ===== MAIN LAYOUT (com bottom bar) =====
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

  // ===== INNER LAYOUT (sem bottom bar) =====
  {
    path: '/app',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      // --- Confras ---
      {
        path: 'confras',
        children: [
          {
            path: '',
            name: 'confras',
            component: () => import('pages/home/gatherings/GatheringListPage.vue')
          },
          {
            path: 'new',
            name: 'confras-new',
            component: () => import('pages/home/gatherings/GatheringFormPage.vue')
          },
          {
            path: ':id',
            name: 'confras-edit',
            component: () => import('pages/home/gatherings/GatheringFormPage.vue')
          }
        ]
      },

      // --- Jogadores ---
      {
        path: 'jogadores',
        children: [
          {
            path: '',
            name: 'jogadores',
            component: () => import('pages/home/players/PlayerListPage.vue')
          },
          {
            path: 'new',
            name: 'jogadores-new',
            component: () => import('pages/home/players/PlayerFormPage.vue')
          },
          {
            path: ':id',
            name: 'jogadores-edit',
            component: () => import('pages/home/players/PlayerFormPage.vue')
          }
        ]
      },

      // --- Formatos ---
      {
        path: 'formatos',
        children: [
          {
            path: '',
            name: 'formatos',
            component: () => import('pages/home/formats/FormatListPage.vue')
          },
          {
            path: 'new',
            name: 'formatos-new',
            component: () => import('pages/home/formats/FormatFormPage.vue')
          },
          {
            path: ':id',
            name: 'formatos-edit',
            component: () => import('pages/home/formats/FormatFormPage.vue')
          }
        ]
      },

      // --- Eventos ---
      {
        path: 'eventos',
        name: 'eventos',
        component: () => import('pages/home/events/EventListPage.vue'),
        meta: { title: 'Eventos' }
      },

      // --- Eventos / Rodadas ---
      {
        path: 'rodadas',
        name: 'rodadas',
        component: () => import('pages/home/rounds/RoundEventListPage.vue'),
        meta: { title: 'Eventos / Rodadas' }
      },

      // --- Eventos / Rank ---
      {
        path: 'rank',
        name: 'rank',
        component: () => import('pages/home/rank/RankEventListPage.vue'),
        meta: { title: 'Eventos / Rank' }
      }
    ]
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
