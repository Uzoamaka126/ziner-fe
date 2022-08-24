import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';

export default createStore({
  state,
  actions,
  getters,
  mutations,
  // modules: {
  // }
})
