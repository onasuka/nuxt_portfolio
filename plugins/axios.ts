import { Plugin } from '@nuxt/types'
const accessor: Plugin = ({ $axios }) => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = process.env.AXIOS_API_KEY
  })
}
export default accessor