export default function ({ $axios }: any) {
    $axios.onRequest((config : any) => {
      config.headers.common.Authorization = "pub_6307f826f0214cf067ebc635535e000745bd"
    })
}