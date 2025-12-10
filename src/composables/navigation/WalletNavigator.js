import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/routes.enum'

export function useWalletNavigator() {
  const router = useRouter()

  return {
    goToWalletPlayer: idPlayer =>
      router.push({ name: ROUTES.CARTEIRA_JOGADOR, params: { idPlayer } }),

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
