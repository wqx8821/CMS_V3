import { trademark } from '@/api/index'

export default {
  namespaced: true,
  state: () => ({
    tradeMark: {}
  }),
  mutations: {
    SET_TRADEMARK(state, tradeMarkResult) {
      state.tradeMark = tradeMarkResult
      // console.log(tradeMarkResult)
    }
  },
  actions: {
    async setTrademarkAction({ commit }, tradeMark) {
      const { page, limit } = tradeMark
      const tradeMarkResult = await trademark.getTradeMark(page, limit)
      commit('SET_TRADEMARK', tradeMarkResult.data)
      return tradeMarkResult
    }
  }
}
