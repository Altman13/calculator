import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    history: []
}

const getters = {
    allHistory: state => {
        return state.history
    }
}
const actions = {
    async HistoryAdd( {commit }, history ) {
        commit( 'setHistory', history )
    },
}
const mutations = {
    setHistory: ( state, history ) => ( state.history = history ),
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
