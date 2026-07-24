import { ROUTES } from './routes.enum.js'

const routes = [
  // ===== HOME LAYOUT =====
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', name: ROUTES.HOME, component: () => import('pages/home/HomePage.vue') },
      {
        path: 'reports',
        name: ROUTES.RELATORIOS,
        component: () => import('pages/reports/ReportPage.vue')
      }
    ]
  },

  // ===== MAIN LAYOUT =====
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'extrato',
        name: ROUTES.EXTRATO,
        component: () => import('pages/transactions/TransactionListPage.vue'),
        meta: { title: 'Extrato', subtitle: 'Histórico de Transações' }
      },
      {
        path: ROUTES.CARTEIRA,
        name: ROUTES.CARTEIRA,
        component: () => import('pages/wallet/WalletPlayerListPage.vue'),
        meta: { title: 'Carteira', subtitle: 'Lista de Jogadores' }
      }
    ]
  },

  // ===== INNER LAYOUT =====
  {
    path: '/',
    component: () => import('layouts/InnerLayout.vue'),
    children: [
      // --- CONFRAS ---
      {
        path: 'confras',
        children: [
          {
            path: '',
            name: ROUTES.CONFRAS,
            component: () => import('pages/home/confras/ConfraListPage.vue'),
            meta: { title: 'Confras', subtitle: 'Lista de Confras' }
          },
          {
            path: 'new',
            name: ROUTES.CONFRAS_NEW,
            component: () => import('pages/home/confras/ConfraFormPage.vue'),
            meta: { title: 'Confras', subtitle: 'Nova Confra' }
          },
          {
            path: ':id',
            name: ROUTES.CONFRAS_EDIT,
            component: () => import('pages/home/confras/ConfraFormPage.vue'),
            meta: { title: 'Confras', subtitle: 'Editar Confra' }
          },

          {
            path: ':id/formats',
            name: ROUTES.CONFRAS_FORMATS,
            component: () => import('src/pages/reports/formats/ConfraFormatPage.vue'),
            meta: { title: 'Confras', subtitle: 'Potes da Confra' }
          },
          {
            path: ':id/pots',
            name: ROUTES.CONFRAS_POTS,
            component: () => import('pages/reports/pots/ConfraPotsPage.vue'),
            meta: { title: 'Confras', subtitle: 'Potes da Confra' }
          },
          {
            path: ':id/winrate',
            name: ROUTES.CONFRAS_WINRATE,
            component: () => import('pages/reports/winrate/ConfraWinratePage.vue'),
            meta: { title: 'Confras', subtitle: 'Winrate da Confra' }
          }
        ]
      },

      // --- JOGADORES ---
      {
        path: 'jogadores',
        children: [
          {
            path: '',
            name: ROUTES.JOGADORES,
            component: () => import('pages/home/players/PlayerListPage.vue'),
            meta: { title: 'Jogadores', subtitle: 'Lista de Jogadores' }
          },
          {
            path: 'new',
            name: ROUTES.JOGADORES_NEW,
            component: () => import('pages/home/players/PlayerFormPage.vue'),
            meta: { title: 'Jogadores', subtitle: 'Novo Jogador' }
          },
          {
            path: ':id',
            name: ROUTES.JOGADORES_EDIT,
            component: () => import('pages/home/players/PlayerFormPage.vue'),
            meta: { title: 'Jogadores', subtitle: 'Editar Jogador' }
          }
        ]
      },

      // --- FORMATOS ---
      {
        path: 'formatos',
        children: [
          {
            path: '',
            name: ROUTES.FORMATOS,
            component: () => import('pages/home/formats/FormatListPage.vue'),
            meta: { title: 'Formatos', subtitle: 'Lista e Formatos' }
          },
          {
            path: 'new',
            name: ROUTES.FORMATOS_NEW,
            component: () => import('pages/home/formats/FormatFormPage.vue'),
            meta: { title: 'Formatos', subtitle: 'Novo Formato' }
          },
          {
            path: ':id',
            name: ROUTES.FORMATOS_EDIT,
            component: () => import('pages/home/formats/FormatFormPage.vue'),
            meta: { title: 'Formatos', subtitle: 'Editar Formato' }
          }
        ]
      },

      // --- EVENTOS ---
      {
        path: 'eventos',
        children: [
          {
            path: '',
            name: ROUTES.EVENTOS,
            component: () => import('pages/home/events/EventListPage.vue'),
            meta: { title: 'Eventos', subtitle: 'Lista de Eventos' }
          },
          {
            path: 'new',
            name: ROUTES.EVENTOS_NEW,
            component: () => import('pages/home/events/EventFormPage.vue'),
            meta: { title: 'Eventos', subtitle: 'Novo Evento' }
          },
          {
            path: ':id',
            name: ROUTES.EVENTOS_EDIT,
            component: () => import('pages/home/events/EventFormPage.vue'),
            meta: { title: 'Eventos', subtitle: 'Editar Evento' }
          }
        ]
      },

      // --- RODADAS ---
      {
        path: 'rodadas/eventos',
        children: [
          {
            path: '',
            name: ROUTES.RODADAS_EVENTOS,
            component: () => import('pages/home/rounds/RoundEventListPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Lista de Eventos' }
          },
          {
            path: ':idEvent',
            name: ROUTES.RODADAS,
            component: () => import('pages/home/rounds/RoundListPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Lista de Rodadas' }
          },
          {
            path: ':idEvent/rodada/new',
            name: ROUTES.RODADAS_NEW,
            component: () => import('pages/home/rounds/RoundFormPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Nova Rodada' }
          },
          {
            path: ':idEvent/rodada/:round',
            name: ROUTES.RODADAS_EDIT,
            component: () => import('pages/home/rounds/RoundFormPage.vue'),
            meta: { title: 'Rodadas', subtitle: 'Editar Rodada' }
          }
        ]
      },

      // --- RANK: EVENTOS ---
      {
        path: 'rank/eventos',
        children: [
          {
            path: '',
            name: ROUTES.RANK_EVENTOS,
            component: () => import('pages/home/rank/RankEventListPage.vue'),
            meta: { title: 'Rank', subtitle: 'Lista de Eventos' }
          },
          {
            path: ':idEvent',
            name: ROUTES.RANK_EVENTO,
            component: () => import('pages/home/rank/RankEventPage.vue'),
            meta: { title: 'Rank', subtitle: 'Rank do Evento' }
          },
          {
            path: ':idEvent/jogador/:idPlayer',
            name: ROUTES.RANK_EVENTO_JOGADOR,
            component: () => import('pages/home/rank/RankPlayerPage.vue'),
            meta: { title: 'Rank', subtitle: 'Rank do Jogador' }
          }
        ]
      },

      // --- RANK: CONFRAS ---
      {
        path: 'rank/confras',
        children: [
          {
            path: ':idGathering',
            name: ROUTES.RANK_CONFRA,
            component: () => import('pages/reports/rank/RankConfraPage.vue'),
            meta: { title: 'Rank', subtitle: 'Rank da Confra' }
          },
          {
            path: ':idGathering/jogador/:idPlayer',
            name: ROUTES.RANK_CONFRA_JOGADOR,
            component: () => import('pages/home/rank/RankPlayerPage.vue'),
            meta: { title: 'Rank', subtitle: 'Rank do Jogador' }
          }
        ]
      },

      // --- REGRAS ---
      {
        path: 'rules',
        name: ROUTES.RULES,
        component: () => import('pages/home/rules/RulePage.vue'),
        meta: { title: 'Regras', subtitle: 'Como Funciona' }
      },

      // --- CARTEIRA INDIVIDUAL ---
      {
        path: 'carteiras/jogador/:idPlayer',
        children: [
          {
            path: '',
            name: ROUTES.CARTEIRA_JOGADOR,
            component: () => import('pages/wallet/WalletPlayerPage.vue'),
            meta: { title: 'Carteira', subtitle: 'Saldo do Jogador' }
          },
          {
            path: 'transacao/new',
            name: ROUTES.TRANSACAO_NEW,
            component: () => import('pages/wallet/WalletTransactionFormPage.vue'),
            meta: { title: 'Carteira', subtitle: 'Nova Transação' }
          },
          {
            path: 'transacao/:idTransaction',
            name: ROUTES.TRANSACAO_EDIT,
            component: () => import('pages/wallet/WalletTransactionFormPage.vue'),
            meta: { title: 'Carteira', subtitle: 'Editar Transação' }
          }
        ]
      }
    ]
  },

  // 404
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
]

export default routes
