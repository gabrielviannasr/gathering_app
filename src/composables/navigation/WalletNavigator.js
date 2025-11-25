import { useRouter } from 'vue-router'

export function useWalletNavigator() {
  const router = useRouter()

  const goToWalletPlayer = idPlayer => router.push({ name: 'wallet-player', params: { idPlayer } })

  const goToTransactionForm = (idPlayer, idTransaction) =>
    router.push({
      name: 'wallet-transaction-form',
      params: { idPlayer, idTransaction }
    })

  return { goToWalletPlayer, goToTransactionForm }
}
