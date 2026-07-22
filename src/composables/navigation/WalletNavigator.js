import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useWalletNavigator() {
  const router = useRouter()

  return {
    goToWallet: (idGathering, idPlayer) =>
      router.push({ name: ROUTES.CARTEIRA_JOGADOR, params: { idGathering, idPlayer } }),

    goToNewTransaction: idPlayer =>
      router.push({
        name: ROUTES.CARTEIRA_JOGADOR_TRANSACAO_NEW,
        params: { idPlayer }
      }),

    goToEditTransaction: (idPlayer, idTransaction) =>
      router.push({
        name: ROUTES.CARTEIRA_JOGADOR_TRANSACAO_EDIT,
        params: { idPlayer, idTransaction }
      })
  }
}
