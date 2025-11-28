const routes = [
  // ===== HOME LAYOUT (com bottom bar) =====
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/HomePage.vue') },
      {
        path: 'reports',
        name: 'relatorios',
        component: () => import('pages/reports/ReportPage.vue')
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
        component: () => import('pages/transactions/TransactionListPage.vue'),
        meta: { title: 'Extrato', subtitle: 'Histórico de Transações' }
      },
      {
        path: 'carteira/jogadores',
        name: 'carteira-jogadores',
        component: () => import('pages/wallet/WalletPlayerListPage.vue'),
        meta: { title: 'Carteira', subtitle: 'Lista de Jogadores' }
      }
    ]
  },

  // ===== INNER LAYOUT (sem bottom bar) =====
  {
    path: '/',
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
            meta: { title: 'Confras', subtitle: 'Lista de Confras' }
          },
          {
            path: 'new',
            name: 'confras-new',
            component: () => import('pages/home/gatherings/GatheringFormPage.vue'),
            meta: { title: 'Confras', subtitle: 'Nova Confra' }
          },
          {
            path: ':id',
            name: 'confras-edit',
            component: () => import('pages/home/gatherings/GatheringFormPage.vue'),
            meta: { title: 'Confras', subtitle: 'Editar Confra' }
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
            meta: { title: 'Jogadores', subtitle: 'Lista de Jogadores' }
          },
          {
            path: 'new',
            name: 'jogadores-new',
            component: () => import('pages/home/players/PlayerFormPage.vue'),
            meta: { title: 'Jogadores', subtitle: 'Novo Jogador' }
          },
          {
            path: ':id',
            name: 'jogadores-edit',
            component: () => import('pages/home/players/PlayerFormPage.vue'),
            meta: { title: 'Jogadores', subtitle: 'Editar Jogador' }
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
            meta: { title: 'Formatos', subtitle: 'Lista e Formatos' }
          },
          {
            path: 'new',
            name: 'formatos-new',
            component: () => import('pages/home/formats/FormatFormPage.vue'),
            meta: { title: 'Formatos', subtitle: 'Novo Formato' }
          },
          {
            path: ':id',
            name: 'formatos-edit',
            component: () => import('pages/home/formats/FormatFormPage.vue'),
            meta: { title: 'Formatos', subtitle: 'Editar Formato' }
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
            meta: { title: 'Eventos', subtitle: 'Lista de Eventos' }
          },
          {
            path: 'new',
            name: 'eventos-new',
            component: () => import('pages/home/events/EventFormPage.vue'),
            meta: { title: 'Eventos', subtitle: 'Novo Evento' }
          },
          {
            path: ':id',
            name: 'eventos-edit',
            component: () => import('pages/home/events/EventFormPage.vue'),
            meta: { title: 'Eventos', subtitle: 'Editar Evento' }
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
            meta: { title: 'Rodadas', subtitle: 'Lista de Eventos' }
          },
          {
            path: ':idEvent',
            name: 'rodadas',
            component: () => import('pages/home/rounds/RoundListPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Lista de Rodadas' }
          },
          {
            path: ':idEvent/rodada/new',
            name: 'rodadas-new',
            component: () => import('pages/home/rounds/RoundFormPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Nova Rodada' }
          },
          {
            path: ':idEvent/rodada/:round',
            name: 'rodadas-edit',
            component: () => import('pages/home/rounds/RoundFormPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Editar Rodada' }
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
            meta: { title: 'Rank', subtitle: 'Lista de Eventos' }
          },
          {
            path: ':idEvent',
            name: 'rank',
            component: () => import('src/pages/home/rank/RankEventPage.vue'),
            meta: { title: 'Rank', subtitle: 'Rank do Evento' }
          },
          {
            path: ':idEvent/jogador/:idPlayer',
            name: 'rank-jogador',
            component: () => import('pages/home/rank/RankPlayerPage.vue'),
            meta: { title: 'Rank', subtitle: 'Rank do Jogador' }
          }
        ]
      },

      // --- Rules ---

      {
        path: 'rules',
        name: 'rules',
        component: () => import('pages/home/rules/RulePage.vue'),
        meta: { title: 'Regras', subtitle: 'Como Funciona' }
      },

      // --- Carteiras ---
      {
        path: 'carteira-jogador/:idPlayer',
        children: [
          {
            path: '',
            name: 'carteira-jogador',
            component: () => import('pages/wallet/WalletPlayerPage.vue'),
            meta: { title: 'Carteira', subtitle: 'Saldo do Jogador' }
          },
          {
            path: 'transacao/new',
            name: 'carteira-jogador-transacao-new',
            component: () => import('src/pages/wallet/WalletTransactionFormPage.vue'),
            meta: { title: 'Carteira', subtitle: 'Nova Transação' }
          },
          {
            path: 'transacao/:idTransaction',
            name: 'carteira-jogador-transacao-edit',
            component: () => import('src/pages/wallet/WalletTransactionFormPage.vue'),
            meta: { title: 'Carteira', subtitle: 'Editar Transação' }
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
