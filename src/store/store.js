import { createStore } from "vuex";
import { state } from './state.js';
import { mutations } from './mutations.js';
import { getters } from './getters';

const store = createStore({
   state,
   mutations,
   // getters
});

export default store;