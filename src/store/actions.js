import API from '../api'

export default {
  GET_TOPICS: ({
    commit
  }) => {
    return API.home
      .getTopics({page:1,limit:20,tab:'share'})
      .then((res) => {
        if (res.status !== -404 && res.data && res.data) {
          commit('GET_TOPICS', res.data.data)
        }
      }).catch(() => {
        
      })
  },
}
