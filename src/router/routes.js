const routes = [
  // ===== HOME LAYOUT (com bottom bar) =====
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/HomePage.vue') },
      {
        path: 'relatorios',
        name: 'relatorios',
        component: () => import('pages/relatorios/RelatoriosPage.vue')
      }
    ]
  },

  // ===== MAIN LAYOUT (com bottom bar) =====
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'extrato',
        name: 'extrato',
        component: () => import('pages/extrato/ExtratoPage.vue')
      },
      {
        path: 'carteira',
        name: 'carteira',
        component: () => import('pages/carteira/CarteiraPage.vue')
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
            component: () => import('pages/home/gatherings/GatheringListPage.vue'),
            meta: { title: 'Confras' }
          },
          {
            path: 'new',
            name: 'confras-new',
            component: () => import('pages/home/gatherings/GatheringFormPage.vue'),
            meta: { title: 'Confras - Novo' }
          },
          {
            path: ':id',
            name: 'confras-edit',
            component: () => import('pages/home/gatherings/GatheringFormPage.vue'),
            meta: { title: 'Confras - Editar' }
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
            component: () => import('pages/home/players/PlayerListPage.vue'),
            meta: { title: 'Jogadores' }
          },
          {
            path: 'new',
            name: 'jogadores-new',
            component: () => import('pages/home/players/PlayerFormPage.vue'),
            meta: { title: 'Jogadores - Novo' }
          },
          {
            path: ':id',
            name: 'jogadores-edit',
            component: () => import('pages/home/players/PlayerFormPage.vue'),
            meta: { title: 'Jogadores - Editar' }
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
            component: () => import('pages/home/formats/FormatListPage.vue'),
            meta: { title: 'Formatos' }
          },
          {
            path: 'new',
            name: 'formatos-new',
            component: () => import('pages/home/formats/FormatFormPage.vue'),
            meta: { title: 'Formatos - Novo' }
          },
          {
            path: ':id',
            name: 'formatos-edit',
            component: () => import('pages/home/formats/FormatFormPage.vue'),
            meta: { title: 'Formatos - Editar' }
          }
        ]
      },

      // --- Eventos ---
      {
        path: 'eventos',
        children: [
          {
            path: '',
            name: 'eventos',
            component: () => import('pages/home/events/EventListPage.vue'),
            meta: { title: 'Eventos' }
          },
          {
            path: 'new',
            name: 'eventos-new',
            component: () => import('pages/home/events/EventFormPage.vue'),
            meta: { title: 'Eventos - Novo' }
          },
          {
            path: ':id',
            name: 'eventos-edit',
            component: () => import('pages/home/events/EventFormPage.vue'),
            meta: { title: 'Eventos - Editar' }
          }
        ]
      },

      // --- Rodadas / Eventos ---
      {
        path: 'rodadas/eventos',
        children: [
          {
            path: '',
            name: 'rodadas-eventos',
            component: () => import('pages/home/rounds/RoundEventListPage.vue'),
            meta: { title: 'Rodadas / Eventos' }
          },
          {
            path: ':idEvent',
            name: 'rodadas',
            component: () => import('pages/home/rounds/RoundListPage.vue'),
            meta: { title: 'Rodadas do Evento' }
          },
          {
            path: ':idEvent/rodada/new',
            name: 'rodadas-new',
            component: () => import('pages/home/rounds/RoundFormPage.vue'),
            meta: { title: 'Rodadas - Nova' }
          },
          {
            path: ':idEvent/rodada/:round',
            name: 'rodadas-edit',
            component: () => import('pages/home/rounds/RoundFormPage.vue'),
            meta: { title: 'Rodadas - Editar' }
          }
        ]
      },

      // --- Rank / Eventos ---
      {
        path: 'rank/eventos',
        children: [
          {
            path: '',
            name: 'rank-eventos',
            component: () => import('pages/home/rank/RankEventListPage.vue'),
            meta: { title: 'Rank / Eventos' }
          },
          {
            path: ':idEvent',
            name: 'rank',
            component: () => import('pages/home/rank/RankListPage.vue'),
            meta: { title: 'Rank do Evento' }
          },
          {
            path: ':idEvent/player/:idPlayer',
            name: 'rank-player',
            component: () => import('pages/home/rank/RankPlayerPage.vue'),
            meta: { title: 'Rank do Jogador' }
          }
        ]
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
