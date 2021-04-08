import * as types from './mutations_types';

export default {
    set_menu_open: ({commit}) => {
      commit(types.SET_MENU_OPEN);
    },
    set_menu_close: ({commit}) => {
      commit(types.SET_MENU_CLOSE);
    },
    set_c_menu_open: ({commit}) => {
      commit(types.SET_C_MENU_OPEN);
    },
    set_c_menu_close: ({commit}) => {
      commit(types.SET_C_MENU_CLOSE);
    },
    set_statistics_data: () => {
    	commit(types.SET_STATISTICS_DATA);
    },
    set_cxbstatistics_data: () => {
      commit(types.SET_CXBSTATISTICS_DATA);
    },
    set_statistics_real: () => {
      commit(types.SET_STATISTICS_REAL);
    }
    
};
