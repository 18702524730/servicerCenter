import * as types from './mutations_types'

export default {
    [types.SET_MENU_OPEN](state) {
        state.mainMenuW = '116px';
        state.menu_flag = true;
    },
    [types.SET_MENU_CLOSE](state) {
        state.mainMenuW = '70px';
        state.menu_flag = false;
    },
    [types.SET_C_MENU_OPEN](state) {
        state.childMenuW = '160px';
        state.c_menu_flag = true;
    },
    [types.SET_C_MENU_CLOSE](state) {
        state.childMenuW = '0';
        state.c_menu_flag = false;
    },
    [types.SET_STATISTICS_DATA](state, payload) {
        state.statistics_data = payload;
    },
    [types.SET_CXBSTATISTICS_DATA](state, payload) {
        state.cxbstatistics_data = payload;
    },
    [types.SET_STATISTICS_REAL](state, payload) {
        state.statistics_real = payload;
    }
};
