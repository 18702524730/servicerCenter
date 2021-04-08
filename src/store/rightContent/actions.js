import * as types from './mutations_types';

export default {
    set_r_menu_open: ({
        commit
    }) => {
        commit(types.SET_R_MENU_OPEN);
    },
    set_r_menu_close: ({
        commit
    }) => {
        commit(types.SET_R_MENU_CLOSE);
    }
};
