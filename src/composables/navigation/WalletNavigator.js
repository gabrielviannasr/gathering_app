import { useRouter } from 'vue-router'

export function useWalletNavigator() {
  const router = useRouter()

  const goToWalletPlayer = idPlayer =>
    router.push({ name: 'carteira-jogador', params: { idPlayer } })

  const goToNewTransaction = idPlayer =>
    router.push({
      name: 'carteira-jogador-transacao-new',
      params: { idPlayer }
    })

  const goToEditTransaction = (idPlayer, idTransaction) =>
    router.push({
      name: 'carteira-jogador-transacao-edit',
      params: { idPlayer, idTransaction }
    })

  return { goToWalletPlayer, goToNewTransaction, goToEditTransaction }
}
