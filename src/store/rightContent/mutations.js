import * as types from './mutations_types'

export default {
    [types.SET_R_MENU_OPEN](state) {
        state.width = '240px';
        state.menu_flag = true;
    },
    [types.SET_R_MENU_CLOSE](state) {
        state.width = '5px';
        state.menu_flag = false;
    },
    UPDATE_RIGHT_CONTENT_H(state, d){
	  	state.rightContentH = d;
	  }
};
