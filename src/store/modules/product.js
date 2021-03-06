import { trademark, attr, spu, sku } from "@/api/index";

export default {
  namespaced: true,
  state: () => ({
    tradeMark: {},
  }),
  mutations: {
    SET_TRADEMARK(state, tradeMarkResult) {
      state.tradeMark = tradeMarkResult;
      // console.log(tradeMarkResult)
    },
  },
  actions: {
    async setTrademarkAction({ commit }, tradeMark) {
      const { page, limit } = tradeMark;
      const tradeMarkResult = await trademark.getTradeMark(page, limit);
      commit("SET_TRADEMARK", tradeMarkResult.data);
      return tradeMarkResult;
    },
    async addTrademarkAction({ commit }, tradeMark) {
      let tradeMarkResult;
      if (tradeMark.id) {
        // const { id, logoUrl, tmName } = tradeMark
        tradeMarkResult = await trademark.updateTradeMark(tradeMark);
      } else {
        // const { logoUrl, tmName } = tradeMark
        tradeMarkResult = await trademark.addTradeMark(tradeMark);
      }
      return tradeMarkResult;
    },
    async deleteTrademarkAction({ commit }, id) {
      const tradeMarkResult = await trademark.deleteTradeMark(id);
      return tradeMarkResult;
    },
    // attr
    async CategoryList1({ commit }) {
      const CategoryList1Result = await attr.CategoryList1();
      return CategoryList1Result;
    },
    async CategoryList2({ commit }, id) {
      const CategoryList2Result = await attr.CategoryList2(id);
      return CategoryList2Result;
    },
    async CategoryList3({ commit }, id) {
      const CategoryList3Result = await attr.CategoryList3(id);
      return CategoryList3Result;
    },
    async getAttrList({ commit }, ids) {
      const getAttrListResult = await attr.AttrList(...ids);
      return getAttrListResult;
    },
    async addOrUpdateAttr({ commit }, data) {
      await attr.reqAddOrUpdateAttr(data);
    },
    // spu
    async spuList({ commit }, data) {
      let { page, limit, category3Id } = data;
      return await spu.reqSpuList(page, limit, category3Id);
    },
    async reqSpu({ commit }, data) {
      let spuResult = await spu.reqSpu(data);
      return spuResult;
    },
    async reqTradeMarkList({ commit }) {
      let tradeMarkListResult = await spu.reqTradeMarkList();
      return tradeMarkListResult;
    },
    async reqSpuImageList({ commit }, data) {
      return await spu.reqSpuImageList(data);
    },
    async reqBaseSaleAttrList({ commit }) {
      return await spu.reqBaseSaleAttrList();
    },
    async reqAddOrUpdateSpu({ commit }, data) {
      return await spu.reqAddOrUpdateSpu(data);
    },
    async reqDeleteSpu({ commit }, id) {
      return await spu.reqDeleteSpu(id);
    },
  },
};
