export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = process.env.AXIOS_API_KEY
  })
}