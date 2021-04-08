export default {
  leftMenuWidth(state) {
  	var allW = state.mainMenuW.slice(0, -2) - 0 + (state.childMenuW.slice(0, -2)-0);
    return allW + 'px';
  }
};
