export const state = () => {
  return {
    messages: [
      {
        name: "tanaka",
        message: "hello"
      },
      {
        name: "yamada",
        messahe:"aho"
      }
    ]
  }
}

export const mutations = {
  ADD_MESSAGE(state: any,message){
    state.messages.unshift(message)
  }
}

export const actions = {

}