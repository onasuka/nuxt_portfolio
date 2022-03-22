export default function ({ $axios }: any) {
    $axios.onRequest((config : any) => {
      config.headers.common.Authorization =
      process.env.AXIOS_API_KEY
    })
  }