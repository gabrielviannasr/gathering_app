import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.QUASAR_APP_GATHERING_SERVICE_HOST })

api.interceptors.request.use(
  config => {
    // exemplo: adicionar token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error('Erro da API:', error.response.data)
//     }
//     return Promise.reject(error)
//   }
// )

api.interceptors.response.use(
  response => {
    const method = response.config.method?.toLowerCase()

    if (response.status === 200 && (method === 'post' || method === 'put')) {
      Notify.create({
        type: 'positive',
        message: 'Sucesso!'
      })
    }

    return response
  },
  error => {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Erro ao processar a requisição'

    Notify.create({
      type: 'negative',
      message: msg
      // message: `Erro: ${msg}`
    })

    return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
