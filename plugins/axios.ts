import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios)
  
  $axios.onRequest((config) => {
    config.headers.common.Authorization = process.env.AXIOS_API_KEY
  })
}
export default accessor